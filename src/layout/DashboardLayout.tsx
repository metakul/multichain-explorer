import { Outlet } from "react-router-dom";

import Header from "./Topbar";
import { Box, Container } from "@radix-ui/themes";

export default function DashboardLayout() {

  return (
    <Box>
      <Header />
      <Container>
        <Outlet />
      </Container>
    </Box>
  );
}