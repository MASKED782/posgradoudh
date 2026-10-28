/* =========================
   Helpers
========================= */
const $ = (sel) => document.querySelector(sel);

const isIndex = () =>
  window.location.pathname.includes("index.html") ||
  window.location.pathname === "/" ||
  window.location.pathname.endsWith("/");

/* =========================
   Modales (sistema único)
   - registerModal(id, closeBtnId) conecta el botón X y el clic en el fondo
   - Escape cierra cualquier modal abierto
========================= */
const modals = new Set();

export function openModal(id) {
  const modal = document.getElementById(id);
  if (!modal) return;
  modal.classList.remove("hidden");
  document.body.style.overflow = "hidden";
}

export function closeModal(modal) {
  if (typeof modal === "string") modal = document.getElementById(modal);
  if (!modal || modal.classList.contains("hidden")) return;
  modal.classList.add("hidden");
  document.body.style.overflow = "";
}

function registerModal(id, closeBtnId) {
  const modal = document.getElementById(id);
  if (!modal) return null;
  modals.add(modal);
  document.getElementById(closeBtnId)?.addEventListener("click", () => closeModal(modal));
  modal.addEventListener("click", (e) => {
    if (e.target === modal) closeModal(modal);
  });
  return modal;
}

function closeAllModals() {
  modals.forEach(closeModal);
}

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") closeAllModals();
});

/* =========================
   Navbar
========================= */
function initNavbar() {
  const navbar = $("#navbar");
  const logo = document.getElementById("udhLogo");
  if (!navbar) return;

  if (!isIndex()) {
    // Estado inicial sin animación (evita el destello de transparente a crema al cargar)
    navbar.classList.add("no-anim", "iscrolled");
    if (logo) logo.src = "assets/img/logoposgradonegro.png";
    navbar.offsetHeight;
    requestAnimationFrame(() => requestAnimationFrame(() => navbar.classList.remove("no-anim")));
  } else {
    const hero = document.querySelector('section[aria-label="Presentación"]');

    const syncNavbar = () => {
      const scrolled = hero
        ? hero.getBoundingClientRect().bottom <= 90
        : window.scrollY > 40;

      navbar.classList.toggle("iscrolled", scrolled);
      if (logo) {
        logo.src = scrolled
          ? "assets/img/logoposgradonegro.png"
          : "assets/img/logoposgradoblanco.png";
      }
    };

    window.addEventListener("scroll", syncNavbar, { passive: true });
    window.addEventListener("load", syncNavbar);
    syncNavbar();
  }

  /* Dropdowns */
  const dropdowns = [
    [document.getElementById("ofertaBtn"), document.getElementById("ofertaMenu")],
    [document.getElementById("infoBtn"), document.getElementById("infoMenu")],
  ].filter(([btn, menu]) => btn && menu);

  const closeAllDropdowns = () => dropdowns.forEach(([, menu]) => menu.classList.add("hidden"));

  dropdowns.forEach(([btn, menu]) => {
    btn.addEventListener("click", (e) => {
      e.stopPropagation();
      const isOpen = !menu.classList.contains("hidden");
      closeAllDropdowns();
      if (!isOpen) menu.classList.remove("hidden");
    });
  });

  document.addEventListener("click", closeAllDropdowns);
}

/* =========================
   Mobile Drawer
========================= */
function initDrawer() {
  const drawer = document.getElementById("drawerOverlay");
  const btn = document.getElementById("menuBtn");
  if (!drawer || !btn) return;

  const isDrawerOpen = () => !drawer.classList.contains("hidden");

  function openDrawer() {
    drawer.classList.remove("hidden");
    document.body.style.overflow = "hidden";
    document.body.classList.add("drawer-open");
    btn.innerHTML = "&#10005;";
  }

  function closeDrawer() {
    drawer.classList.add("hidden");
    document.body.style.overflow = "";
    document.body.classList.remove("drawer-open");
    btn.innerHTML = "&#9776;";
  }

  document.addEventListener("click", (e) => {
    if (e.target.closest("#menuBtn")) {
      isDrawerOpen() ? closeDrawer() : openDrawer();
    } else if (
      e.target.closest("#drawerBackdrop") ||
      e.target.closest("#drawerCloseBtn") ||
      e.target.closest(".drawerLink")
    ) {
      closeDrawer();
    }
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && isDrawerOpen()) closeDrawer();
  });
}

/* =========================
   Smooth scroll
========================= */
function initSmoothAnchors() {
  const navbar = $("#navbar");
  const getOffset = () => (navbar ? navbar.getBoundingClientRect().height + 12 : 80);

  document.querySelectorAll('a[href^="#"]').forEach((a) => {
    const href = a.getAttribute("href");
    if (!href || href === "#") return;

    const target = document.querySelector(href);
    if (!target) return;

    a.addEventListener("click", (e) => {
      e.preventDefault();
      const y = window.scrollY + target.getBoundingClientRect().top - getOffset();
      window.scrollTo({ top: y, behavior: "smooth" });
    });
  });
}

/* =========================
   Anuncio (se muestra una vez por sesión) y brochure
========================= */
function initWelcomeModal() {
  const modal = registerModal("welcome-modal", "close-welcome-modal");
  if (!modal) return;

  document.getElementById("welcome-image")?.addEventListener("click", () => closeModal(modal));
  $("#brochureBtn")?.addEventListener("click", () => openModal("welcome-modal"));

  let seen = false;
  try {
    seen = sessionStorage.getItem("udh-anuncio-visto") === "1";
    sessionStorage.setItem("udh-anuncio-visto", "1");
  } catch {
    // Sin sessionStorage (modo privado estricto): se muestra igual
  }
  if (!seen) openModal("welcome-modal");
}

function initPdfModal() {
  const modal = registerModal("pdfModal", "closePdfModal");
  const openBtn = document.getElementById("openPdfModal");
  if (!modal || !openBtn) return;

  // El PDF del brochure se carga solo cuando se abre (no al entrar a la página)
  const frame = document.getElementById("pdfFrame");

  openBtn.addEventListener("click", () => {
    if (frame && !frame.getAttribute("src") && frame.dataset.src) frame.src = frame.dataset.src;
    openModal("pdfModal");
  });
}

function initHeroReadMore() {
  const wrap = document.querySelector(".hero-text-wrap");
  const btn = document.getElementById("heroReadMoreBtn");
  if (!wrap || !btn) return;

  btn.addEventListener("click", () => {
    const expanded = wrap.classList.toggle("is-expanded");
    btn.textContent = expanded ? "Leer menos" : "Leer más";
  });
}

/* =========================
   Carrusel de pestañas + modal (Maestrías, Doctorados, Segunda Especialidad)
========================= */
function initProgramTrack({ track, items, arrows, onSelect }) {
  if (!track || !items.length) return;

  let active = Math.max(0, items.findIndex((el) => el.classList.contains("active")));

  function setActive(i) {
    active = i;
    items.forEach((el, idx) => el.classList.toggle("active", idx === i));
    items[i].scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
  }

  items.forEach((el, i) => {
    el.addEventListener("click", () => {
      setActive(i);
      onSelect(el, i);
    });
  });

  // Flechas: solo navegan, no abren el modal
  arrows.forEach((arrow) => {
    arrow.addEventListener("click", (e) => {
      e.preventDefault();
      e.stopImmediatePropagation();
      const dir = Number(arrow.dataset.dir || 1);
      closeAllModals();
      setActive((active + dir + items.length) % items.length);
    });
  });

  return setActive;
}

const pillsHtml = (programs, cls) =>
  programs
    .map(
      (p, i) => `<button class="${cls} ${i === 0 ? "active" : ""}" type="button"
        ${p.modal ? `data-modal="${p.modal}"` : ""}>${p.tab}</button>`
    )
    .join("");

/* Maestrías */
const mastersModals = [
  ["ingenieriaModal", "closeIngenieriaModal"],
  ["adminModal", "closeAdminModal"],
  ["educacionModal", "closeEducacionModal"],
  ["saludModal", "closeSaludModal"],
  ["derechoModal", "closeDerechoModal"],
];

function initMentions() {
  const track = document.getElementById("mentionsTrack");
  if (!track) return;

  mastersModals.forEach(([id, closeId]) => registerModal(id, closeId));

  initProgramTrack({
    track,
    items: Array.from(track.querySelectorAll(".mention-card")),
    arrows: document.querySelectorAll("#maestrias .mention-arrow"),
    onSelect: (_, i) => mastersModals[i] && openModal(mastersModals[i][0]),
  });
}

/* Doctorados */
const phdPrograms = [
  { tab: "Ciencias de la Educación", modal: "doctoradoEducacionModal" },
  { tab: "Ciencias de la Salud", modal: "doctoradoSaludModal" },
  { tab: "Derecho", modal: "doctoradoDerechoModal" },
];

/* Segunda Especialidad (Monitoreo Fetal aún no tiene modal) */
const sePrograms = [
  { tab: "ALTO RIESGO OBSTÉTRICO", modal: "seAltoRiesgoModal" },
  { tab: "ORTODONCIA Y ORTOPEDIA MAXILAR", modal: "seOrtodonciaModal" },
  { tab: "MONITOREO FETAL Y ECOGRAFÍA OBSTÉTRICA" },
];

function initPillsSection({ trackId, programs, pillClass, arrowSelector }) {
  const track = document.getElementById(trackId);
  if (!track) return;

  track.innerHTML = pillsHtml(programs, pillClass);

  programs.forEach((p) => {
    if (p.modal) registerModal(p.modal, "close" + p.modal[0].toUpperCase() + p.modal.slice(1));
  });

  const setActive = initProgramTrack({
    track,
    items: Array.from(track.querySelectorAll("." + pillClass)),
    arrows: document.querySelectorAll(arrowSelector),
    onSelect: (el) => el.dataset.modal && openModal(el.dataset.modal),
  });
  setActive?.(0);
}

/* =========================
   Año automático
========================= */
function initYear() {
  const y = $("#year");
  if (y) y.textContent = new Date().getFullYear();
}

/* =========================
   INIT
========================= */
export function initApp() {
  if (!isIndex()) {
    document.querySelectorAll(".only-home").forEach((el) => el.remove());
  }

  initNavbar();
  initDrawer();
  initSmoothAnchors();
  initWelcomeModal();
  initPdfModal();
  initMentions();
  initPillsSection({
    trackId: "phdTrack",
    programs: phdPrograms,
    pillClass: "doc-pill",
    arrowSelector: "#doctorados .doc-arrow",
  });
  initPillsSection({
    trackId: "seTrack",
    programs: sePrograms,
    pillClass: "se2-pill",
    arrowSelector: "#segunda-especialidad .se2-arrow",
  });
  initHeroReadMore();
  initYear();

  window.history.scrollRestoration = "manual";
  window.scrollTo(0, 0);
}
