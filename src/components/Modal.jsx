import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { useLockBody } from "../lib/hooks.js";

/**
 * Modal accesible: Escape y clic en el fondo cierran, bloquea el scroll y enfoca el contenido.
 * variant: "panel" (tarjeta con título) | "bare" (solo contenido, p. ej. una imagen)
 */
export default function Modal({ open, onClose, title, eyebrow, children, size = "max-w-2xl", variant = "panel" }) {
  const ref = useRef(null);
  useLockBody(open);

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    ref.current?.focus();
    return () => document.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  return createPortal(
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div className="absolute inset-0 bg-ink/70 backdrop-blur-sm" onClick={onClose} />
          <motion.div
            ref={ref}
            tabIndex={-1}
            role="dialog"
            aria-modal="true"
            aria-label={title}
            className={`relative w-full ${size} outline-none ${
              variant === "panel" ? "max-h-[90vh] overflow-y-auto rounded-3xl bg-white shadow-lift" : ""
            }`}
            initial={{ opacity: 0, y: 24, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.98 }}
            transition={{ type: "spring", damping: 26, stiffness: 300 }}
          >
            {variant === "panel" ? (
              <>
                <div className="sticky top-0 z-10 flex items-start justify-between gap-4 border-b border-line bg-white/95 px-6 py-5 backdrop-blur sm:px-8">
                  <div>
                    {eyebrow && <p className="eyebrow text-teal-dark">{eyebrow}</p>}
                    <h3 className="mt-1 text-2xl font-bold">{title}</h3>
                  </div>
                  <button
                    type="button"
                    onClick={onClose}
                    aria-label="Cerrar"
                    className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-line text-jet transition hover:bg-sand"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>
                <div className="px-6 py-6 sm:px-8">{children}</div>
              </>
            ) : (
              <>
                <button
                  type="button"
                  onClick={onClose}
                  aria-label="Cerrar"
                  className="absolute -right-2 -top-2 z-10 grid h-11 w-11 place-items-center rounded-full bg-white text-ink shadow-lift transition hover:scale-105"
                >
                  <X className="h-5 w-5" />
                </button>
                {children}
              </>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
}
