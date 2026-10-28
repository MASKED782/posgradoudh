import { motion } from "framer-motion";
import { MessageCircle } from "lucide-react";
import { site } from "../lib/site.js";

/** Botón flotante para hablar con un asesor */
export default function WhatsAppButton() {
  return (
    <motion.a
      href={site.whatsappAsesor}
      target="_blank"
      rel="noopener"
      aria-label="Hablar con un asesor por WhatsApp"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 1.2 }}
      className="group fixed bottom-5 right-5 z-40 flex items-center gap-2 rounded-full bg-[#25D366] p-4 text-white shadow-lift transition hover:pr-5 sm:bottom-6 sm:right-6"
    >
      <MessageCircle className="h-6 w-6" />
      <span className="hidden max-w-0 overflow-hidden whitespace-nowrap text-sm font-semibold transition-all duration-300 group-hover:max-w-[10rem] sm:inline">
        Habla con un asesor
      </span>
    </motion.a>
  );
}
