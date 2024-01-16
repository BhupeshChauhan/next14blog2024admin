"use client";
import React, { useEffect } from "react";
import BlankLayout from "./blank/BlankLayout";
import FullLayout from "./full/FullLayout";
import { LinearProgress } from "@mui/material";
import SnackBarComponent from "@/ui/SnackBarComponent";
import AuthProvider from "@/utils/AuthProvider";
import { GlobalContextProvider } from "@/context/GlobalContext";
import AuthGard from "./AuthGard";

interface Props {
  children: React.ReactNode;
  type: string;
}

const LoadingSpinner = () => {
  return (
    <div
      style={{
        height: "100vh",
        width: "100vw",
        position: "fixed",
        zIndex: 2000,
      }}
    >
      <LinearProgress />
    </div>
  );
};

const Layout: React.FC<Props> = ({ children, type }) => {
  // const lgUp = useMediaQuery((theme) => theme.breakpoints.up("lg"));

  return (
    <AuthProvider>
      <GlobalContextProvider>
        <AuthGard>
          {type === "Full" && (
            <>
              {/* {loading && <LoadingSpinner />} */}
              <FullLayout>{children}</FullLayout>
            </>
          )}
          {type === "Blank" && (
            <>
              {/* {loading && <LoadingSpinner />} */}
              <BlankLayout>{children}</BlankLayout>
            </>
          )}
          <SnackBarComponent />
        </AuthGard>
      </GlobalContextProvider>
    </AuthProvider>
  );
};

export default Layout;
