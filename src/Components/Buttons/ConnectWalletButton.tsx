import { useWalletAuth } from "../../contexts/WalletAuthContext";
import "./Button.css";
import { Button } from "@radix-ui/themes";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function ConnectWalletButton({style, className = "", ...props }:any) {
    const { connected, walletAddress, connectWallet } = useWalletAuth();

    const formatAddress = (address: string ) => {
        if (!address) return "";
        return `${address.slice(0, 4)}...${address.slice(-3)}`;
    };

    return (
        <Button
            className={`${className}`}
            onClick={connectWallet}
            style={style}
            {...props}
        >
            {connected ? `${formatAddress(walletAddress)} Disconnect Wallet` : "Connect Wallet"}
        </Button>
    );
}

export default ConnectWalletButton;
