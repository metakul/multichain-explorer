import { Outlet } from "react-router-dom";

import Header from "./Topbar";
import { Box, Container } from "@radix-ui/themes";
import RpcComponent from "../Components/RPC/RpcComponent";
import Sidebar from "./Sidebar";
import { useState } from "react";
import navConfig from "./navConfig";
import useMediaQuery from "../hooks/useMediaQuery";

export default function DashboardLayout() {
  const APP_BAR = "64px"
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const isNonMobile = useMediaQuery("(min-width: 768px)");

  const handleSideBarState = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <>
      <Header APP_BAR={APP_BAR} setIsSidebarOpen={handleSideBarState} />
      <RpcComponent />
      <Box style={{
        marginTop: APP_BAR,
        marginLeft: "auto",
        marginRight: "auto"
      }}>
        <Sidebar
          APP_BAR={APP_BAR}
          isNonMobile={isNonMobile}
          isSidebarOpen={isSidebarOpen}
          setIsSidebarOpen={handleSideBarState}
          navConfig={navConfig}
        />
        <Container>
          <Outlet />
        </Container>
      </Box>
    </>
  );
}