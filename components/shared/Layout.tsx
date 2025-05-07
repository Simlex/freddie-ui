"use client";
import NextTopLoader from "nextjs-toploader";
import React, {
  FunctionComponent,
  ReactElement,
  ReactNode,
  useContext,
} from "react";
import Navbar from "./Navbar";
import { usePathname } from "next/navigation";
import OfflineAlert from "@/components/modal/OfflineAlert";
import {
  ApplicationContext,
  ApplicationContextData,
} from "@/contexts/ApplicationContext";
import { Toaster } from "sonner";
import Sidebar from "./Sidebar";

interface LayoutProps {
  children?: ReactNode;
}

const Layout: FunctionComponent<LayoutProps> = ({ children }): ReactElement => {
  const { offlineStatusModalVisibility, hideOfflineStatusModalVisibility } =
    useContext(ApplicationContext) as ApplicationContextData;

  return (
    <>
      <OfflineAlert
        visibility={offlineStatusModalVisibility}
        setVisibility={hideOfflineStatusModalVisibility}
      />
      <NextTopLoader
        color="#5419a7"
        initialPosition={0.08}
        crawlSpeed={200}
        height={3}
        crawl={true}
        showSpinner={true}
        easing="ease"
        speed={200}
        shadow="0 0 10px #f1fa9e,0 0 5px #ceb0fa"
      />
      <Toaster
        position="top-center"
        richColors
        closeButton
        toastOptions={{
          duration: 3000,
          unstyled: false,
        }}
      />
      <div className="flex min-h-screen bg-background">
        <Sidebar />
        <div className="flex-1 flex flex-col">
          <Navbar />
          <main className="flex-1 p-6">{children}</main>
        </div>
      </div>
    </>
  );
};

export default Layout;
