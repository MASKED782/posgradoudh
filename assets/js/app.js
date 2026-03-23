/* =========================
   Helpers
========================= */
function $(sel) { return document.querySelector(sel); }
function $all(sel) { return Array.from(document.querySelectorAll(sel)); }

async function loadComponent(id, file) {
  const container = document.getElementById(id);
  if (!container) {
    console.error(`[loadComponent] No existe el elemento con id="${id}" en el HTML.`);
    return;
  }

  if (container.innerHTML.trim() !== "") {
    console.log(`[loadComponent] "${id}" ya tiene contenido, se omite fetch.`);
    return;
  }

  
  if (window.location.protocol === "file:") {
    console.error(
      `[loadComponent] Estás abriendo el archivo con file://. ` +
      `fetch() no funciona sin un servidor local. ` +
      `Usa Live Server (VS Code), http-server, o similar.`
    );
    return;
  }

  try {
    const response = await fetch(file);
    if (!response.ok) throw new Error(`HTTP ${response.status} al cargar: ${file}`);
    const html = await response.text();
    container.innerHTML = html;
    if (window.lucide) {
      lucide.createIcons();
    }
    console.log(`[loadComponent] ✅ "${file}" cargado en #${id}`);
  } catch (err) {
    console.error(`[loadComponent] ❌ Error cargando "${file}":`, err.message);
  }
}

/* =========================
   Navbar 
========================= */
function initNavbar() {

  const navbar = $("#navbar");
  const logo = document.getElementById("udhLogo");

  if (!navbar) return;

  const isIndex =
    window.location.pathname.includes("index.html") ||
    window.location.pathname === "/" ||
    window.location.pathname.endsWith("/");

  /* =========================
    ESTILO
  ========================= */

  if (!isIndex) {

    navbar.classList.add("iscrolled");
    if (logo) logo.src = "assets/img/logoposgradonegro.png";
  } else {
    
    const hero = document.querySelector('section[aria-label="Presentación"]');

    const syncNavbar = () => {
      let scrolled = false;

      if (!hero) {
        scrolled = window.scrollY > 40;
      } else {
        const heroBottom = hero.getBoundingClientRect().bottom;
        scrolled = heroBottom <= 90;
      }

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


  
  /* =========================
    DROPDOWNS 
  ========================= */

  const ofertaBtn = document.getElementById("ofertaBtn");
  const ofertaMenu = document.getElementById("ofertaMenu");
  const infoBtn = document.getElementById("infoBtn");
  const infoMenu = document.getElementById("infoMenu");

  function closeAllDropdowns() {
    ofertaMenu?.classList.add("hidden");
    infoMenu?.classList.add("hidden");
  }

  if (ofertaBtn && ofertaMenu) {
    ofertaBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      const isOpen = !ofertaMenu.classList.contains("hidden");
      closeAllDropdowns();
      if (!isOpen) ofertaMenu.classList.remove("hidden");
    });
  }

  if (infoBtn && infoMenu) {
    infoBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      const isOpen = !infoMenu.classList.contains("hidden");
      closeAllDropdowns();
      if (!isOpen) infoMenu.classList.remove("hidden");
    });
  }

  document.addEventListener("click", closeAllDropdowns);
}

/* =========================
   Mobile Drawer
========================= */
function initDrawer() {
  const drawer = document.getElementById("drawerOverlay");
  const btn = document.getElementById("menuBtn");

  if (!drawer || !btn) return;

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

  function isDrawerOpen() {
    return !drawer.classList.contains("hidden");
  }

  document.addEventListener("click", (e) => {
    if (e.target.closest("#menuBtn")) {
      isDrawerOpen() ? closeDrawer() : openDrawer();
      return;
    }

    if (e.target.id === "drawerBackdrop" || e.target.closest("#drawerBackdrop")) {
      closeDrawer();
      return;
    }

    if (
      e.target.closest("#drawerCloseBtn") ||
      e.target.closest('[aria-label="Cerrar menú"]')
    ) {
      closeDrawer();
      return;
    }

    if (e.target.closest(".drawerLink")) {
      closeDrawer();
      return;
    }
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeDrawer();
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

      const drawer = $("#drawerOverlay");
      if (drawer && !drawer.classList.contains("hidden")) {
        drawer.classList.add("hidden");
        document.body.style.overflow = "";
      }
    });
  });
}

/* =========================
   Brochure modal
========================= */
function initBrochureModal() {
  const btn = $("#brochureBtn");
  const modal = document.getElementById("welcome-modal");
  const closeBtn = document.getElementById("close-welcome-modal");
  const image = document.getElementById("welcome-image");

  if (!btn || !modal || !closeBtn || !image) return;

  function openModal() {
    modal.classList.remove("hidden");
  }

  function closeModal() {
    modal.classList.add("hidden");
  }

  btn.addEventListener("click", openModal);
  closeBtn.addEventListener("click", closeModal);

  modal.addEventListener("click", (e) => {
    if (e.target === modal) closeModal();
  });

  image.addEventListener("click", closeModal);
}

function initPdfModal() {
  const openBtn = document.getElementById("openPdfModal");
  const modal = document.getElementById("pdfModal");
  const closeBtn = document.getElementById("closePdfModal");

  if (!openBtn || !modal || !closeBtn) return;

  function openModal() {
    modal.classList.remove("hidden");
    document.body.style.overflow = "hidden";
  }

  function closeModal() {
    modal.classList.add("hidden");
    document.body.style.overflow = "";
  }

  openBtn.addEventListener("click", openModal);
  closeBtn.addEventListener("click", closeModal);

  modal.addEventListener("click", (e) => {
    if (e.target === modal) closeModal();
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && !modal.classList.contains("hidden")) {
      closeModal();
    }
  });
}


function initHeroReadMore() {
  const wrap = document.querySelector(".hero-text-wrap");
  const btn = document.getElementById("heroReadMoreBtn");

  if (!wrap || !btn) return;

  btn.addEventListener("click", () => {
    wrap.classList.toggle("is-expanded");

    if (wrap.classList.contains("is-expanded")) {
      btn.textContent = "Leer menos";
    } else {
      btn.textContent = "Leer más";
    }
  });
}

/* =========================
   Maestrías
========================= */
function initMentions() {
  const track = document.getElementById("mentionsTrack");
  if (!track) return;

  const cards = Array.from(track.querySelectorAll(".mention-card"));
  const arrows = document.querySelectorAll("#maestrias .mention-arrow");

  // Mapa: índice de card → id del modal correspondiente
  const modalMap = {
    0: "ingenieriaModal",
    1: "adminModal",
    2: "educacionModal",
    3: "saludModal",
    4: "derechoModal",
  };

  // Mapa: id modal → id botón de cierre
  const closeMap = {
    ingenieriaModal:  "closeIngenieriaModal",
    adminModal:       "closeAdminModal",
    educacionModal:   "closeEducacionModal",
    saludModal:       "closeSaludModal",
    derechoModal:     "closeDerechoModal",
  };

  function openModal(id) {
    const modal = document.getElementById(id);
    if (!modal) return;
    modal.classList.remove("hidden");
    document.body.style.overflow = "hidden";
  }

  function closeModal(id) {
    const modal = document.getElementById(id);
    if (!modal) return;
    modal.classList.add("hidden");
    document.body.style.overflow = "";
  }

  function closeAllMaestrias() {
    Object.values(modalMap).forEach(closeModal);
  }

  // Registrar cierre para cada modal
  Object.entries(closeMap).forEach(([modalId, btnId]) => {
    const modal = document.getElementById(modalId);
    const btn   = document.getElementById(btnId);

    btn?.addEventListener("click", () => closeModal(modalId));

    modal?.addEventListener("click", (e) => {
      if (e.target === modal) closeModal(modalId);
    });
  });

  // Escape cierra todos
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeAllMaestrias();
  });

  // Activar card y abrir modal
  const setActive = (idx) => {
    cards.forEach((b) => b.classList.remove("active"));
    if (cards[idx]) {
      cards[idx].classList.add("active");
      cards[idx].scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
    }
  };

  cards.forEach((btn, index) => {
    btn.addEventListener("click", () => {
      setActive(index);
      const modalId = modalMap[index];
      if (modalId) openModal(modalId);
    });
  });

  // Flechas — solo navegan, NO abren modal
  arrows.forEach((arrow) => {
    arrow.addEventListener("click", (e) => {
      e.preventDefault();
      e.stopImmediatePropagation();
      const dir      = Number(arrow.dataset.dir);
      const activeIdx = cards.findIndex((c) => c.classList.contains("active"));
      const next     = (activeIdx + dir + cards.length) % cards.length;
      closeAllMaestrias();
      setActive(next);
    });
  });
}


/* =========================
   Doctorados 
========================= */
const phdPrograms = [
  {
    tab: "Ciencias de la Educación",
    title: "DOCTORADO EN CIENCIAS DE LA EDUCACIÓN",
    desc: "Investigación y formación avanzada en educación.",
    modal: "doctoradoEducacionModal"
  },
  {
    tab: "Ciencias de la Salud",
    title: "DOCTORADO EN CIENCIAS DE LA SALUD",
    desc: "Investigación y desarrollo en el ámbito de la salud.",
    modal: "doctoradoSaludModal"
  },
  {
    tab: "Derecho",
    title: "DOCTORADO EN DERECHO",
    desc: "Investigación jurídica avanzada y especialización.",
    modal: "doctoradoDerechoModal"
  },
];

function initDoctorados() {
  const track = document.getElementById("phdTrack");
  if (!track) return;

  track.innerHTML = phdPrograms
    .map(
      (p, i) =>
        `<button 
          class="doc-pill ${i === 0 ? "active" : ""}" 
          type="button" 
          data-index="${i}"
          data-modal="${p.modal}">
          ${p.tab}
        </button>`
    )
    .join("");

  const pills = Array.from(track.querySelectorAll(".doc-pill"));
  if (!pills.length) return;

  let active = 0;

  function setActive(i) {
    active = i;
    pills.forEach((b, idx) => b.classList.toggle("active", idx === i));
    pills[i].scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
  }

  pills.forEach((btn) => {
    btn.addEventListener("click", () => {
      setActive(Number(btn.dataset.index));

      const modalId = btn.dataset.modal;
      const modal = document.getElementById(modalId);

      if (modal) {
        modal.classList.remove("hidden");
        document.body.style.overflow = "hidden";
      }
    });
  });

  document.querySelectorAll("#doctorados .doc-arrow").forEach((arrow) => {
    arrow.addEventListener("click", () => {
      const dir = Number(arrow.dataset.dir || 1);
      const next = (active + dir + pills.length) % pills.length;
      setActive(next);
    });
  });

  setActive(0);
}

function initDoctoradosModals() {
  const derechoModal = document.getElementById("doctoradoDerechoModal");
  const educacionModal = document.getElementById("doctoradoEducacionModal");
  const saludModal = document.getElementById("doctoradoSaludModal");

  const closeDerecho = document.getElementById("closeDoctoradoDerechoModal");
  const closeEducacion = document.getElementById("closeDoctoradoEducacionModal");
  const closeSalud = document.getElementById("closeDoctoradoSaludModal");

  const closeModal = (modal) => {
    if (!modal) return;
    modal.classList.add("hidden");
    document.body.style.overflow = "";
  };

  closeDerecho?.addEventListener("click", () => closeModal(derechoModal));
  closeEducacion?.addEventListener("click", () => closeModal(educacionModal));
  closeSalud?.addEventListener("click", () => closeModal(saludModal));

  derechoModal?.addEventListener("click", (e) => {
    if (e.target === derechoModal) closeModal(derechoModal);
  });

  educacionModal?.addEventListener("click", (e) => {
    if (e.target === educacionModal) closeModal(educacionModal);
  });

  saludModal?.addEventListener("click", (e) => {
    if (e.target === saludModal) closeModal(saludModal);
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      closeModal(derechoModal);
      closeModal(educacionModal);
      closeModal(saludModal);
    }
  });
}

/* =========================
   Segunda Especialidad 
========================= */
const sePrograms = [
  {
    tab: "ALTO RIESGO OBSTÉTRICO",
    modal: "seAltoRiesgoModal"
  },
  {
    tab: "ORTODONCIA Y ORTOPEDIA MAXILAR",
    modal: "seOrtodonciaModal"
  },
  {
    tab: "MONITOREO FETAL Y ECOGRAFÍA OBSTÉTRICA"
    // modal: "seMonitoreoModal"
  },
];

function initSegundaEspecialidad() {
  const track = document.getElementById("seTrack");
  if (!track) return;

  track.innerHTML = sePrograms
    .map(
      (p, i) =>
        `<button 
          class="se2-pill ${i === 0 ? "active" : ""}" 
          type="button" 
          data-index="${i}" 
          ${p.modal ? `data-modal="${p.modal}"` : ""}
        >
          ${p.tab}
        </button>`
    )
    .join("");

  const pills = Array.from(track.querySelectorAll(".se2-pill"));
  if (!pills.length) return;

  let active = 0;

  function setActive(i) {
    active = i;
    pills.forEach((b, idx) => b.classList.toggle("active", idx === i));
    pills[i].scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
  }

  pills.forEach((btn) => {
    btn.addEventListener("click", () => {
      setActive(Number(btn.dataset.index));

      const modalId = btn.dataset.modal;
      if (!modalId) return; // Si aún no tiene modal, no hace nada

      const modal = document.getElementById(modalId);

      if (modal) {
        modal.classList.remove("hidden");
        document.body.style.overflow = "hidden";
      }
    });
  });

  document.querySelectorAll("#segunda-especialidad .se2-arrow").forEach((arrow) => {
    arrow.addEventListener("click", () => {
      const dir = Number(arrow.dataset.dir || 1);
      const next = (active + dir + pills.length) % pills.length;
      setActive(next);
    });
  });

  setActive(0);
}

function initSegundaEspecialidadModals() {
  const altoRiesgoModal = document.getElementById("seAltoRiesgoModal");
  const ortodonciaModal = document.getElementById("seOrtodonciaModal");

  // Futuro modal de Monitoreo Fetal y Ecografía Obstétrica
  // const monitoreoModal = document.getElementById("seMonitoreoModal");

  const closeAltoRiesgo = document.getElementById("closeSeAltoRiesgoModal");
  const closeOrtodoncia = document.getElementById("closeSeOrtodonciaModal");

  // Futuro botón de cierre
  // const closeMonitoreo = document.getElementById("closeSeMonitoreoModal");

  const closeModal = (modal) => {
    if (!modal) return;
    modal.classList.add("hidden");
    document.body.style.overflow = "";
  };

  closeAltoRiesgo?.addEventListener("click", () => closeModal(altoRiesgoModal));
  closeOrtodoncia?.addEventListener("click", () => closeModal(ortodonciaModal));

  // closeMonitoreo?.addEventListener("click", () => closeModal(monitoreoModal));

  altoRiesgoModal?.addEventListener("click", (e) => {
    if (e.target === altoRiesgoModal) closeModal(altoRiesgoModal);
  });

  ortodonciaModal?.addEventListener("click", (e) => {
    if (e.target === ortodonciaModal) closeModal(ortodonciaModal);
  });

  // monitoreoModal?.addEventListener("click", (e) => {
  //   if (e.target === monitoreoModal) closeModal(monitoreoModal);
  // });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      closeModal(altoRiesgoModal);
      closeModal(ortodonciaModal);
      // closeModal(monitoreoModal);
    }
  });
}


function initProgramsSlider(){
  const nextBtn = document.getElementById("dipNext");
  const prevBtn = document.getElementById("dipPrev");
  const titleEl = document.querySelector(".dip-program");
  const descEl = document.querySelector(".dip-desc");
  const imgEl = document.querySelector(".dip-media img");
  const dots = Array.from(document.querySelectorAll(".dot"));

  if (!nextBtn || !prevBtn || !titleEl || !descEl || !imgEl) return;
  safeImage(imgEl);

  const programs = [
    { title: "Diplomado en Gestión Estratégica de Proyectos de Desarrollo Social", desc: "Diseña y gestiona iniciativas que transforman comunidades con impacto real y sostenible.", img: "assets/img/diplomado.jpg" }
  ];

  let current = 0;

  function updateSlide(){
    const p = programs[current];
    titleEl.textContent = p.title;
    descEl.textContent = p.desc;
    imgEl.src = p.img;

    dots.forEach((d) => d.classList.remove("active"));
    if (dots[current]) dots[current].classList.add("active");
  }

  nextBtn.addEventListener("click", () => {
    current = (current + 1) % programs.length;
    updateSlide();
  });

  prevBtn.addEventListener("click", () => {
    current = (current - 1 + programs.length) % programs.length;
    updateSlide();
  });

  updateSlide();
}

function safeImage(imgEl, fallback = "assets/img/diplomado.jpg") {
  if (!imgEl) return;
  imgEl.addEventListener("error", () => {
    imgEl.src = fallback;
  }, { once: true });
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
document.addEventListener("DOMContentLoaded", async () => {

  const isIndex =
    window.location.pathname.includes("index.html") ||
    window.location.pathname === "/" ||
    window.location.pathname.endsWith("/");
  const basePath = "";

  await Promise.all([
    loadComponent("navbar-container", basePath + "components/navbar.html"),
    loadComponent("footer-container", basePath + "components/footer.html"),
  ]);

  if (!isIndex) {
    document.querySelectorAll(".only-home").forEach((el) => el.remove());
  }

  initNavbar();
  initDrawer();
  initSmoothAnchors();
  initBrochureModal();
  initPdfModal();
  initMentions();
  initDoctorados();
  initDoctoradosModals();
  initSegundaEspecialidad();
  initSegundaEspecialidadModals();
  initHeroReadMore();
  //initProgramsSlider();
  initYear();
  initWelcomeModal();

  window.history.scrollRestoration = "manual";
  window.scrollTo(0, 0);
});

/* =========================
  Anuncio
========================= */
function initWelcomeModal() {
  const modal = document.getElementById("welcome-modal");
  const closeBtn = document.getElementById("close-welcome-modal");
  const image = document.getElementById("welcome-image");

  if (!modal || !closeBtn || !image) return;

  
  modal.classList.remove("hidden");
  document.body.style.overflow = "hidden";

  function closeWelcomeModal() {
    modal.classList.add("hidden");
    document.body.style.overflow = "";
  }

  closeBtn.addEventListener("click", closeWelcomeModal);

  modal.addEventListener("click", (e) => {
    if (e.target === modal) {
      closeWelcomeModal();
    }
  });

  image.addEventListener("click", closeWelcomeModal);
}