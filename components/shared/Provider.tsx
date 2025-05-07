"use client";
import React from "react";
import { AppProvider } from "@/contexts/ApplicationContext";
import { ManagerProvider } from "@/contexts/ManagerContext";
import { IdentityProvider } from "@/contexts/IdentitiesContext";

type Props = {
  children?: React.ReactNode;
};

const GlobalProvider = ({ children }: Props) => {
  return (
    <AppProvider>
      <ManagerProvider>
        <IdentityProvider>{children}</IdentityProvider>
      </ManagerProvider>
    </AppProvider>
  );
};

export default GlobalProvider;
