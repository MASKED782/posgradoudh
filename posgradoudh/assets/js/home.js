/* =========================
   Animaciones de la página de inicio (GSAP)
========================= */
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

window.addEventListener("load", () => {
  function animateNavbarWhenReady() {
    const navbar = document.querySelector("#navbar");
    if (navbar) {
      gsap.fromTo(navbar, { opacity: 0, y: -18 }, { opacity: 1, y: 0, duration: 0.7, ease: "power2.out" });
    } else { setTimeout(animateNavbarWhenReady, 200); }
  }
  gsap.set(".hero-title-line-inner", { opacity: 0, yPercent: 115, rotateX: -12, transformOrigin: "0% 100%" });
  gsap.set(".hero-animate-text", { opacity: 0, y: 28 });
  gsap.set(".hero-animate-actions .hero-btn", { opacity: 0, y: 22 });
  gsap.set(".hero-animate-card", { opacity: 0, y: 30, scale: 0.96 });
  const heroTl = gsap.timeline({ defaults: { ease: "power3.out" } });
  heroTl
    .to(".hero-title-line-inner", { opacity: 1, yPercent: 0, rotateX: 0, duration: 0.9, stagger: 0.12 })
    .to(".hero-animate-text", { opacity: 1, y: 0, duration: 0.7 }, "-=0.42")
    .to(".hero-animate-actions .hero-btn", { opacity: 1, y: 0, duration: 0.58, stagger: 0.11 }, "-=0.28")
    .to(".hero-animate-card", { opacity: 1, y: 0, scale: 1, duration: 0.62 }, "-=0.2");
  gsap.to(".hero-parallax-bg", {
    yPercent: 10, ease: "none",
    scrollTrigger: { trigger: ".hero-section", start: "top top", end: "bottom top", scrub: true }
  });
  gsap.utils.toArray(".reveal-section").forEach((section) => {
    gsap.from(section, {
      opacity: 0, y: 42, duration: 0.88, ease: "power2.out",
      scrollTrigger: { trigger: section, start: "top 84%", toggleActions: "play none none none" }
    });
  });
  const internalReveals = [
    { trigger: ".masters-section", left: ".masters-copy", right: ".masters-panel", items: ".mention-card" },
    { trigger: ".doc-section",     left: ".doc-copy",     right: ".doc-panel",     items: "#phdTrack > *" },
    { trigger: ".se2-section",     left: ".se2-copy",     right: ".se2-panel",     items: "#seTrack > *"  }
  ];
  internalReveals.forEach(({ trigger, left, right, items }) => {
    const tl = gsap.timeline({ scrollTrigger: { trigger, start: "top 72%", toggleActions: "play none none none" } });
    tl
      .from(left,  { opacity: 0, x: -34, duration: 0.7, ease: "power2.out" })
      .from(right, { opacity: 0, x:  34, duration: 0.7, ease: "power2.out" }, "-=0.48");
    if (document.querySelector(items)) {
      tl.from(items, { opacity: 0, y: 16, duration: 0.45, stagger: 0.08, ease: "power2.out" }, "-=0.3");
    }
  });
  gsap.from(".why-card", {
    opacity: 0, y: 24, duration: 0.58, stagger: 0.1, ease: "power2.out",
    scrollTrigger: { trigger: ".why-section", start: "top 75%", toggleActions: "play none none none" }
  });
  animateNavbarWhenReady();
});
  