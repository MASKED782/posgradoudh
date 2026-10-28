import { motion } from "framer-motion";

/** Aparece suavemente al entrar en pantalla */
export default function Reveal({ children, delay = 0, y = 24, className = "", as = "div" }) {
  const Tag = motion[as];
  return (
    <Tag
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </Tag>
  );
}

export function SectionHeading({ eyebrow, title, children, align = "left", dark = false }) {
  return (
    <Reveal className={`max-w-2xl ${align === "center" ? "mx-auto text-center" : ""}`}>
      {eyebrow && (
        <p className={`eyebrow ${dark ? "text-gold" : "text-teal-dark"}`}>
          <span className={`h-px w-6 ${dark ? "bg-gold" : "bg-teal"}`} />
          {eyebrow}
        </p>
      )}
      <h2 className={`mt-4 text-3xl font-bold sm:text-4xl lg:text-5xl ${dark ? "text-white" : ""}`}>{title}</h2>
      {children && (
        <p className={`mt-5 text-base leading-relaxed sm:text-lg ${dark ? "text-white/70" : "text-jet/70"}`}>
          {children}
        </p>
      )}
    </Reveal>
  );
}
