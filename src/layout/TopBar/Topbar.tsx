import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

// @mui
import {
  Box,
  Stack,
  AppBar,
  Toolbar,
  IconButton,
  useTheme,
} from "@mui/material";
import {
  Menu as MenuIcon,
} from "@mui/icons-material";
import { ColorModeContext, getColors } from "../Theme/themes";

import { motion } from "framer-motion";
import "./style.css"
// import { ConnectButton } from "thirdweb/react";
// import { client } from "../../client";
import ConnectWalletButton from "../../Components/Buttons/ConnectWalletButton";
// import { PROJECTS } from "../../DataTypes/enums";
import RpcComponent from "../../Components/RPC/RpcComponent";

interface HeaderProps {
    setIsSidebarOpen: () => void;
    APP_BAR: string
    isNonMobile: boolean;
  
  }

const Header: React.FC<HeaderProps> = ({ setIsSidebarOpen, APP_BAR, isNonMobile }) => {

      const navigate = useNavigate()
   
    
    
    return (
        <AppBar sx={{
            backgroundColor:getColors().primary[900],
              height: APP_BAR,
              border:"none"
            }} >
              <Toolbar>
        
             {!isNonMobile &&   <IconButton
                  onClick={() => setIsSidebarOpen()}
                  sx={{
                    mt: 2,
                    color: getColors().blueAccent[100]
                  }}
                >
                  <MenuIcon />
                  {/* <img src={`/Images/main-menu.png`} alt="logo" className="w-8 h-8 ml-4" /> */}
                </IconButton>
        }
                <Box
                  onClick={() => navigate("/")}
                  sx={{ cursor: "pointer", mt: 2 }}
                >
                  <img src={`logo.svg`} alt="logo" className="" style={{
                    width:"48px"
                  }}/>
                </Box>
        
                <Box sx={{ flexGrow: 1 }} />
                {/* <ConnectButton client={client} /> */}
                <RpcComponent/>
                <ConnectWalletButton/>
             
              </Toolbar>
            </AppBar>
    )
};



  
export default Header;
