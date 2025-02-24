import { Outlet } from "react-router-dom";

import Header from "./Topbar";
// import RpcComponent from "../Components/RPC/RpcComponent";
import Sidebar from "./Sidebar";
import { useState } from "react";
import navConfig from "./navConfig";
import Box from "../Components/UI/Box";
import Container from "../Components/UI/Container";

export default function DashboardLayout() {
  const APP_BAR = "64px"
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleSideBarState = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <>
      <Header APP_BAR={APP_BAR} setIsSidebarOpen={handleSideBarState} />
      <Box style={{
        marginTop: 80,
        marginLeft: "auto",
        marginRight: "auto"
      }}>
        {/* <RpcComponent /> */}
        <Sidebar
          APP_BAR={APP_BAR}
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