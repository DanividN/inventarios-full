import {
  Bell,
  LogOut,
  MoreHorizontal,
  MoreVertical,
  X,
  Menu,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { router, usePage } from "@inertiajs/react";
import { useSidebar } from "@/context/sidebar-context";
import Breadcrumb from "@/components/breadcrumbs";

const AppHeader = () => {
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [isMobileView, setIsMobileView] = useState(
    typeof window !== "undefined" && window.innerWidth < 1024
  );

  const { isMobileOpen, toggleSidebar, toggleMobileSidebar } = useSidebar();
  const { props } = usePage();
  const user = props.auth?.user || { name: "Usuario", role: "Invitado" };

  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    const handleResize = () => {
      setIsMobileView(window.innerWidth < 1024);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        inputRef.current?.focus();
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  const handleToggleSidebar = () => {
    if (isMobileView) {
      toggleMobileSidebar();
    } else {
      toggleSidebar();
    }
  };

  const logout = () => {
    router.post("/logout");
  };

  return (
    <header
      className="sticky top-0 z-50 w-full bg-white border-b"
      style={{
        borderBottom: "8px solid transparent",
        borderImage:
          "linear-gradient(to right, #e3e9f0, rgb(107, 153, 96), rgb(17, 86, 64)) 1",
      }}
    >
      <div className="flex items-center justify-between px-4 py-3 lg:px-6 h-16">
        {/* Left section */}
        <div className="flex items-center gap-2">
          <button
            className="w-10 h-10 rounded-lg flex items-center justify-center text-gray-600 hover:bg-gray-100"
            onClick={handleToggleSidebar}
            aria-label="Toggle Sidebar"
          >
            {isMobileOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
          {!isMobileView && <Breadcrumb />}
        </div>

        {/* Right section */}
        <div className="flex items-center gap-3">
          <button className="relative w-10 h-10 p-[5px] text-gray-500 rounded-lg border shadow">
            <Bell className="w-5 h-5" />
          </button>

          <div className="hidden lg:flex flex-col items-start">
            <span className="text-sm font-semibold text-gray-800">
              {user.name}
            </span>
            <span className="text-xs text-gray-500">{user.role}</span>
          </div>

          <button
            className="w-10 h-10 p-[5px] text-gray-500 border rounded-lg shadow"
            onClick={logout}
            aria-label="Cerrar sesión"
          >
            <LogOut className="w-5 h-5" />
          </button>

          {/* Mobile Dropdown */}
          <div className="lg:hidden relative">
            <button
              onClick={() => setDropdownOpen(!isDropdownOpen)}
              className="w-10 h-10 flex items-center justify-center"
            >
              {isDropdownOpen ? (
                <MoreVertical className="w-5 h-5 text-gray-500" />
              ) : (
                <MoreHorizontal className="w-5 h-5 text-gray-500" />
              )}
            </button>

            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow z-50">
                <div className="px-4 py-2 border-b bg-gray-100">
                  <span className="block text-sm font-semibold text-gray-800">
                    {user.name}
                  </span>
                  <span className="block text-xs text-gray-500">
                    {user.role}
                  </span>
                </div>
                <button
                  onClick={() => router.visit("/notifications")}
                  className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
                >
                  Notificaciones
                </button>
                <button
                  onClick={logout}
                  className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
                >
                  Cerrar sesión
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Breadcrumb below header for mobile */}
      {isMobileView && !isMobileOpen && (
        <div className="px-4 py-2 bg-gray-50 border-t border-gray-200">
          <Breadcrumb />
        </div>
      )}
    </header>
  );
};

export default AppHeader;
