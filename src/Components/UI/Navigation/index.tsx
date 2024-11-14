import React, { useState } from 'react';
import { Button,  Popover,  List, ListItem, ListItemText } from '@mui/material';
import { useNavigate } from 'react-router-dom';

interface NavigationProps {
    menuItems: { title: string; path: string; description: string }[];
}

const Navigation: React.FC<NavigationProps> = ({ menuItems }) => {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [activeItem, setActiveItem] = useState<{ title: string; description: string } | null>(null);
    const navigate = useNavigate();

    const handleClick = (event: React.MouseEvent<HTMLElement>, item: { title: string; description: string }) => {
        setAnchorEl(event.currentTarget);
        setActiveItem(item);
    };

    const handleClose = () => {
        setAnchorEl(null);
        setActiveItem(null);
    };

    const handleNavigate = (path: string) => {
        navigate(path);
        handleClose();
    };

    return (
        <div>
            {menuItems.map((item, index) => (
                <div key={index}>
                    <Button
                        aria-controls={`menu-${index}`}
                        aria-haspopup="true"
                        onClick={(event) => handleClick(event, item)}
                    >
                        {item.title}
                    </Button>

                    <Popover
                        id={`menu-${index}`}
                        open={Boolean(anchorEl) && activeItem?.title === item.title}
                        anchorEl={anchorEl}
                        onClose={handleClose}
                        anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'left',
                        }}
                    >
                        <List>
                            <ListItem onClick={() => handleNavigate(item.path)}>
                                <ListItemText
                                    primary={item.title}
                                    secondary={item.description}
                                />
                            </ListItem>
                        </List>
                    </Popover>
                </div>
            ))}
        </div>
    );
};

export default Navigation;
