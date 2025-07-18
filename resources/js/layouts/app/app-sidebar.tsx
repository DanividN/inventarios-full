import { useCallback, useEffect, useRef, useState } from "react";
import { Link, usePage } from "@inertiajs/react";
import {
    Home,
    Settings,
    FileSearch,
    ClipboardCheck,
    ShieldCheck,
    BarChart2,
    CalendarRange,
    MoreHorizontal,
    Archive,
    ChartLine,
    Package2,
    ChevronDown,
} from "lucide-react";

import LogoGobti from "../../../../public/iconos/inventarios_icono_gobti.svg";
import LogoConTexto from "../../../../public/iconos/inventarios_gobti.svg";
import { useSidebar } from "@/context/sidebar-context";

type NavItem = {
    icon: JSX.Element;
    name: string;
    path?: string;
    subItems?: { name: string; path: string }[];
};

const navItems: NavItem[] = [
    { icon: <Home size={20} />, name: "Mesa de control", path: "/dashboard" },
    {
        icon: <Settings size={20} />,
        name: "Configuración",
        subItems: [
            { name: "Áreas", path: "/configuracion/areas" },
            { name: "Trabajadores", path: "/configuracion/trabajadores" },
            { name: "Usuarios", path: "/configuracion/usuarios" },
            { name: "Proveedores", path: "/configuracion/proveedores" },
            { name: "Clasificación de Bienes", path: "/configuracion/clasificacion" },
            { name: "Artículos", path: "/configuracion/articulos" },
        ],
    },
];

const functionItems: NavItem[] = [
    {
        icon: <Package2 size={20} />,
        name: "Inventario",
        subItems: [
            { name: "Bienes inventariables", path: "/funciones/inventarios/inventariables" },
            { name: "Bienes de consumo", path: "/funciones/inventarios/consumo" },
        ],
    },
    {
        icon: <FileSearch size={20} />,
        name: "Entrega de bienes",
        subItems: [
            { name: "Bienes inventariables", path: "/funciones/entregas/inventariables" },
            { name: "Bienes de consumo", path: "/funciones/entregas/consumo" },
        ],
    },
    {
        icon: <ClipboardCheck size={20} />,
        name: "Resguardos",
        subItems: [
            { name: "Pendientes", path: "/funciones/resguardos/pendientes" },
            { name: "Asignados", path: "/funciones/resguardos/asignados" },
        ],
    },
    {
        icon: <ShieldCheck size={20} />,
        name: "Verificación de bienes",
        path: "/funciones/verificaciones/verificacion_areas",
    },
];

const others: NavItem[] = [
    {
        icon: <ChartLine size={20} />,
        name: "Estadísticas",
        subItems: [
            { name: "Resguardos", path: "/estadisticas/resguardos" },
            { name: "Bienes de consumo", path: "/estadisticas/bienes_consumo" },
            { name: "Bienes inventariables", path: "/estadisticas/bienes_inventariables" },
            { name: "Verificaciones", path: "/estadisticas/verificaciones" },
            { name: "Activos", path: "/estadisticas/activos" },
        ],
    },
    {
        icon: <CalendarRange size={20} />,
        name: "Tutoriales",
        subItems: [
            { name: "Configuración", path: "/tutoriales/configuracion" },
            { name: "Funciones", path: "/tutoriales/funciones" },
            { name: "Estadísticas", path: "/tutoriales/estadisticas" },
            { name: "PWA", path: "/tutoriales/pwa" },
        ],
    },
];

const AppSidebar = () => {
    const { isExpanded, isMobileOpen, isHovered, setIsHovered } = useSidebar();
    const { url } = usePage();

    const [openSubmenu, setOpenSubmenu] = useState<{ key: string } | null>(null);
    const [subMenuHeight, setSubMenuHeight] = useState<Record<string, number>>({});
    const subMenuRefs = useRef<Record<string, HTMLDivElement | null>>({});

    const isActive = useCallback((path: string) => url === path, [url]);

    useEffect(() => {
        let matchedKey: string | null = null;

        [...navItems, ...functionItems, ...others].forEach((nav) => {
            nav.subItems?.forEach((sub) => {
                if (isActive(sub.path)) {
                    matchedKey = nav.name;
                }
            });
        });

        setOpenSubmenu(matchedKey ? { key: matchedKey } : null);
    }, [url, isActive]);

    useEffect(() => {
        if (openSubmenu !== null) {
            const key = `submenu-${openSubmenu.key}`;
            const element = subMenuRefs.current[key];
            if (element) {
                setSubMenuHeight((prev) => ({
                    ...prev,
                    [key]: element.scrollHeight,
                }));
            }
        }
    }, [openSubmenu]);

    const handleSubmenuToggle = (key: string) => {
        setOpenSubmenu((prev) => (prev?.key === key ? null : { key }));
    };

    const renderMenuSection = (title: string, items: NavItem[]) => (
        <div>
            <h2
                className={`relative mb-2 text-xs uppercase flex leading-[20px] text-gray-400 ${!isExpanded && !isHovered ? "lg:justify-center" : "justify-start"
                    }`}
            >
                {isExpanded || isHovered || isMobileOpen ? title : <MoreHorizontal className="h-5" />}
            </h2>
            <ul className="flex flex-col gap-1">
                {items.map((nav) => {
                    const menuKey = `submenu-${nav.name}`;
                    const isMenuOpen = openSubmenu?.key === nav.name;

                    return (
                        <li key={nav.name}>
                            {nav.subItems ? (
                                <button
                                    onClick={() => handleSubmenuToggle(nav.name)}
                                    className={`menu-item group ${openSubmenu?.key === nav.name ? "menu-item-active" : "menu-item-inactive"
                                        } ${!isExpanded && !isHovered ? "lg:justify-center" : "lg:justify-start"}`}>


                                        <span className={`menu-item-icon-size border bg-white p-[5px] rounded shadow ${
                                            openSubmenu?.key === nav.name
                                                ? "menu-item-icon-active"
                                                : "menu-item-icon-inactive"
                                        }`}>
                                            {nav.icon}
                                        </span>
                                         {(isExpanded || isHovered || isMobileOpen) && (
                                        <>
                                            <span className="menu-item-text">{nav.name}</span>
                                            <ChevronDown
                                                className={`ml-auto w-5 h-5 transition-transform duration-200 ${
                                                    openSubmenu?.key === nav.name ? "rotate-180" : ""
                                                }`}
                                            />
                                        </>
                                    )}
                                </button>

                            ) : (
                                <Link
                                    href={nav.path!}
                                     className={`menu-item group ${isActive(nav.path!) ? "menu-item-active" : "menu-item-inactive"
                                    }`}
                                >
                                    <span className={`menu-item-icon-size bg-white border p-[5px] rounded shadow
                                            ${isActive(nav.path!)
                                                ? "menu-item-icon-active"
                                                : "menu-item-icon-inactive"
                                        }`}>
                                        {nav.icon}
                                    </span>
                                    {(isExpanded || isHovered || isMobileOpen) && (
                                        <span className="menu-item-text">{nav.name}</span>
                                    )}
                                </Link>
                            )}
                            {nav.subItems && (isExpanded || isHovered || isMobileOpen) && (
                                <div
                                    ref={(el) => (subMenuRefs.current[menuKey] = el)}
                                    className="overflow-hidden transition-all duration-300"
                                    style={{ height: isMenuOpen ? `${subMenuHeight[menuKey]}px` : "0px" }}
                                >
                                    <ul className="mt-2 space-y-1 ml-9">
                                        {nav.subItems.map((subItem) => (
                                            <li key={subItem.name}>
                                                <Link
                                                    href={subItem.path}
                                                   className={`menu-dropdown-item ${
                                                        isActive(subItem.path)
                                                            ? "menu-dropdown-item-active"
                                                            : "menu-dropdown-item-inactive"
                                                    }`}
                                                >
                                                    {subItem.name}
                                                </Link>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                        </li>
                    );
                })}
            </ul>
        </div>
    );

    return (
        <aside
            className={`fixed mt-16 flex flex-col lg:mt-0 top-0 px-3 left-0 bg-white text-gray-900 h-screen transition-all duration-300 ease-in-out z-50 border-r border-gray-400 ${isExpanded || isMobileOpen
                ? "w-[290px]"
                : isHovered
                    ? "w-[290px]"
                    : "w-[70px] items-center"
                } ${isMobileOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0`}
            onMouseEnter={() => !isExpanded && setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <div className={`py-1 flex ${!isExpanded && !isHovered ? "lg:justify-center" : "justify-center"}`}>
                <Link href="/" className="flex items-center justify-center">
                    {isExpanded || isHovered || isMobileOpen ? (
                        <img src={LogoConTexto} alt="Logo" width={200} height={80} />
                    ) : (
                        <img src={LogoGobti} alt="Logo" width={60} height={60} />
                    )}
                </Link>
            </div>

            <div className="flex flex-col overflow-y-auto duration-300 ease-linear" style={{ maxHeight: "calc(100vh - 64px)" }}>
                <nav className="mb-6">
                    {renderMenuSection("Inicio", navItems)}
                    {renderMenuSection("Funciones", functionItems)}
                    {renderMenuSection("Otros", others)}
                </nav>
            </div>
        </aside>
    );
};

export default AppSidebar;
