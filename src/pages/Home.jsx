import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { AnimatePresence, motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, ArrowUpRight, CalendarDays, FileText, Megaphone, MessageCircle, Phone } from "lucide-react";
import Modal from "../components/Modal.jsx";
import Reveal, { SectionHeading } from "../components/Reveal.jsx";
import { AreaGrid, Modalidades } from "../components/Programs.jsx";
import { diplomados, doctorados, maestrias, segundaEspecialidad, totalMenciones } from "../data/programas.js";
import { beneficios, pasosAdmision } from "../data/institucional.js";
import { asset, site } from "../lib/site.js";
import { usePageTitle } from "../lib/hooks.js";

const ease = [0.22, 1, 0.36, 1];

/* =========================
   Hero
========================= */
function Hero({ onAnuncio, onBrochure }) {
  const { scrollY } = useScroll();
  const yImg = useTransform(scrollY, [0, 800], [0, 160]);

  return (
    <section className="relative flex min-h-[100svh] items-center overflow-hidden bg-ink pb-32 pt-28 text-white" aria-label="Presentación">
      <motion.img
        src={asset("assets/img/fondo1.webp")}
        alt=""
        style={{ y: yImg }}
        initial={{ scale: 1.12 }}
        animate={{ scale: 1.04 }}
        transition={{ duration: 2.2, ease }}
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/85 to-ink/30" />
      <div className="absolute inset-0 bg-gradient-to-t from-ink via-transparent to-ink/40" />

      <div className="container relative grid items-end gap-12 lg:grid-cols-12">
        <div className="lg:col-span-8">
          <motion.p
            className="eyebrow text-gold"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease }}
          >
            <span className="h-px w-8 bg-gold" />
            {site.nombre} · {site.universidad}
          </motion.p>

          <h1 className="mt-6 text-[2.6rem] font-bold leading-[1.02] text-white sm:text-6xl lg:text-7xl">
            {["Lleva tu desarrollo", "académico y profesional", "al siguiente nivel."].map((linea, i) => (
              <span key={linea} className="block overflow-hidden pb-1">
                <motion.span
                  className={`block ${i === 2 ? "text-gold" : ""}`}
                  initial={{ y: "110%" }}
                  animate={{ y: 0 }}
                  transition={{ duration: 0.9, delay: 0.15 + i * 0.12, ease }}
                >
                  {linea}
                </motion.span>
              </span>
            ))}
          </h1>

          <motion.p
            className="mt-7 max-w-xl text-lg leading-relaxed text-white/75"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.55, ease }}
          >
            Transforma tu experiencia en liderazgo y competitividad. Con nuestras maestrías, doctorados y especializaciones
            alcanzarás nuevos estándares de excelencia para destacar en el mercado global.
          </motion.p>

          <motion.div
            className="mt-10 flex flex-wrap gap-3"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.7, ease }}
          >
            <a href={site.portalPostulante} target="_blank" rel="noopener" className="btn-gold !px-7 !py-3.5 text-base">
              Inscríbete ahora <ArrowUpRight className="h-5 w-5" />
            </a>
            <a href={site.whatsappAsesor} target="_blank" rel="noopener" className="btn-glass !px-7 !py-3.5 text-base">
              <MessageCircle className="h-5 w-5" /> Conversa con un asesor
            </a>
          </motion.div>

          <motion.div
            className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-sm font-medium text-white/70"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9 }}
          >
            <button type="button" onClick={onBrochure} className="inline-flex items-center gap-2 transition hover:text-gold">
              <FileText className="h-4 w-4" /> Ver brochure
            </button>
            {site.anuncio && (
              <button type="button" onClick={onAnuncio} className="inline-flex items-center gap-2 transition hover:text-gold">
                <Megaphone className="h-4 w-4" /> Ver anuncio de admisión
              </button>
            )}
          </motion.div>
        </div>

        <motion.div
          className="lg:col-span-4"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.85, ease }}
        >
          <div className="rounded-3xl border border-white/15 bg-white/10 p-6 backdrop-blur-xl">
            <div className="flex items-center gap-4">
              <span className="grid h-12 w-12 place-items-center rounded-2xl bg-gold text-ink">
                <CalendarDays className="h-6 w-6" />
              </span>
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-white/60">{site.examen.etiqueta}</p>
                <p className="font-display text-2xl font-bold">{site.examen.fecha}</p>
              </div>
            </div>
            <div className="my-5 h-px bg-white/10" />
            <p className="text-sm font-semibold uppercase tracking-wider text-white/60">Admisión posgrado</p>
            <p className="mt-1 text-white/90">Postula en línea desde el Portal del Postulante.</p>
            <a
              href={site.portalPostulante}
              target="_blank"
              rel="noopener"
              className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-gold transition hover:gap-2"
            >
              Ir a inscripción <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* =========================
   Cifras
========================= */
function Cifras() {
  const cifras = [
    [totalMenciones(maestrias), "Menciones de maestría", "en 5 áreas del conocimiento"],
    [doctorados.areas.length, "Doctorados", "Educación, Salud y Derecho"],
    [segundaEspecialidad.areas.length, "Segundas especialidades", "en ciencias de la salud"],
    ["SUNEDU", "Grados reconocidos", "con validez oficial"],
  ];
  return (
    <section className="relative z-10 -mt-20">
      <div className="container">
        <div className="grid grid-cols-2 overflow-hidden rounded-3xl border border-line bg-white shadow-lift lg:grid-cols-4">
          {cifras.map(([valor, titulo, sub], i) => (
            <Reveal
              key={titulo}
              delay={i * 0.08}
              className={`p-6 sm:p-8 ${i % 2 ? "border-l border-line" : ""} ${i > 1 ? "border-t border-line lg:border-t-0" : ""} ${
                i === 2 ? "lg:border-l" : ""
              }`}
            >
              <p className="font-display text-4xl font-bold text-ink sm:text-5xl">{valor}</p>
              <p className="mt-2 font-semibold text-ink">{titulo}</p>
              <p className="text-sm text-jet/60">{sub}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* =========================
   Oferta académica (pestañas)
========================= */
const tabs = [
  { programa: maestrias, tipo: "Maestría", ruta: "/maestrias" },
  { programa: doctorados, tipo: "Doctorado", ruta: "/doctorados" },
  { programa: segundaEspecialidad, tipo: "Segunda especialidad", ruta: "/segunda-especialidad" },
];

function Oferta() {
  const [activa, setActiva] = useState(0);
  const { hash } = useLocation();
  const { programa, tipo, ruta } = tabs[activa];

  // Enlaces como /#doctorados abren directamente la pestaña correspondiente
  useEffect(() => {
    const i = tabs.findIndex((t) => `#${t.programa.id}` === hash);
    if (i >= 0) setActiva(i);
  }, [hash]);

  return (
    <section id="oferta" className="section">
      <div className="container">
        <div className="flex flex-col gap-8 xl:flex-row xl:items-end xl:justify-between">
          <SectionHeading eyebrow="Oferta académica" title="Encuentra el programa ideal para ti">
            Selecciona un nivel de estudios y conoce las menciones, la pensión mensual y la modalidad de cada programa.
          </SectionHeading>

          <div role="tablist" className="no-scrollbar flex w-full gap-1 self-start overflow-x-auto rounded-full border border-line bg-white p-1.5 shadow-card sm:w-auto xl:self-auto">
            {tabs.map((t, i) => (
              <button
                key={t.programa.id}
                id={t.programa.id}
                role="tab"
                type="button"
                aria-selected={activa === i}
                onClick={() => setActiva(i)}
                className={`relative whitespace-nowrap rounded-full px-5 py-2.5 text-sm font-semibold transition ${
                  activa === i ? "text-white" : "text-jet hover:text-ink"
                }`}
              >
                {activa === i && (
                  <motion.span layoutId="tab-pill" className="absolute inset-0 rounded-full bg-ink" transition={{ type: "spring", damping: 30, stiffness: 350 }} />
                )}
                <span className="relative">{t.programa.titulo}</span>
              </button>
            ))}
          </div>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={programa.id}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.35 }}
            className="mt-12 grid gap-8 lg:grid-cols-12"
          >
            <div className="lg:col-span-4">
              <div className="relative overflow-hidden rounded-3xl bg-ink p-7 text-white lg:sticky lg:top-28">
                <img src={asset(programa.imagen)} alt="" className="absolute inset-0 h-full w-full object-cover opacity-30" />
                <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/80 to-ink/40" />
                <div className="relative">
                  <span className="inline-block rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-semibold backdrop-blur">
                    {programa.modalidad}
                  </span>
                  <h3 className="mt-5 text-3xl font-bold text-white">{programa.titulo}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-white/75">{programa.descripcion}</p>

                  <p className="mt-8 text-xs font-semibold uppercase tracking-wider text-white/50">Modalidades de ingreso</p>
                  <Modalidades items={programa.ingreso} dark />

                  <div className="mt-6 flex flex-col gap-2">
                    <Link to={ruta} className="btn-gold w-full">
                      Planes de estudio y malla curricular <ArrowRight className="h-4 w-4" />
                    </Link>
                    <a href={site.tasas} target="_blank" rel="noopener" className="btn-glass w-full">
                      Ver tasas de pensiones
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <div className="lg:col-span-8">
              <AreaGrid programa={programa} tipo={tipo} />
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}

/* =========================
   Diplomados
========================= */
function Diplomados() {
  return (
    <section id="diplomados" className="pb-20 sm:pb-28">
      <div className="container">
        <Reveal className="relative overflow-hidden rounded-[2rem] bg-ink text-white">
          <img src={asset(diplomados.imagen)} alt="" className="absolute inset-0 h-full w-full object-cover opacity-40" />
          <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/90 to-ink/30" />
          <div className="relative grid gap-10 p-8 sm:p-12 lg:grid-cols-2 lg:p-16">
            <div>
              <p className="eyebrow text-gold">
                <span className="h-px w-6 bg-gold" /> {diplomados.modalidad}
              </p>
              <h2 className="mt-4 text-4xl font-bold text-white sm:text-5xl">{diplomados.titulo}</h2>
              <p className="mt-5 max-w-md text-lg text-white/75">{diplomados.descripcion}</p>
            </div>
            <div className="flex flex-col justify-center gap-4">
              {diplomados.programas.map((p) => (
                <div key={p} className="rounded-2xl border border-white/15 bg-white/10 p-6 backdrop-blur-md">
                  <h3 className="font-sans text-xl font-semibold leading-snug text-white">{p}</h3>
                  <a href={site.whatsappAsesor} target="_blank" rel="noopener" className="btn-gold mt-5">
                    <MessageCircle className="h-4 w-4" /> Hablar con un asesor
                  </a>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* =========================
   ¿Por qué escogernos?
========================= */
function Beneficios() {
  return (
    <section id="porque-escogernos" className="section relative overflow-hidden bg-ink">
      <div className="pointer-events-none absolute inset-0 bg-grain [background-size:22px_22px]" />
      <div className="pointer-events-none absolute -right-40 -top-40 h-[30rem] w-[30rem] rounded-full bg-gold/10 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-40 -left-40 h-[30rem] w-[30rem] rounded-full bg-teal/15 blur-3xl" />
      <div className="container relative">
        <SectionHeading eyebrow="Ventajas diferenciales" title="¿Por qué escogernos?" align="center" dark>
          Formamos profesionales con visión actual, respaldo académico y una experiencia de aprendizaje conectada con el mundo real.
        </SectionHeading>
        <div className="mt-16 grid gap-px overflow-hidden rounded-3xl border border-white/10 bg-white/10 sm:grid-cols-2 lg:grid-cols-4">
          {beneficios.map(({ icono: Icon, titulo, texto }, i) => (
            <Reveal key={titulo} delay={(i % 4) * 0.07} className="group bg-ink p-7 transition hover:bg-ink-soft">
              <span className="grid h-12 w-12 place-items-center rounded-2xl bg-white/5 text-gold ring-1 ring-white/10 transition group-hover:bg-gold group-hover:text-ink">
                <Icon className="h-6 w-6" />
              </span>
              <h3 className="mt-6 font-sans text-lg font-semibold text-white">{titulo}</h3>
              <p className="mt-2 text-sm leading-relaxed text-white/60">{texto}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* =========================
   Proceso de admisión (resumen)
========================= */
function Proceso() {
  return (
    <section className="section">
      <div className="container">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading eyebrow="Admisión" title="Postular es simple">
            Sigue estos pasos desde el Portal del Postulante. Nuestros asesores te acompañan en todo el proceso.
          </SectionHeading>
          <Link to="/admision" className="btn-outline shrink-0">
            Ver guía completa <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <ol className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
          {pasosAdmision.map((p, i) => (
            <Reveal as="li" key={p.id} delay={i * 0.06}>
              <Link to={`/admision#${p.id}`} className="group card flex h-full flex-col p-6 transition hover:-translate-y-1 hover:shadow-lift">
                <span className="font-display text-sm font-bold text-teal-dark">Paso {String(i + 1).padStart(2, "0")}</span>
                <h3 className="mt-3 font-sans text-lg font-semibold">{p.titulo}</h3>
                <p className="mt-2 text-sm leading-relaxed text-jet/65">{p.resumen}</p>
              </Link>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}

/* =========================
   Llamado a la acción
========================= */
function Cta() {
  return (
    <section className="pb-24">
      <div className="container">
        <Reveal className="relative overflow-hidden rounded-[2rem] bg-gold px-8 py-14 sm:px-14 lg:flex lg:items-center lg:justify-between lg:gap-10">
          <div className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full bg-white/30 blur-2xl" />
          <div className="relative max-w-2xl">
            <h2 className="text-3xl font-bold sm:text-4xl">¿Tienes dudas sobre tu postulación?</h2>
            <p className="mt-3 text-lg text-ink/75">Un asesor de admisión te orienta sobre programas, requisitos, costos y fechas.</p>
          </div>
          <div className="relative mt-8 flex flex-wrap gap-3 lg:mt-0 lg:shrink-0">
            <a href={site.whatsappAsesor} target="_blank" rel="noopener" className="btn-dark !px-7 !py-3.5">
              <MessageCircle className="h-5 w-5" /> Escríbenos por WhatsApp
            </a>
            <Link to="/contacto" className="btn border border-ink/20 bg-white/40 !px-7 !py-3.5 text-ink hover:bg-white/70">
              <Phone className="h-5 w-5" /> Ver asesores
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* =========================
   Página
========================= */
const ANUNCIO_VISTO = "udh-anuncio-visto";

export default function Home() {
  usePageTitle(null);
  const [anuncio, setAnuncio] = useState(false);
  const [brochure, setBrochure] = useState(false);

  // El anuncio se muestra automáticamente una vez por sesión
  useEffect(() => {
    if (!site.anuncio) return;
    try {
      if (sessionStorage.getItem(ANUNCIO_VISTO)) return;
      sessionStorage.setItem(ANUNCIO_VISTO, "1");
    } catch {
      // sin sessionStorage: se muestra igual
    }
    const t = setTimeout(() => setAnuncio(true), 900);
    return () => clearTimeout(t);
  }, []);

  return (
    <>
      <Hero onAnuncio={() => setAnuncio(true)} onBrochure={() => setBrochure(true)} />
      <Cifras />
      <Oferta />
      <Diplomados />
      <Beneficios />
      <Proceso />
      <Cta />

      {site.anuncio && (
        <Modal open={anuncio} onClose={() => setAnuncio(false)} title="Anuncio" variant="bare" size="max-w-xl">
          <img
            src={asset(site.anuncio.imagen)}
            alt={site.anuncio.alt}
            className="max-h-[85vh] w-full rounded-2xl object-contain shadow-lift"
          />
        </Modal>
      )}

      <Modal open={brochure} onClose={() => setBrochure(false)} title="Brochure de admisión" eyebrow="Posgrado UDH" size="max-w-6xl">
        <iframe src={asset(site.brochure)} title="Brochure de admisión" className="h-[72vh] w-full rounded-xl bg-sand" />
        <div className="mt-4 flex justify-end">
          <a href={asset(site.brochure)} download className="btn-dark">
            Descargar brochure
          </a>
        </div>
      </Modal>
    </>
  );
}
