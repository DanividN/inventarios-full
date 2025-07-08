import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

// Definimos la forma del contexto
interface SidebarContextType {
  isExpanded: boolean;
  isMobileOpen: boolean;
  isHovered: boolean;
  activeItem: string | null;
  openSubmenu: string | null;
  toggleSidebar: () => void;
  toggleMobileSidebar: () => void;
  setIsHovered: (hovered: boolean) => void;
  setActiveItem: (item: string | null) => void;
  toggleSubmenu: (item: string) => void;
}

// Creamos el contexto con valor inicial undefined
const SidebarContext = createContext<SidebarContextType | undefined>(undefined);

// Hook para acceder al contexto
export const useSidebar = (): SidebarContextType => {
  const context = useContext(SidebarContext);
  if (!context) {
    throw new Error("useSidebar must be used within a SidebarProvider");
  }
  return context;
};

// Props para el proveedor
interface SidebarProviderProps {
  children: ReactNode;
}

export const SidebarProvider = ({ children }: SidebarProviderProps) => {
  const [isExpanded, setIsExpanded] = useState(true);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [activeItem, setActiveItem] = useState<string | null>(null);
  const [openSubmenu, setOpenSubmenu] = useState<string | null>(null);

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);

      if (!mobile) {
        setIsMobileOpen(false);
      }
    };

    handleResize(); // Ejecutamos una vez
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleSidebar = () => setIsExpanded((prev) => !prev);

  const toggleMobileSidebar = () => setIsMobileOpen((prev) => !prev);

  const toggleSubmenu = (item: string) =>
    setOpenSubmenu((prev) => (prev === item ? null : item));

  return (
    <SidebarContext.Provider
      value={{
        isExpanded: isMobile ? false : isExpanded,
        isMobileOpen,
        isHovered,
        activeItem,
        openSubmenu,
        toggleSidebar,
        toggleMobileSidebar,
        setIsHovered,
        setActiveItem,
        toggleSubmenu,
      }}
    >
      {children}
    </SidebarContext.Provider>
  );
};
