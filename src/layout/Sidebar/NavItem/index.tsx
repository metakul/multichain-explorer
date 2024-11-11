import React from "react";
import { useNavigate } from "react-router-dom";
import { Box, Flex, Text, IconButton } from "@radix-ui/themes";

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
    const navigate = useNavigate();


    return (
        <Box key={text} style={{ display: isSidebarOpen ? 'block' : 'none', padding: 0 }}>
            <Flex
                onClick={icon ? () => navigate(to) : undefined}
                style={{ cursor: "pointer", alignItems: 'center' }}
            >
                <IconButton
                    style={{
                        minHeight: 48,
                        justifyContent: isSidebarOpen ? 'initial' : 'center',
                        padding: '0 10px',
                        width: '100%',
                        display: 'flex',
                        alignItems: 'center',
                    }}
                >
                    {icon && (
                        <Box
                            style={{
                                minWidth: 0,
                                marginRight: isSidebarOpen ? '12px' : 'auto',
                                display: 'flex',
                                justifyContent: 'center',
                            }}
                        >
                            {icon}
                        </Box>
                    )}
                    <Text
                        style={{
                            opacity: isSidebarOpen ? 1 : 0,
                            transition: 'opacity 0.3s',
                        }}
                    >
                        {text}
                    </Text>
                </IconButton>
            </Flex>
        </Box>
    );
};

export default NavItem;