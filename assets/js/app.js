/**
 * UDH Posgrado — app.js
/* =========================
   Helpers
========================= */
function $(sel) { return document.querySelector(sel); }
function $all(sel) { return Array.from(document.querySelectorAll(sel)); }

async function loadComponent(id, file) {
  const response = await fetch(file);
  const html = await response.text();
  document.getElementById(id).innerHTML = html;
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
     1️⃣ ESTILO (index vs internas)
  ========================= */

  if (!isIndex) {
    // Subpáginas → modo claro fijo
    navbar.classList.add("iscrolled");
    if (logo) logo.src = "assets/img/logoposgradonegro.png";
  } else {
    // Index → comportamiento dinámico con hero
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
     2DROPDOWNS (SIEMPRE)
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
   Smooth scroll (con offset por navbar fijo)
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

      // cerrar drawer si estaba abierto
      const drawer = $("#drawerOverlay");
      if (drawer && !drawer.classList.contains("hidden")) drawer.classList.add("hidden");
    });
  });
}

/* =========================
   Brochure modal
========================= */
function initBrochureModal() {
  const btn = $("#brochureBtn");
  const modal = $("#brochureModal");
  const close = $("#brochureClose");
  const close2 = $("#brochureClose2");

  if (!btn || !modal) return;

  const openModal = () => modal.classList.remove("hidden");
  const closeModal = () => modal.classList.add("hidden");

  btn.addEventListener("click", openModal);
  close?.addEventListener("click", closeModal);
  close2?.addEventListener("click", closeModal);

  modal.addEventListener("click", (e) => {
    if (e.target === modal) closeModal();
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeModal();
  });
}

/* =========================
   Maestrías — menciones y Ventana Emergente
========================= */
function initMentions() {
  // INGENIERIA
  const track = document.getElementById("mentionsTrack");
  if (!track) return;
  
  const cards = Array.from(track.querySelectorAll(".mention-card"));
  const arrows = document.querySelectorAll("#maestrias .mention-arrow");
  const ingenieriaModal = document.getElementById("ingenieriaModal");
  const closeBtn = document.getElementById("closeIngenieriaModal");

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
      // Si es el botón de Ingeniería (índice 0), abrir modal
      if (index === 0) {
        ingenieriaModal?.classList.remove("hidden");
        document.body.style.overflow = "hidden"; // Congelar scroll
      }
    });
  });

  // ADMINISTRATIVAS
  const adminModal = document.getElementById("adminModal");
  const btnAdmin = document.querySelector('.mention-card[data-index="1"]');
  const closeAdminBtn = document.getElementById("closeAdminModal");

  // Abrir modal de Administración
  btnAdmin?.addEventListener("click", () => {
    adminModal?.classList.remove("hidden");
    document.body.style.overflow = "hidden";
  });

  // Cerrar modal de Administración
  closeAdminBtn?.addEventListener("click", () => {
    adminModal?.classList.add("hidden");
    document.body.style.overflow = "";
  });

  // Cerrar al hacer clic en el fondo oscuro
  adminModal?.addEventListener("click", (e) => {
    if (e.target === adminModal) {
      adminModal.classList.add("hidden");
      document.body.style.overflow = "";
    }
  });

  // EDUCACION
  const educacionModal = document.getElementById("educacionModal");
  const btnEducacion = document.querySelector('.mention-card[data-index="2"]');
  const closeEducacionBtn = document.getElementById("closeEducacionModal");

  btnEducacion?.addEventListener("click", () => {
    educacionModal?.classList.remove("hidden");
    document.body.style.overflow = "hidden";
  });

  closeEducacionBtn?.addEventListener("click", () => {
    educacionModal?.classList.add("hidden");
    document.body.style.overflow = "";
  });

  // Cerrar al hacer clic en el fondo
  educacionModal?.addEventListener("click", (e) => {
    if (e.target === educacionModal) {
      educacionModal.classList.add("hidden");
      document.body.style.overflow = "";
    }
  });

  //SALUD
  const saludModal = document.getElementById("saludModal");
  const btnSalud = document.querySelector('.mention-card[data-index="3"]');
  const closeSaludBtn = document.getElementById("closeSaludModal");

  btnSalud?.addEventListener("click", () => {
    saludModal?.classList.remove("hidden");
    document.body.style.overflow = "hidden"; // Bloquea scroll
  });

  closeSaludBtn?.addEventListener("click", () => {
    saludModal?.classList.add("hidden");
    document.body.style.overflow = ""; // Libera scroll
  });

  // Cerrar al hacer clic en el fondo
  saludModal?.addEventListener("click", (e) => {
    if (e.target === saludModal) {
      saludModal.classList.add("hidden");
      document.body.style.overflow = "";
    }
  });

  //DERECHO
  const derechoModal = document.getElementById("derechoModal");
  const btnDerecho = document.querySelector('.mention-card[data-index="4"]');
  const closeDerechoBtn = document.getElementById("closeDerechoModal");

  btnDerecho?.addEventListener("click", () => {
    derechoModal?.classList.remove("hidden");
    document.body.style.overflow = "hidden"; // Bloquea scroll
  });

  closeDerechoBtn?.addEventListener("click", () => {
    derechoModal?.classList.add("hidden");
    document.body.style.overflow = ""; // Libera scroll
  });

  // Cerrar al hacer clic en el fondo
  derechoModal?.addEventListener("click", (e) => {
    if (e.target === derechoModal) {
      derechoModal.classList.add("hidden");
      document.body.style.overflow = "";
    }
  });

  // Lógica de las FLECHAS (Navegación circular)
  arrows.forEach((arrow) => {
    arrow.addEventListener("click", (e) => {
      e.preventDefault(); // Evita comportamiento por defecto
      e.stopImmediatePropagation(); // IMPORTANTE: Evita que el clic se dispare dos veces
      
      const dir = Number(arrow.dataset.dir); // -1 o 1
      const activeIdx = cards.findIndex((c) => c.classList.contains("active"));
      
      // Cálculo lineal de 1 en 1
      let next = activeIdx + dir;
      
      // Lógica circular para que nunca se "rompa"
      if (next < 0) {
        next = cards.length - 1; // Si estás en el primero, vuelve al último
      } else if (next >= cards.length) {
        next = 0; // Si estás en el último, vuelve al primero
      }
      
      // Ejecutamos la activación una única vez
      setActive(next);
      
      if (next === 0) {
      } else {
        const ingenieriaModal = document.getElementById("ingenieriaModal");
        ingenieriaModal?.classList.add("hidden");
        document.body.style.overflow = "";
      }
    });
  });

  // 4. Lógica de Cierre
  const closeModal = () => {
    ingenieriaModal?.classList.add("hidden");
    document.body.style.overflow = ""; // Restaurar scroll
  };

  closeBtn?.addEventListener("click", closeModal);
  ingenieriaModal?.addEventListener("click", (e) => {
    if (e.target === ingenieriaModal) closeModal();
  });
}

// IMPORTANTE: Asegúrate de llamar a la función al cargar
document.addEventListener('DOMContentLoaded', initMentions);


/* =========================
   Doctorados — 3 programas dinámicos (pills)
========================= */
const phdPrograms = [
  {
    tab: "Ciencias de la Educación",
    title: "DOCTORADO EN CIENCIAS DE LA EDUCACIÓN",
    desc: "Investigación y formación avanzada en educación.",
  },
  {
    tab: "Ciencias de la Salud",
    title: "DOCTORADO EN CIENCIAS DE LA SALUD",
    desc: "Investigación y desarrollo en el ámbito de la salud.",
  },
  {
    tab: "Derecho",
    title: "DOCTORADO EN DERECHO",
    desc: "Investigación jurídica avanzada y especialización.",
  },
];

function initDoctorados() {
  const track = document.getElementById("phdTrack");
  if (!track) return;

  // Render pills (3 doctorados)
  track.innerHTML = phdPrograms
    .map(
      (p, i) =>
        `<button class="doc-pill ${i === 0 ? "active" : ""}" type="button" data-index="${i}">${p.tab}</button>`
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

  // Click en pills
  pills.forEach((btn) => {
    btn.addEventListener("click", () => setActive(Number(btn.dataset.index)));
  });

  // Flechas (prev/next)
  document.querySelectorAll("#doctorados .doc-arrow").forEach((arrow) => {
    arrow.addEventListener("click", () => {
      const dir = Number(arrow.dataset.dir || 1);
      const next = (active + dir + pills.length) % pills.length;
      setActive(next);
    });
  });

  setActive(0);
}


/* =========================
   Segunda Especialidad — 2 programas dinámicos (pills)
========================= */
const sePrograms = [
  { tab: "ALTO RIESGO OBSTÉTRICO" },
  { tab: "ORTODONCIA Y ORTOPEDIA MAXILAR" },
];

function initSegundaEspecialidad() {
  const track = document.getElementById("seTrack");
  if (!track) return;

  track.innerHTML = sePrograms
    .map(
      (p, i) =>
        `<button class="se2-pill ${i === 0 ? "active" : ""}" type="button" data-index="${i}">${p.tab}</button>`
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
    btn.addEventListener("click", () => setActive(Number(btn.dataset.index)));
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



/* =========================
   Diplomados slider (el que usa tu HTML actual)
========================= */
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

  await loadComponent("navbar-container", "components/navbar.html");
  await loadComponent("footer-container", "components/footer.html");
  initNavbar();
  initSmoothAnchors();
  initBrochureModal();
  initMentions();
  initDoctorados();
  initSegundaEspecialidad();
  initProgramsSlider();
  initYear();
  window.history.scrollRestoration = "manual";
  window.scrollTo(0, 0);

});