import { ArrowLeft, ChevronRight, Home } from "lucide-react";
import { usePage, Link } from "@inertiajs/react";
import { match } from "path-to-regexp";
import React from "react";

// Tipo para íconos de Lucide
import { LucideIcon } from "lucide-react";

// Definición del tipo para cada breadcrumb
type BreadcrumbItem = {
  path: string;
  label: string;
  Icon: LucideIcon;
  urlReturn: string | null;
  section?: string;
};

// Definición de las rutas breadcrumb
const breadcrumbMap: BreadcrumbItem[] = [
  { path: "/", label: "Inicio", Icon: Home, urlReturn: null },
  { path: "/configuracion/areas", label: "Áreas", Icon: Home, urlReturn: null },
  {
    path: "/configuracion/areas/editar/:id_area",
    label: "Editar área",
    Icon: Home,
    urlReturn: "/configuracion/areas",
    section: "Áreas",
  },
  // Agrega aquí el resto de tus rutas...
];

const Breadcrumb: React.FC = () => {
  // Obtiene la URL actual desde Inertia
  const { url } = usePage();

  // Encuentra la ruta coincidente con path-to-regexp
  const matchedRoute = breadcrumbMap.find((route) =>
    match(route.path, { decode: decodeURIComponent })(url)
  );

  // Construye los niveles de breadcrumb
  const levels = matchedRoute
    ? [
        {
          label: matchedRoute.label,
          Icon: matchedRoute.Icon,
          urlReturn: matchedRoute.urlReturn,
          section: matchedRoute.section,
        },
      ]
    : [{ label: "Página desconocida", Icon: Home }];

  return (
    <nav aria-label="Breadcrumb" className="flex flex-wrap items-center">
      {levels[0].urlReturn !== null && (
        <Link
          href={levels[0].urlReturn!}
          className="inline-flex justify-center items-center font-bold text-[10px] md:text-sm text-gray-500 hover:text-blue-600 focus:outline-hidden focus:text-blue-600"
        >
          <ArrowLeft className="shrink-0 me-1 size-4" />
        </Link>
      )}

      <ol className="flex items-center whitespace-nowrap p-1">
        {levels.map((level, index) => (
          <div key={index} className="flex items-center">
            {level.section && (
              <li className="inline-flex font-bold items-center">
                <span className="flex items-center text-[10px] md:text-sm text-gray-500 hover:text-blue-600">
                  {level.section}
                </span>
                <ChevronRight className="shrink-0 mx-2 size-4 text-gray-400" />
              </li>
            )}
            <li className="inline-flex items-center">
              {level.urlReturn ? (
                <Link
                  href={level.urlReturn}
                  className="flex items-center text-[10px] md:text-sm font-bold text-gray-800 hover:text-blue-600"
                >
                  {level.label}
                </Link>
              ) : (
                <span
                  className="inline-flex items-center text-[10px] md:text-sm font-semibold text-gray-800 truncate"
                  aria-current="page"
                >
                  {level.label}
                </span>
              )}
            </li>
          </div>
        ))}
      </ol>
    </nav>
  );
};

export default Breadcrumb;
