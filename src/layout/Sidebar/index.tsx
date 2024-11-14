import * as React from 'react';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import { useMediaQuery, useTheme } from '@mui/material';
import NavItem from './NavItem';
//css
import { CustomDrawer, DrawerHeader } from './style.css';
import { SwipeableDrawer } from '@mui/material';
import { Menu as MenuIcon } from "@mui/icons-material";

export interface MiniDrawerProps {
    isSidebarOpen: boolean;
    setIsSidebarOpen: () => void;
    navConfig: {
        text: string;
        icon: React.ReactNode | null;
        to: string;
    }[];
    APP_BAR: string;
}

const MiniDrawer: React.FC<MiniDrawerProps> = ({ setIsSidebarOpen, isSidebarOpen, navConfig }) => {
    const theme = useTheme();
    const isLgScreen = useMediaQuery(theme.breakpoints.up('lg'));

    return (
        <>
            {isLgScreen ? (
                <CustomDrawer variant="permanent" open={isSidebarOpen}>
                    <DrawerHeader>
                        <IconButton onClick={() => setIsSidebarOpen()}>
                            <MenuIcon />
                        </IconButton>
                    </DrawerHeader>
                    <Divider />

                    <List>
                        {navConfig.map((item, index) => (
                            <NavItem isNonMobile={isLgScreen} item={item} key={index} isSidebarOpen={isSidebarOpen} />
                        ))}
                    </List>
                    <Divider />
                    {isSidebarOpen && (
                        <DrawerHeader>
                            <IconButton onClick={() => setIsSidebarOpen()}>
                                <ChevronLeftIcon />
                            </IconButton>
                        </DrawerHeader>
                    )}
                    <Divider />
                </CustomDrawer>
            ) : (
                <SwipeableDrawer
                    variant="persistent"
                    open={isSidebarOpen}
                    onClose={(event: React.SyntheticEvent) => {
                        console.log(event);
                    }}
                    onOpen={(event: React.SyntheticEvent) => {
                        console.log(event);
                    }}
                >
                    <DrawerHeader>
                        <IconButton onClick={() => setIsSidebarOpen()}>
                            <MenuIcon />
                        </IconButton>
                    </DrawerHeader>
                    <Divider />
                    <List>
                        {navConfig.map((item, index) => (
                            <NavItem isNonMobile={isLgScreen} item={item} key={index} isSidebarOpen={isSidebarOpen} />
                        ))}
                    </List>
                    <Divider />
                    <DrawerHeader>
                        <IconButton onClick={() => setIsSidebarOpen()}>
                            <ChevronLeftIcon />
                        </IconButton>
                    </DrawerHeader>
                    <Divider />
                </SwipeableDrawer>
            )}
        </>
    );
};

export default MiniDrawer;
