import React from "react";
import { ChevronLeftIcon } from "@radix-ui/react-icons";
import NavItem from "./NavItem";
import Button from "../../Components/UI/Button";
import Box from "../../Components/UI/Box";


export interface MiniDrawerProps {
    isSidebarOpen: boolean;
    setIsSidebarOpen: () => void;
    isNonMobile: boolean;
    navConfig: {
        text: string;
        icon: React.ReactNode | null;
        to: string;
    }[];
    APP_BAR: string;
}

const Sidebar: React.FC<MiniDrawerProps> = ({ setIsSidebarOpen, isNonMobile, isSidebarOpen, navConfig }) => {
    return (
        <Box display={isSidebarOpen ? "block" : "none"} style={{
            width: "240px",
        }}>
            <Button onClick={() => setIsSidebarOpen()}>
                <ChevronLeftIcon />
            </Button>
            <Box style={{ listStyle: 'none', padding: 0 }}>
                {navConfig.map((item: { text: string; icon: React.ReactNode | null; to: string; }, index: React.Key | null | undefined) => (
                    <NavItem isNonMobile={isNonMobile} item={item} key={index} isSidebarOpen={isSidebarOpen} />
                ))}
            </Box>

        </Box>
    );
};

export default Sidebar;