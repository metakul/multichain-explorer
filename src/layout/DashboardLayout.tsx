import { Outlet } from "react-router-dom";

import Header from "./Topbar";
import { Box, Container } from "@radix-ui/themes";

export default function DashboardLayout() {

  return (
    <>
      <Header />
      <Box style={{
      marginTop:"100px",
      display:"flex",
      justifyContent:"center",
      alignItems:"center",
      flexDirection:"row",
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