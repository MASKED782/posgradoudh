import PageHeader from "../components/PageHeader.jsx";
import DocumentLibrary from "../components/DocumentLibrary.jsx";
import { usePageTitle } from "../lib/hooks.js";

/** Requisitos, Documentos y Preguntas frecuentes */
export default function LibraryPage({ eyebrow, titulo, descripcion, documentos }) {
  usePageTitle(titulo);
  return (
    <>
      <PageHeader eyebrow={eyebrow} title={titulo}>
        {descripcion}
      </PageHeader>
      <section className="py-14 sm:py-20">
        <div className="container">
          <DocumentLibrary documentos={documentos} />
        </div>
      </section>
    </>
  );
}
