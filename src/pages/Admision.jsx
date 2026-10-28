import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, ArrowUpRight, Check } from "lucide-react";
import PageHeader from "../components/PageHeader.jsx";
import Reveal from "../components/Reveal.jsx";
import { pasosAdmision } from "../data/institucional.js";
import { asset, site } from "../lib/site.js";
import { usePageTitle } from "../lib/hooks.js";

/** Marca en el índice lateral el paso visible en pantalla */
function useActiveStep(ids) {
  const [activo, setActivo] = useState(ids[0]);
  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActivo(e.target.id)),
      { rootMargin: "-45% 0px -50% 0px" }
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, [ids]);
  return activo;
}

const ids = pasosAdmision.map((p) => p.id);

export default function Admision() {
  usePageTitle("Admisión");
  const activo = useActiveStep(ids);

  return (
    <>
      <PageHeader
        eyebrow="Postulación"
        title="Proceso de admisión"
        aside={
          <a href={site.portalPostulante} target="_blank" rel="noopener" className="btn-gold !px-7 !py-3.5 text-base">
            Ir al Portal del Postulante <ArrowUpRight className="h-5 w-5" />
          </a>
        }
      >
        Guía paso a paso para postular a la Escuela de Posgrado de la Universidad de Huánuco.
      </PageHeader>

      <section className="py-14 sm:py-20">
        <div className="container grid gap-10 lg:grid-cols-[260px_1fr] lg:gap-16">
          <aside className="hidden lg:block">
            <nav className="sticky top-28" aria-label="Pasos">
              <p className="eyebrow text-jet/50">Pasos</p>
              <ol className="mt-4 space-y-1 border-l border-line">
                {pasosAdmision.map((p, i) => (
                  <li key={p.id}>
                    <a
                      href={`#${p.id}`}
                      className={`-ml-px flex gap-3 border-l-2 py-2.5 pl-4 text-sm transition ${
                        activo === p.id ? "border-gold font-semibold text-ink" : "border-transparent text-jet/60 hover:text-ink"
                      }`}
                    >
                      <span className="font-display tabular-nums">{String(i + 1).padStart(2, "0")}</span>
                      {p.titulo}
                    </a>
                  </li>
                ))}
              </ol>
            </nav>
          </aside>

          <ol className="relative space-y-6">
            {pasosAdmision.map((p, i) => (
              <Reveal as="li" key={p.id}>
                <article id={p.id} className="card scroll-mt-28 p-6 sm:p-8">
                  <div className="flex items-start gap-5">
                    <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-ink font-display text-lg font-bold text-gold">
                      {i + 1}
                    </span>
                    <div className="min-w-0 flex-1">
                      <p className="eyebrow text-teal-dark">Paso {i + 1}</p>
                      <h2 className="mt-1 text-2xl font-bold sm:text-3xl">{p.titulo}</h2>
                      <ul className="mt-5 space-y-3">
                        {p.items.map((t) => (
                          <li key={t} className="flex gap-3 leading-relaxed text-jet/80">
                            <Check className="mt-1 h-4 w-4 shrink-0 text-teal" />
                            {t}
                          </li>
                        ))}
                      </ul>

                      {p.accion === "portal" && (
                        <a href={site.portalPostulante} target="_blank" rel="noopener" className="btn-gold mt-6">
                          Inscribirme ahora <ArrowUpRight className="h-4 w-4" />
                        </a>
                      )}
                      {p.enlaces && (
                        <div className="mt-6 flex flex-wrap gap-3">
                          {p.enlaces.map((e) => (
                            <Link key={e.to} to={e.to} className="btn-outline">
                              {e.texto} <ArrowRight className="h-4 w-4" />
                            </Link>
                          ))}
                        </div>
                      )}
                      {p.imagen && (
                        <figure className="mt-6">
                          <img
                            src={asset(p.imagen)}
                            alt="Ejemplo de registro de identidad facial"
                            loading="lazy"
                            className="w-full max-w-md rounded-2xl border border-line"
                          />
                          <figcaption className="mt-2 text-sm text-jet/60">Ejemplo referencial del registro de identidad facial.</figcaption>
                        </figure>
                      )}
                    </div>
                  </div>
                </article>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>
    </>
  );
}
