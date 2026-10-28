import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Download, ExternalLink, FileText, Search } from "lucide-react";
import { asset } from "../lib/site.js";
import { useIsDesktop } from "../lib/hooks.js";

/**
 * Biblioteca de PDFs: lista a la izquierda y visor a la derecha (escritorio).
 * En móvil cada documento tiene botones para abrir o descargar.
 */
export default function DocumentLibrary({ documentos }) {
  const isDesktop = useIsDesktop();
  const [actual, setActual] = useState(documentos[0]);
  const [filtro, setFiltro] = useState("");

  const grupos = useMemo(() => {
    const q = filtro.trim().toLowerCase();
    const visibles = documentos.filter((d) => d.titulo.toLowerCase().includes(q));
    return visibles.reduce((acc, d) => {
      (acc[d.grupo] ||= []).push(d);
      return acc;
    }, {});
  }, [documentos, filtro]);

  const mostrarBuscador = documentos.length > 6;

  return (
    <div className="grid gap-6 lg:grid-cols-[360px_1fr] lg:gap-8">
      <aside className="lg:sticky lg:top-28 lg:self-start">
        <div className="card overflow-hidden">
          {mostrarBuscador && (
            <label className="flex items-center gap-3 border-b border-line px-5 py-4">
              <Search className="h-4 w-4 text-jet/50" />
              <input
                type="search"
                value={filtro}
                onChange={(e) => setFiltro(e.target.value)}
                placeholder="Buscar documento…"
                className="w-full bg-transparent text-sm outline-none placeholder:text-jet/40"
              />
            </label>
          )}
          <div className="max-h-none space-y-5 p-3 lg:max-h-[calc(100vh-14rem)] lg:overflow-y-auto">
            {Object.entries(grupos).map(([grupo, docs]) => (
              <div key={grupo}>
                {Object.keys(grupos).length > 1 && <p className="eyebrow px-3 pb-2 pt-1 text-jet/50">{grupo}</p>}
                <ul className="space-y-1">
                  {docs.map((d) => {
                    const activo = isDesktop && d.url === actual?.url;
                    return (
                      <li key={d.url}>
                        <div
                          className={`flex items-center gap-3 rounded-xl p-3 transition ${
                            activo ? "bg-ink text-white" : "hover:bg-cream"
                          }`}
                        >
                          <span
                            className={`grid h-10 w-10 shrink-0 place-items-center rounded-lg ${
                              activo ? "bg-gold text-ink" : "bg-sand text-jet"
                            }`}
                          >
                            <FileText className="h-5 w-5" />
                          </span>
                          {isDesktop ? (
                            <button type="button" onClick={() => setActual(d)} className="flex-1 text-left text-sm font-medium leading-snug">
                              {d.titulo}
                            </button>
                          ) : (
                            <div className="flex-1">
                              <p className="text-sm font-medium leading-snug text-ink">{d.titulo}</p>
                              <div className="mt-2 flex gap-4 text-xs font-semibold">
                                <a href={asset(d.url)} target="_blank" rel="noopener" className="inline-flex items-center gap-1 text-teal-dark">
                                  <ExternalLink className="h-3.5 w-3.5" /> Abrir
                                </a>
                                <a href={asset(d.url)} download className="inline-flex items-center gap-1 text-jet/70">
                                  <Download className="h-3.5 w-3.5" /> Descargar
                                </a>
                              </div>
                            </div>
                          )}
                        </div>
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))}
            {!Object.keys(grupos).length && <p className="px-3 py-6 text-center text-sm text-jet/60">Sin resultados.</p>}
          </div>
        </div>
      </aside>

      {isDesktop && actual && (
        <div className="card overflow-hidden">
          <div className="flex items-center justify-between gap-4 border-b border-line px-6 py-4">
            <div className="min-w-0">
              <p className="eyebrow text-teal-dark">{actual.grupo}</p>
              <h3 className="mt-1 truncate font-sans text-base font-semibold">{actual.titulo}</h3>
            </div>
            <div className="flex shrink-0 gap-2">
              <a href={asset(actual.url)} target="_blank" rel="noopener" className="btn-outline !px-4 !py-2">
                <ExternalLink className="h-4 w-4" /> Abrir
              </a>
              <a href={asset(actual.url)} download className="btn-dark !px-4 !py-2">
                <Download className="h-4 w-4" /> Descargar
              </a>
            </div>
          </div>
          <AnimatePresence mode="wait">
            <motion.iframe
              key={actual.url}
              src={asset(actual.url)}
              title={actual.titulo}
              className="h-[calc(100vh-12rem)] min-h-[560px] w-full bg-sand"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />
          </AnimatePresence>
        </div>
      )}
    </div>
  );
}
