"use client";
import React, { useState } from "react";
import { styled, Container, Box, ThemeProvider } from "@mui/material";

import Header from "../full/header/Header";
import Sidebar from "../full/sidebar/Sidebar";
import { SessionProvider } from "next-auth/react";
import { GlobalContextProvider } from "@/context/GlobalContext";
import SnackBarComponent from "@/ui/SnackBarComponent";
import { baselightTheme } from "@/theme/DefaultColors";

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
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const [isMobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  return (
    <SessionProvider>
      <GlobalContextProvider>
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
                <Header
                  toggleMobileSidebar={() => setMobileSidebarOpen(true)}
                />
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
                    overflow: "scroll",
                  }}
                >
                  {children}
                </Container>
                <SnackBarComponent />
              </PageWrapper>
            </>
          </MainWrapper>
        </ThemeProvider>
      </GlobalContextProvider>
    </SessionProvider>
  );
};

export default FullLayout;
