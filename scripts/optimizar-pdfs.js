/* =========================
   Reduce el peso de los PDF recomprimiendo sus imágenes (el texto no se toca)
   Uso: npm run optimizar-pdfs -- public/assets/pdf/nuevo.pdf   (o una carpeta)
   Reemplaza cada archivo solo si el resultado pesa menos.
========================= */
import { PDFDocument, PDFName, PDFNumber, PDFRawStream, PDFRef, PDFArray } from "pdf-lib";
import sharp from "sharp";
import zlib from "node:zlib";
import { readFileSync, writeFileSync, readdirSync, statSync } from "node:fs";
import { join } from "node:path";

const targets = process.argv.slice(2);
if (!targets.length) {
  console.error("Indica un PDF o una carpeta. Ej: npm run optimizar-pdfs -- public/assets/pdf");
  process.exit(1);
}
const MAX = 1800; // lado mayor en px
const Q = 76;

const walk = (d) => readdirSync(d).flatMap((f) => (statSync(join(d, f)).isDirectory() ? walk(join(d, f)) : [join(d, f)]));
const N = (n) => PDFName.of(n);

function filters(dict) {
  const f = dict.get(N("Filter"));
  if (!f) return [];
  if (f instanceof PDFArray) return f.asArray().map((x) => x.toString());
  return [f.toString()];
}

function channels(doc, dict) {
  let cs = dict.get(N("ColorSpace"));
  if (cs instanceof PDFRef) cs = doc.context.lookup(cs);
  if (!cs) return null;
  const s = cs.toString();
  if (s === "/DeviceRGB") return 3;
  if (s === "/DeviceGray") return 1;
  if (s === "/DeviceCMYK") return 4;
  if (cs instanceof PDFArray) {
    const a = cs.asArray();
    if (a[0].toString() === "/ICCBased") {
      const icc = a[1] instanceof PDFRef ? doc.context.lookup(a[1]) : a[1];
      return icc.dict.get(N("N"))?.asNumber?.() ?? null;
    }
  }
  return null; // Indexed, Separation, etc.: no se toca
}

function setStream(doc, ref, oldStream, dictUpdates, contents) {
  const dict = oldStream.dict.clone(doc.context);
  for (const [k, v] of Object.entries(dictUpdates)) {
    if (v === null) dict.delete(N(k));
    else dict.set(N(k), v);
  }
  dict.set(N("Length"), PDFNumber.of(contents.length));
  doc.context.assign(ref, PDFRawStream.of(dict, contents));
}

const resizeOpts = { width: MAX, height: MAX, fit: "inside", withoutEnlargement: true };

async function processPdf(file) {
  const doc = await PDFDocument.load(readFileSync(file), { updateMetadata: false });
  const images = [];
  for (const [ref, obj] of doc.context.enumerateIndirectObjects()) {
    if (obj instanceof PDFRawStream && obj.dict.get(N("Subtype"))?.toString() === "/Image") images.push([ref, obj]);
  }
  // Máscaras (SMask) usadas por imágenes que redimensionamos
  const smaskOf = new Map(images.map(([ref, o]) => [ref.toString(), o.dict.get(N("SMask"))]));

  for (const [ref, img] of images) {
    const d = img.dict;
    if (d.get(N("ImageMask")) || d.get(N("Decode")) && channels(doc, d) !== 1) continue;
    const bpc = d.get(N("BitsPerComponent"))?.asNumber?.();
    const w = d.get(N("Width")).asNumber();
    const h = d.get(N("Height")).asNumber();
    const f = filters(d);
    const ch = channels(doc, d);
    if (bpc !== 8 || !ch) continue;
    const isSMask = [...smaskOf.values()].some((r) => r && r.toString() === ref.toString());

    try {
      let input, raw = false;
      if (f.length === 1 && f[0] === "/DCTDecode") input = Buffer.from(img.contents);
      else if (f.length === 1 && f[0] === "/FlateDecode" && !d.get(N("DecodeParms"))) { input = zlib.inflateSync(img.contents); raw = true; }
      else if (f.length === 0) { input = Buffer.from(img.contents); raw = true; }
      else continue;

      if (raw && input.length !== w * h * ch) continue;
      let pipe = raw ? sharp(input, { raw: { width: w, height: h, channels: ch } }) : sharp(input);

      if (isSMask || ch === 1 && raw) {
        // Máscara / escala de grises sin comprimir: sin pérdida (Flate). Se reduce si su imagen se reduce.
        const big = Math.max(w, h) > MAX;
        const out = big ? await pipe.resize(resizeOpts).toColourspace("b-w").raw().toBuffer({ resolveWithObject: true }) : { data: input, info: { width: w, height: h } };
        const gray = out.info.channels && out.info.channels !== 1 ? null : out.data;
        if (!gray) continue;
        const packed = zlib.deflateSync(gray, { level: 9 });
        if (packed.length >= img.contents.length) continue;
        setStream(doc, ref, img, { Filter: N("FlateDecode"), DecodeParms: null, Width: PDFNumber.of(out.info.width), Height: PDFNumber.of(out.info.height) }, packed);
        continue;
      }

      const big = Math.max(w, h) > MAX;
      const jpg = await pipe.resize(resizeOpts).toColourspace(ch === 1 ? "b-w" : "srgb").jpeg({ quality: Q, mozjpeg: true }).toBuffer({ resolveWithObject: true });
      if (jpg.data.length >= img.contents.length * 0.9 && !big) continue;
      const updates = { Filter: N("DCTDecode"), DecodeParms: null, Width: PDFNumber.of(jpg.info.width), Height: PDFNumber.of(jpg.info.height) };
      if (ch === 4) Object.assign(updates, { ColorSpace: N("DeviceRGB"), Decode: null });
      setStream(doc, ref, img, updates, jpg.data);
    } catch (e) {
      console.warn("  (omitida)", file, ref.toString(), e.message);
    }
  }
  replaceCmykProfiles(doc);
  return Buffer.from(await doc.save({ useObjectStreams: true }));
}

/* Perfiles ICC CMYK incrustados (hasta 1,3 MB) → /DeviceCMYK. En pantalla se ve igual. */
function replaceCmykProfiles(doc) {
  const ctx = doc.context;
  const profiles = new Set();
  for (const [ref, o] of ctx.enumerateIndirectObjects()) {
    if (o instanceof PDFRawStream && !o.dict.get(N("Subtype")) && o.dict.get(N("N"))?.asNumber?.() === 4) profiles.add(ref.toString());
  }
  if (!profiles.size) return;
  const isCmykIcc = (v) => {
    if (!(v instanceof PDFArray) || v.size() !== 2) return false;
    const [a, b] = v.asArray();
    return a.toString() === "/ICCBased" && b instanceof PDFRef && profiles.has(b.toString());
  };
  const visit = (v) => {
    if (v instanceof PDFArray) {
      v.asArray().forEach((x, i) => (isCmykIcc(x) ? v.set(i, N("DeviceCMYK")) : visit(x)));
    } else if (v && v.entries && typeof v.set === "function") {
      for (const [k, x] of v.entries()) (isCmykIcc(x) ? v.set(k, N("DeviceCMYK")) : visit(x));
    } else if (v instanceof PDFRawStream) {
      visit(v.dict);
    }
  };
  for (const [ref, o] of ctx.enumerateIndirectObjects()) {
    if (isCmykIcc(o)) ctx.assign(ref, N("DeviceCMYK"));
    else visit(o);
  }
  doc.catalog.delete(N("OutputIntents"));
  // Borrar el perfil solo si ya nada lo referencia
  const used = new Set();
  const collect = (v) => {
    if (v instanceof PDFRef) used.add(v.toString());
    else if (v instanceof PDFArray) v.asArray().forEach(collect);
    else if (v instanceof PDFRawStream) collect(v.dict);
    else if (v && v.entries) for (const [, x] of v.entries()) collect(x);
  };
  for (const [, o] of ctx.enumerateIndirectObjects()) collect(o);
  collect(ctx.trailerInfo.Root);
  for (const p of profiles) if (!used.has(p)) ctx.delete(PDFRef.of(Number(p.split(" ")[0]), Number(p.split(" ")[1])));
}

let before = 0, after = 0;
const files = targets.flatMap((t) => (statSync(t).isDirectory() ? walk(t) : [t])).filter((f) => f.toLowerCase().endsWith(".pdf"));
for (const file of files) {
  const orig = readFileSync(file);
  const out = await processPdf(file);
  const better = out.length < orig.length;
  if (better) writeFileSync(file, out);
  before += orig.length;
  after += better ? out.length : orig.length;
  console.log(`${(orig.length / 1048576).toFixed(2)} → ${((better ? out.length : orig.length) / 1048576).toFixed(2)} MB  ${file}`);
}
console.log(`TOTAL ${(before / 1048576).toFixed(1)} MB → ${(after / 1048576).toFixed(1)} MB`);
