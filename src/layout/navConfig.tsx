import { Pages, PROJECTS } from "../DataTypes/enums";
import { useRpc } from "../contexts/RpcProviderContext";
import HomeIcon from '@mui/icons-material/Home';
import ViewInArIcon from '@mui/icons-material/ViewInAr';
import SwapHorizIcon from '@mui/icons-material/SwapHoriz';
import ContactEmergencyIcon from '@mui/icons-material/ContactEmergency';
import ApiIcon from '@mui/icons-material/Api';

export const useNavConfig = () => {
    const { networkName } = useRpc();

    return [
        {
            text: "Dashboard",
            icon: <HomeIcon/>,
            to: `/`,
        },
        {
            text: "Into the Metaverse",
            icon: null,
            to: "",
        },
        {
            text: "All Blocks",
            icon: <ViewInArIcon/>,
            to: `/blocks/${networkName}`,
        },
        {
            text: "All Transactions",
            icon: <SwapHorizIcon/>,
            to: `/transactions/${networkName}`,
        },

        {
            text: "Profile",
            icon: <ContactEmergencyIcon/>,
            to:`${PROJECTS.WEB3_PROFILE}/${networkName}`,
            
        },
        {
            text: "REST_API",
            icon: <ApiIcon/>,
            to: Pages.API,
        },
    ];
};
