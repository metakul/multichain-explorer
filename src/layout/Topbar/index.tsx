
// @mui
import {
    Box,
    AppBar,
    Toolbar,
    IconButton,
    Stack,
    // Button,
    // Typography,
} from "@mui/material";
import ListIcon from '@mui/icons-material/List';
// const NAV_WIDTH = 280;
import "./style.css"
import { NavLink as RouterLink } from "react-router-dom";
import ConnectWalletButton from "../../Components/Buttons/ConnectWalletButton";
// import { PROJECTS } from "../../DataTypes/enums";
import RpcComponent from "../../Components/RPC/RpcComponent";

interface HeaderProps {
    setIsSidebarOpen: () => void;
    APP_BAR: string
}

const Header: React.FC<HeaderProps> = ({ setIsSidebarOpen, APP_BAR }) => {
    // const navigate = useNavigate()
    // const { networkName } = useRpc();

    return (
        <AppBar sx={{
            height: APP_BAR
        }} >
            <Toolbar>
                <IconButton
                    onClick={() => setIsSidebarOpen()}
                >
                    <ListIcon />
                </IconButton>
                <Box
                    component={RouterLink}
                    to={"/"}>
                    Logo
                    {/* <img src={`logo.svg`} alt="logo" className="w-8 h-8 ml-4" /> */}
                </Box>

                <Stack
                    direction="row"
                    alignItems="center"
                    spacing={{
                        xs: 0.5,
                        sm: 1,
                    }}
                    sx={{ ml: 'auto' }}
                >
                    <ConnectWalletButton />
                        <RpcComponent/>
                </Stack>
            </Toolbar>
        </AppBar>
    );
}

export default Header;