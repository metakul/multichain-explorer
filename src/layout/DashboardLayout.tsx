import { Outlet } from "react-router-dom";

import Header from "./Topbar";
import { Box, Container } from "@radix-ui/themes";

export default function DashboardLayout() {

  return (
    <>
      <Header />
      <Box style={{
        maxWidth: "100vw",
        paddingLeft: "10px",
        paddingRight: "10px",
      }}>
        <Container>
          <Outlet />
        </Container>
      </Box>
    </>
  );
}