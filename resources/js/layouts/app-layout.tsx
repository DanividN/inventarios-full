import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import React from "react";
import { SidebarProvider, useSidebar } from "@/context/sidebar-context";
import AppSidebar from "./app/app-sidebar";
import Backdrop from "@/components/backdrop";
import AppHeader from "@/components/app-header";

// Definimos tipo para props.children
type LayoutProps = {
  children: React.ReactNode;
};

const LayoutContent: React.FC<LayoutProps> = ({ children }) => {
  const { isExpanded, isHovered, isMobileOpen } = useSidebar();

  return (
    <div className="min-h-screen xl:flex">
      <div>
        <AppSidebar />
        <Backdrop />
      </div>

      <div
        className={`flex-1 transition-all duration-300 ease-in-out ${
          isExpanded || isHovered ? "lg:ml-[290px]" : "lg:ml-[70px]"
        } ${isMobileOpen ? "ml-0" : ""}`}
      >
        <AppHeader />
        <div className="p-6 mx-auto">{children}</div>
      </div>

      <ToastContainer
        position="top-right"
        autoClose={3000}
        closeOnClick={false}
        toastClassName="toast"
      />
    </div>
  );
};

const AppLayout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <SidebarProvider>
      <LayoutContent>{children}</LayoutContent>
    </SidebarProvider>
  );
};

export default AppLayout;

