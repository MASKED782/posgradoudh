import { useEffect, useRef, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, BookOpen, ChevronDown, FileText, GraduationCap, HelpCircle, Library, Menu, Stethoscope, X, Award } from "lucide-react";
import { asset, site } from "../lib/site.js";
import { useLockBody, useScrolled } from "../lib/hooks.js";

const menus = [
  {
    label: "Oferta académica",
    items: [
      { to: "/maestrias", label: "Maestrías", desc: "14 menciones en 5 áreas", icon: GraduationCap },
      { to: "/doctorados", label: "Doctorados", desc: "Educación, Salud y Derecho", icon: Award },
      { to: "/segunda-especialidad", label: "Segunda Especialidad", desc: "Especialidades clínicas", icon: Stethoscope },
      { to: "/#diplomados", label: "Diplomados", desc: "Formación continua", icon: BookOpen },
    ],
  },
  { label: "Admisión", to: "/admision" },
  {
    label: "Información",
    items: [
      { to: "/requisitos", label: "Requisitos", desc: "Documentos para postular", icon: FileText },
      { to: "/documentos", label: "Documentos", desc: "Reglamentos, vacantes y calendario", icon: Library },
      { to: "/preguntas-frecuentes", label: "Preguntas frecuentes", desc: "Resuelve tus dudas", icon: HelpCircle },
    ],
  },
  { label: "Contacto", to: "/contacto" },
];

function Dropdown({ menu, light }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  const { pathname } = useLocation();
  const active = menu.items.some((i) => i.to === pathname);

  useEffect(() => setOpen(false), [pathname]);
  useEffect(() => {
    const onDoc = (e) => !ref.current?.contains(e.target) && setOpen(false);
    document.addEventListener("click", onDoc);
    return () => document.removeEventListener("click", onDoc);
  }, []);

  return (
    <div ref={ref} className="relative" onMouseEnter={() => setOpen(true)} onMouseLeave={() => setOpen(false)}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className={`flex items-center gap-1 rounded-full px-4 py-2 text-sm font-semibold transition ${
          light ? "text-white/90 hover:bg-white/10 hover:text-white" : "text-jet hover:bg-sand"
        } ${active ? (light ? "text-white" : "text-ink") : ""}`}
      >
        {menu.label}
        <ChevronDown className={`h-4 w-4 transition ${open ? "rotate-180" : ""}`} />
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            transition={{ duration: 0.18 }}
            className="absolute left-1/2 top-full w-80 -translate-x-1/2 pt-3"
          >
            <div className="rounded-2xl border border-line bg-white p-2 shadow-lift">
              {menu.items.map(({ to, label, desc, icon: Icon }) => (
                <Link
                  key={to}
                  to={to}
                  onClick={() => setOpen(false)}
                  className="group flex items-start gap-3 rounded-xl p-3 transition hover:bg-cream"
                >
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-sand text-jet transition group-hover:bg-gold group-hover:text-ink">
                    <Icon className="h-5 w-5" />
                  </span>
                  <span>
                    <span className="block text-sm font-semibold text-ink">{label}</span>
                    <span className="block text-xs text-jet/60">{desc}</span>
                  </span>
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function Navbar() {
  const scrolled = useScrolled(24);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { pathname } = useLocation();
  const light = !scrolled; // texto claro sobre las cabeceras oscuras

  useLockBody(mobileOpen);
  useEffect(() => setMobileOpen(false), [pathname]);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
          scrolled ? "border-b border-line bg-white/90 shadow-sm backdrop-blur-xl" : "bg-transparent"
        }`}
      >
        <nav className="container flex h-20 items-center justify-between gap-6" aria-label="Principal">
          <Link to="/" className="shrink-0" aria-label="Inicio — Escuela de Posgrado UDH">
            <img
              src={asset(light ? "assets/img/logoposgradoblanco.png" : "assets/img/logoposgradonegro.png")}
              alt="Escuela de Posgrado — Universidad de Huánuco"
              className="h-11 w-auto sm:h-12"
            />
          </Link>

          <div className="hidden items-center gap-1 lg:flex">
            {menus.map((m) =>
              m.items ? (
                <Dropdown key={m.label} menu={m} light={light} />
              ) : (
                <NavLink
                  key={m.to}
                  to={m.to}
                  className={({ isActive }) =>
                    `rounded-full px-4 py-2 text-sm font-semibold transition ${
                      light ? "text-white/90 hover:bg-white/10 hover:text-white" : "text-jet hover:bg-sand"
                    } ${isActive ? (light ? "bg-white/10 text-white" : "bg-sand text-ink") : ""}`
                  }
                >
                  {m.label}
                </NavLink>
              )
            )}
          </div>

          <div className="flex items-center gap-2">
            <a href={site.portalPostulante} target="_blank" rel="noopener" className="btn-gold hidden !px-5 !py-2.5 sm:inline-flex">
              Portal del postulante
              <ArrowUpRight className="h-4 w-4" />
            </a>
            <button
              type="button"
              onClick={() => setMobileOpen(true)}
              aria-label="Abrir menú"
              className={`grid h-11 w-11 place-items-center rounded-full border transition lg:hidden ${
                light ? "border-white/25 bg-white/10 text-white backdrop-blur" : "border-line bg-white text-ink"
              }`}
            >
              <Menu className="h-5 w-5" />
            </button>
          </div>
        </nav>
      </header>

      {/* Menú móvil */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div className="fixed inset-0 z-[60] lg:hidden" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <div className="absolute inset-0 bg-ink/60 backdrop-blur-sm" onClick={() => setMobileOpen(false)} />
            <motion.aside
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="absolute right-0 top-0 flex h-full w-[86vw] max-w-sm flex-col bg-white shadow-lift"
            >
              <div className="flex h-20 items-center justify-between border-b border-line px-5">
                <img src={asset("assets/img/logoposgradonegro.png")} alt="Posgrado UDH" className="h-10 w-auto" />
                <button
                  type="button"
                  onClick={() => setMobileOpen(false)}
                  aria-label="Cerrar menú"
                  className="grid h-10 w-10 place-items-center rounded-full border border-line"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
              <div className="flex-1 space-y-6 overflow-y-auto px-5 py-6">
                <Link to="/" className="block rounded-xl px-3 py-2.5 font-semibold text-ink hover:bg-cream">
                  Inicio
                </Link>
                {menus.map((m) =>
                  m.items ? (
                    <div key={m.label}>
                      <p className="eyebrow px-3 text-jet/50">{m.label}</p>
                      <div className="mt-2 space-y-1">
                        {m.items.map(({ to, label, icon: Icon }) => (
                          <Link key={to} to={to} className="flex items-center gap-3 rounded-xl px-3 py-2.5 font-medium text-ink hover:bg-cream">
                            <Icon className="h-5 w-5 text-teal-dark" />
                            {label}
                          </Link>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <Link key={m.to} to={m.to} className="block rounded-xl px-3 py-2.5 font-semibold text-ink hover:bg-cream">
                      {m.label}
                    </Link>
                  )
                )}
              </div>
              <div className="border-t border-line p-5">
                <a href={site.portalPostulante} target="_blank" rel="noopener" className="btn-gold w-full">
                  Portal del postulante
                  <ArrowUpRight className="h-4 w-4" />
                </a>
              </div>
            </motion.aside>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
