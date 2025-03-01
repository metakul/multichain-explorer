import { useState } from "react";
import { Box, useMediaQuery } from "@mui/material";

import Header from "./TopBar";

import "./global.css";
import MiniDrawer from "./Navigation";
import { useNavConfig } from "./navConfig";

// home page tabs
import { Outlet } from "react-router-dom";


import Footer from "./Footer";
import Topbar from "./TopBar";

export default function DashboardLayout() {
  const navConfig = useNavConfig()
  const isNonMobile = useMediaQuery("(min-width: 768px)");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [, setShowOutlet] = useState<boolean>(false);
  const APP_BAR = "64px";
  const handleSideBarState = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  return (
    <Box>
      <Topbar APP_BAR={APP_BAR}
        isNonMobile={isNonMobile}
        setIsSidebarOpen={handleSideBarState} />
      <Header
        APP_BAR={APP_BAR}
        isNonMobile={isNonMobile}
        setIsSidebarOpen={handleSideBarState}
      />
      <MiniDrawer
        APP_BAR={APP_BAR}
        setShowOutlet={setShowOutlet}
        isNonMobile={isNonMobile}
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={handleSideBarState}
        navConfig={navConfig}
      />
      <Box
        sx={{
          mt: 12,
          pl: isNonMobile ? 6 : 0,
          mx:isNonMobile ? 4 : 0
        }}
      >
        <Outlet />
        <Footer />
      </Box>
    </Box>
  );
}
