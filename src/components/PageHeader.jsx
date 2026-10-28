import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";
import { asset } from "../lib/site.js";

/** Cabecera oscura de las páginas internas */
export default function PageHeader({ eyebrow, title, children, image = "assets/img/fondo1.webp", aside }) {
  return (
    <section className="relative overflow-hidden bg-ink pb-16 pt-36 text-white sm:pb-20 sm:pt-40">
      <img src={asset(image)} alt="" className="absolute inset-0 h-full w-full object-cover opacity-25" />
      <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/90 to-ink/60" />
      <div className="pointer-events-none absolute inset-0 bg-grain [background-size:22px_22px]" />

      <div className="container relative">
        <nav aria-label="Ruta" className="flex items-center gap-1 text-sm text-white/60">
          <Link to="/" className="transition hover:text-white">Inicio</Link>
          <ChevronRight className="h-4 w-4" />
          <span className="text-white/90">{title}</span>
        </nav>

        <div className="mt-8 flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between">
          <motion.div
            className="max-w-3xl"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            {eyebrow && (
              <p className="eyebrow text-gold">
                <span className="h-px w-6 bg-gold" />
                {eyebrow}
              </p>
            )}
            <h1 className="mt-4 text-4xl font-bold text-white sm:text-5xl lg:text-6xl">{title}</h1>
            {children && <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/75">{children}</p>}
          </motion.div>
          {aside && (
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.15 }}
            >
              {aside}
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
}
