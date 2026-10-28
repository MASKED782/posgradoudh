/* =========================
   Visor de PDF compartido
   (maestrías, doctorados, segunda especialidad, requisitos, documentos, faq)

   Marcado esperado en la página:
   - <div id="pdfcontainer" data-accent="#ECC138" data-open-bg="#3d3c3b" data-radius="12px">
   - Enlaces del panel lateral: <aside> ... <nav> [data-pdf]
   - Selector móvil: .mobile-nav-select > .mobile-nav-btn (.chevron + [id$="_label"]) y .mobile-nav-menu > .mobile-nav-option[data-pdf]
   - Opcional: <a id="downloadbtn"> (botón de descarga en escritorio)
========================= */

const escapeHtml = (s) =>
  String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]);

const ICON_DOC = `<path stroke-linecap="round" stroke-linejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z"/>`;
const ICON_OPEN = `<path stroke-linecap="round" stroke-linejoin="round" d="M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25"/>`;
const ICON_DOWNLOAD = `<path stroke-linecap="round" stroke-linejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3"/>`;

export function initPdfViewer() {
  const container = document.getElementById("pdfcontainer");
  if (!container) return;

  const downloadBtn = document.getElementById("downloadbtn");
  const { accent = "#ECC138", openBg = "#3d3c3b", radius = "12px" } = container.dataset;

  const mobile = document.querySelector(".mobile-nav-select");
  const mobileBtn = mobile?.querySelector(".mobile-nav-btn");
  const mobileMenu = mobile?.querySelector(".mobile-nav-menu");
  const mobileLabel = mobile?.querySelector('[id$="_label"]');
  const chevron = mobile?.querySelector(".chevron");
  const mobileOptions = Array.from(mobileMenu?.querySelectorAll(".mobile-nav-option") ?? []);
  const sideLinks = Array.from(document.querySelectorAll("aside nav [data-pdf]"));

  function loadPdf(pdf, label) {
    const src = escapeHtml(pdf);
    const title = escapeHtml(label || "Documento seleccionado");
    if (mobileLabel && label) mobileLabel.textContent = label;

    if (window.innerWidth < 1024) {
      container.innerHTML = `
        <div style="display:flex;flex-direction:column;align-items:center;justify-content:center;height:100%;gap:20px;padding:32px;text-align:center;">
          <svg xmlns="http://www.w3.org/2000/svg" width="56" height="56" fill="none" viewBox="0 0 24 24" stroke="${accent}" stroke-width="1.5">${ICON_DOC}</svg>
          <p style="font-weight:800;font-size:17px;color:#3d3c3b;">${title}</p>
          <a href="${src}" target="_blank" rel="noopener"
             style="display:inline-flex;align-items:center;gap:10px;background:${openBg};color:#fff;font-weight:700;font-size:15px;padding:14px 28px;border-radius:14px;text-decoration:none;">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">${ICON_OPEN}</svg>
            Abrir PDF
          </a>
          <a href="${src}" download
             style="display:inline-flex;align-items:center;gap:10px;background:transparent;color:#3d3c3b;font-weight:700;font-size:14px;padding:10px 20px;border-radius:14px;text-decoration:none;border:1.5px solid rgba(61,60,59,0.2);">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">${ICON_DOWNLOAD}</svg>
            Descargar PDF
          </a>
        </div>`;
      downloadBtn?.classList.add("hidden");
    } else {
      container.innerHTML = `<iframe src="${src}" title="${title}" style="width:100%;height:75vh;min-height:520px;border:0;border-radius:${radius};"></iframe>`;
      if (downloadBtn) {
        downloadBtn.href = pdf;
        downloadBtn.classList.remove("hidden");
      }
    }
  }

  const select = (list, el) => {
    list.forEach((l) => l.classList.toggle("is-active", l === el));
    loadPdf(el.dataset.pdf, el.textContent.trim());
  };

  sideLinks.forEach((link) => link.addEventListener("click", () => select(sideLinks, link)));

  if (!mobileBtn || !mobileMenu) return;

  const setMenuOpen = (open) => {
    mobileMenu.classList.toggle("is-open", open);
    chevron?.classList.toggle("open", open);
  };

  mobileBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    setMenuOpen(!mobileMenu.classList.contains("is-open"));
  });

  mobileOptions.forEach((opt) => {
    opt.addEventListener("click", (e) => {
      e.stopPropagation();
      setMenuOpen(false);
      select(mobileOptions, opt);
    });
  });

  document.addEventListener("click", () => setMenuOpen(false));
}
