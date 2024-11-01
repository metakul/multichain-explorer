import { Outlet } from "react-router-dom";

import Header from "./Topbar";
import { Box, Container } from "@radix-ui/themes";
import RpcComponent from "../Components/RPC/RpcComponent";

export default function DashboardLayout() {

  return (
    <>
      <Header />
      <RpcComponent/>
      <Box style={{
      marginTop:"80px",
      marginLeft:"auto",
      marginRight:"auto"
      }}>
        <Container>
          <Outlet />
        </Container>
      </Box>
    </>
  );
}