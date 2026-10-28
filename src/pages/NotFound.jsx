import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import PageHeader from "../components/PageHeader.jsx";
import { usePageTitle } from "../lib/hooks.js";

export default function NotFound() {
  usePageTitle("Página no encontrada");
  return (
    <>
      <PageHeader eyebrow="Error 404" title="Página no encontrada">
        La página que buscas no existe o cambió de dirección.
      </PageHeader>
      <section className="py-16">
        <div className="container">
          <Link to="/" className="btn-dark">
            <ArrowLeft className="h-4 w-4" /> Volver al inicio
          </Link>
        </div>
      </section>
    </>
  );
}
