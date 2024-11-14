import React from 'react';
import * as NavigationMenu from '@radix-ui/react-navigation-menu';
import { CaretDownIcon } from '@radix-ui/react-icons';
import './navigation.css';
import { useNavigate } from 'react-router-dom';

interface NavigationProps {
    menuItems: { title: string; path: string; description: string }[];
}

const Navigation: React.FC<NavigationProps> = ({ menuItems }) => {
    const navigate = useNavigate();

    return (
        <NavigationMenu.Root className="NavigationRoot">
            <NavigationMenu.List className="NavigationList">
                {menuItems.map((item, index) => (
                    <NavigationMenu.Item key={index} className="NavigationItem">
                        <NavigationMenu.Trigger className="NavigationTrigger">
                            {item.title} <CaretDownIcon className="CaretDown" />
                        </NavigationMenu.Trigger>

                        <NavigationMenu.Content className="NavigationContent">
                            <ul className="NavigationContentList">
                                <li className="NavigationLinkItem">
                                    <NavigationMenu.Link asChild>
                                        <a
                                            className="NavigationLink"
                                            onClick={() => navigate(item.path)}
                                        >
                                            <div className="LinkTitle">{item.title}</div>
                                            <p className="LinkDescription">{item.description}</p>
                                        </a>
                                    </NavigationMenu.Link>
                                </li>
                            </ul>
                        </NavigationMenu.Content>
                    </NavigationMenu.Item>
                ))}
            </NavigationMenu.List>

            <NavigationMenu.Indicator className="NavigationIndicator">
                <div className="Arrow" />
            </NavigationMenu.Indicator>

            <div className="ViewportPosition">
                <NavigationMenu.Viewport className="NavigationViewport" />
            </div>
        </NavigationMenu.Root>
    );
};

export default Navigation;
