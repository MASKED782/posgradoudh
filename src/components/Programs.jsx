import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Check, Clock, MessageCircle, Phone, Wallet } from "lucide-react";
import Modal from "./Modal.jsx";
import { pensionDesde } from "../data/programas.js";
import { site } from "../lib/site.js";

/** Tarjeta de un área / programa. Al hacer clic abre el detalle con costos */
export function AreaCard({ area, tipo, index = 0, onOpen }) {
  const desde = pensionDesde(area);

  return (
    <motion.button
      type="button"
      onClick={onOpen}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.06 }}
      className="group card relative flex h-full flex-col p-6 text-left transition duration-300 hover:-translate-y-1 hover:border-gold/60 hover:shadow-lift"
    >
      <span className="eyebrow text-teal-dark">{tipo}</span>
      <h3 className="mt-3 text-xl font-bold leading-snug">{area.nombre}</h3>

      {area.menciones.length > 1 && (
        <ul className="mt-4 space-y-2 text-sm text-jet/70">
          {area.menciones.map((m) => (
            <li key={m.nombre} className="flex gap-2">
              <Check className="mt-0.5 h-4 w-4 shrink-0 text-teal" />
              {m.nombre}
            </li>
          ))}
        </ul>
      )}

      <div className="mt-auto flex items-end justify-between gap-4 pt-6">
        {desde ? (
          <div>
            <p className="text-xs text-jet/60">Pensión mensual desde</p>
            <p className="font-display text-2xl font-bold text-ink">{desde}</p>
          </div>
        ) : (
          <p className="rounded-full bg-gold/15 px-3 py-1 text-xs font-semibold text-gold-dark">Consultar costos</p>
        )}
        <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-sand text-ink transition group-hover:bg-gold">
          <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
        </span>
      </div>
    </motion.button>
  );
}

function InfoList({ icon: Icon, title, items }) {
  if (!items?.length) return null;
  return (
    <div className="rounded-2xl bg-cream p-5">
      <p className="flex items-center gap-2 text-sm font-semibold text-ink">
        <Icon className="h-4 w-4 text-teal-dark" />
        {title}
      </p>
      <ul className="mt-3 space-y-2 text-sm leading-relaxed text-jet/80">
        {items.map((t) => (
          <li key={t} className="flex gap-2">
            <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-gold" />
            {t}
          </li>
        ))}
      </ul>
    </div>
  );
}

/** Detalle de un área: tabla de menciones y costos, horarios, requisitos y contactos */
export function AreaModal({ area, tipo, onClose }) {
  return (
    <Modal open={!!area} onClose={onClose} title={area?.nombre} eyebrow={tipo} size="max-w-3xl">
      {area && (
        <div className="space-y-5">
          {area.proximamente ? (
            <div className="rounded-2xl bg-cream p-6 text-center">
              <p className="text-jet/80">
                Para conocer los costos y horarios de este programa, comunícate con un asesor de admisión.
              </p>
              <a href={site.whatsappAsesor} target="_blank" rel="noopener" className="btn-dark mt-5">
                <MessageCircle className="h-4 w-4" /> Solicitar información
              </a>
            </div>
          ) : (
            <div className="overflow-hidden rounded-2xl border border-line">
              <table className="w-full text-left text-sm">
                <thead className="bg-ink text-white">
                  <tr>
                    <th className="px-4 py-3 font-semibold">{area.menciones.length > 1 ? "Mención" : "Programa"}</th>
                    <th className="px-4 py-3 text-right font-semibold">Pensión mensual</th>
                    <th className="px-4 py-3 text-right font-semibold">Matrícula</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-line">
                  {area.menciones.map((m) => (
                    <tr key={m.nombre} className="bg-white even:bg-cream/60">
                      <td className="px-4 py-3 font-medium text-ink">{m.nombre}</td>
                      <td className="whitespace-nowrap px-4 py-3 text-right font-semibold text-ink">{m.pension}</td>
                      <td className="whitespace-nowrap px-4 py-3 text-right text-jet/80">{m.matricula}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          <div className="grid gap-4 md:grid-cols-2">
            <InfoList icon={Clock} title="Desarrollo del programa" items={area.detalles} />
            <InfoList icon={Check} title="Requisitos" items={area.requisitos} />
            <InfoList icon={Phone} title="Información y contacto" items={area.contactos} />
            <InfoList icon={Wallet} title="Consideraciones" items={area.notas} />
          </div>
        </div>
      )}
    </Modal>
  );
}

/** Grilla de áreas con su modal de detalle */
export function AreaGrid({ programa, tipo }) {
  const [abierta, setAbierta] = useState(null);
  return (
    <>
      <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
        {programa.areas.map((area, i) => (
          <AreaCard key={area.nombre} area={area} tipo={tipo} index={i} onOpen={() => setAbierta(area)} />
        ))}
      </div>
      <AreaModal area={abierta} tipo={tipo} onClose={() => setAbierta(null)} />
    </>
  );
}

/** Lista de modalidades de ingreso y su costo */
export function Modalidades({ items, dark = false }) {
  return (
    <ul className={`divide-y ${dark ? "divide-white/10" : "divide-line"}`}>
      {items.map(([nombre, precio]) => (
        <li key={nombre} className="flex items-center justify-between gap-4 py-3.5">
          <span className={dark ? "text-white/80" : "text-jet/80"}>{nombre}</span>
          <span className={`shrink-0 whitespace-nowrap font-display text-lg font-bold ${dark ? "text-gold" : "text-ink"}`}>{precio}</span>
        </li>
      ))}
    </ul>
  );
}
