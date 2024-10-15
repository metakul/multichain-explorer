import React from 'react';
import * as NavigationMenu from '@radix-ui/react-navigation-menu';
import classNames from 'classnames';
import { CaretDownIcon } from '@radix-ui/react-icons';
import './style.css';
import ConnectWalletButton from '../../Components/Buttons/ConnectWalletButton';
import { EXPLORER, Pages, PROJECTS } from '../../DataTypes/enums';
import { useWalletAuth } from '../../contexts/WalletAuthContext';
import { useNavigate } from 'react-router-dom';
import { Button } from '@radix-ui/themes';

const NavigationMenuDemo = () => {
    const { connected} = useWalletAuth();
    const navigate =useNavigate()

    return (
        <NavigationMenu.Root className="NavigationMenuRoot">
            <NavigationMenu.List className="NavigationMenuList">
                <NavigationMenu.Item>
                    <NavigationMenu.Trigger className="NavigationMenuTrigger">
                        Learn <CaretDownIcon className="CaretDown" aria-hidden />
                    </NavigationMenu.Trigger>
                    <NavigationMenu.Content className="NavigationMenuContent">
                        <ul className="List one">
                            <li style={{ gridRow: 'span 3' }}>
                                <NavigationMenu.Link asChild>
                                    <a className="Callout" href="/">
                                        <svg aria-hidden width="38" height="38" viewBox="0 0 25 25" fill="white">
                                            <path d="M12 25C7.58173 25 4 21.4183 4 17C4 12.5817 7.58173 9 12 9V25Z"></path>
                                            <path d="M12 0H4V8H12V0Z"></path>
                                            <path d="M17 8C19.2091 8 21 6.20914 21 4C21 1.79086 19.2091 0 17 0C14.7909 0 13 1.79086 13 4C13 6.20914 14.7909 8 17 8Z"></path>
                                        </svg>
                                        <div className="CalloutHeading">Metakul Primitives</div>
                                        <p className="CalloutText">Unstyled, Reusable, Secure Smart Contracts {'>>'} Ready to deploy.</p>
                                    </a>
                                </NavigationMenu.Link>
                            </li>

                            <ListItem onClick={() => navigate(Pages.HOME)} title="Dashboard">
                                CSS-in-JS with best-in-class developer experience.
                            </ListItem>
                            <ListItem onClick={() => navigate(PROJECTS.CONTRACTS_HOME)} title="Contracts">
                                Beautiful, thought-out palettes with auto dark mode.
                            </ListItem>
                            <ListItem onClick={() => navigate(EXPLORER.EXPLORER_HOME)} title="Explorer">
                               A local BLockchain Explorer to view trx, addresses, etc
                            </ListItem>
                        </ul>
                    </NavigationMenu.Content>
                </NavigationMenu.Item>

                <NavigationMenu.Indicator className="NavigationMenuIndicator">
                    <div className="Arrow" />
                </NavigationMenu.Indicator>

                <NavigationMenu.Item style={{
                    position: "absolute",
                    right: "8px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                }} >
                    <ConnectWalletButton />
                    {connected &&
                        <Button onClick={()=>navigate(PROJECTS.WEB3_PROFILE)}>
                            <svg width="40" height="25" viewBox="0 0 15 13" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M7.5 0.875C5.49797 0.875 3.875 2.49797 3.875 4.5C3.875 6.15288 4.98124 7.54738 6.49373 7.98351C5.2997 8.12901 4.27557 8.55134 3.50407 9.31167C2.52216 10.2794 2.02502 11.72 2.02502 13.5999C2.02502 13.8623 2.23769 14.0749 2.50002 14.0749C2.76236 14.0749 2.97502 13.8623 2.97502 13.5999C2.97502 11.8799 3.42786 10.7206 4.17091 9.9883C4.91536 9.25463 6.02674 8.87499 7.49995 8.87499C8.97317 8.87499 10.0846 9.25463 10.8291 9.98831C11.5721 10.7206 12.025 11.8799 12.025 13.5999C12.025 13.8623 12.2376 14.0749 12.5 14.0749C12.7623 14.075 12.975 13.8623 12.975 13.6C12.975 11.72 12.4778 10.2794 11.4959 9.31166C10.7244 8.55135 9.70025 8.12903 8.50625 7.98352C10.0187 7.5474 11.125 6.15289 11.125 4.5C11.125 2.49797 9.50203 0.875 7.5 0.875ZM4.825 4.5C4.825 3.02264 6.02264 1.825 7.5 1.825C8.97736 1.825 10.175 3.02264 10.175 4.5C10.175 5.97736 8.97736 7.175 7.5 7.175C6.02264 7.175 4.825 5.97736 4.825 4.5Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path></svg>
                        </Button>
                    }
                </NavigationMenu.Item>
            </NavigationMenu.List>

            <div className="ViewportPosition">

                <NavigationMenu.Viewport className="NavigationMenuViewport" />
            </div>
        </NavigationMenu.Root>
    );
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const ListItem = React.forwardRef(({ className, children, title, ...props }: any, forwardedRef) => (
    <li>
        <NavigationMenu.Link asChild>
            <a className={classNames('ListItemLink', className)} {...props} ref={forwardedRef}>
                <div className="ListItemHeading">{title}</div>
                <p className="ListItemText">{children}</p>
            </a>
        </NavigationMenu.Link>
    </li>
));

export default NavigationMenuDemo;
