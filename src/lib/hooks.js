import { useEffect, useState } from "react";

/** Título de la pestaña del navegador */
export function usePageTitle(titulo) {
  useEffect(() => {
    document.title = titulo
      ? `${titulo} | Posgrado UDH`
      : "Escuela de Posgrado | Universidad de Huánuco";
  }, [titulo]);
}

/** true cuando la página se desplazó más de `offset` px */
export function useScrolled(offset = 24) {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > offset);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [offset]);
  return scrolled;
}

/** Bloquea el scroll del body mientras `active` sea true */
export function useLockBody(active) {
  useEffect(() => {
    if (!active) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [active]);
}

/** true en pantallas de escritorio (≥ 1024px) */
export function useIsDesktop() {
  const query = "(min-width: 1024px)";
  const [match, setMatch] = useState(() => window.matchMedia(query).matches);
  useEffect(() => {
    const mql = window.matchMedia(query);
    const onChange = () => setMatch(mql.matches);
    mql.addEventListener("change", onChange);
    return () => mql.removeEventListener("change", onChange);
  }, []);
  return match;
}
