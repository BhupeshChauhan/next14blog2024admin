"use client";
import React, { useEffect, useState } from "react";
import { styled, Container, Box, ThemeProvider } from "@mui/material";

import Header from "../full/header/Header";
import Sidebar from "../full/sidebar/Sidebar";
import { useGlobalContext } from "@/context/GlobalContext";
import SnackBarComponent from "@/ui/SnackBarComponent";
import { baselightTheme } from "@/theme/DefaultColors";
import { useRouter } from "next/navigation";
import { getModulePermissions } from "../../../lib/actions/roles.actions";

const MainWrapper = styled("div")(() => ({
  display: "flex",
  height: "100vh",
  width: "100%",
}));

const PageWrapper = styled("div")(() => ({
  display: "flex",
  flexGrow: 1,
  flexDirection: "column",
  height: "100%",
  zIndex: 1,
  marginBottom: "20px",
  backgroundColor: "transparent",
}));

const FullLayout = ({ children }: any) => {
  const route = useRouter();
  const { userData, setUserData } = useGlobalContext();

  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const [isMobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  useEffect(() => {
    if (userData.length === 0) {
      route.push("/login");
    }
  }, [userData, route]);

  return (
    <ThemeProvider theme={baselightTheme}>
      <MainWrapper className="mainwrapper">
        <>
          {/* ------------------------------------------- */}
          {/* Sidebar */}
          {/* ------------------------------------------- */}
          <Sidebar
            isSidebarOpen={isSidebarOpen}
            isMobileSidebarOpen={isMobileSidebarOpen}
            onSidebarClose={() => setMobileSidebarOpen(false)}
          />
          {/* ------------------------------------------- */}
          {/* Main Wrapper */}
          {/* ------------------------------------------- */}
          <PageWrapper className="page-wrapper">
            {/* ------------------------------------------- */}
            {/* Header */}
            {/* ------------------------------------------- */}
            <Header toggleMobileSidebar={() => setMobileSidebarOpen(true)} />
            {/* ------------------------------------------- */}
            {/* PageContent */}
            {/* ------------------------------------------- */}
            <Container
              sx={{
                paddingTop: "20px",
                maxWidth: "1200px",
                display: "flex",
                flexGrow: 1,
                width: "100%",
              }}
            >
              {children}
            </Container>
            <SnackBarComponent />
          </PageWrapper>
        </>
      </MainWrapper>
    </ThemeProvider>
  );
};

export default FullLayout;
