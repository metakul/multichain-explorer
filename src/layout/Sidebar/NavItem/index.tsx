import React from "react";
import { ListItemText, ListItem, ListItemButton, ListItemIcon } from "@mui/material";
import { NavLink as RouterLink } from "react-router-dom";

interface NavItemProps {
    item: {
        text: string;
        icon: React.ReactNode | null;
        to: string;
    };
    isSidebarOpen: boolean;
    isNonMobile: boolean;
}

const NavItem: React.FC<NavItemProps> = ({ item, isSidebarOpen }) => {
    const { text, icon, to } = item;
   
    return (
        <ListItem key={text} disablePadding sx={{ display: 'block' }}>
            <ListItemButton
                component={RouterLink}
                to={to}
                sx={{
                    minHeight: 48,
                    justifyContent: isSidebarOpen ? 'initial' : 'center',
                    px: 2.5,
                }}
            >
                {icon && (
                    <ListItemIcon
                        sx={{
                            minWidth: 0,
                            mr: isSidebarOpen ? 3 : 'auto',
                            justifyContent: 'center',
                        }}
                    >
                        {icon}
                    </ListItemIcon>
                )}
                <ListItemText primary={text} sx={{ opacity: isSidebarOpen ? 1 : 0 }} />
            </ListItemButton>
        </ListItem>
    );
};

export default NavItem;