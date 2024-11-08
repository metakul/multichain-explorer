import { useRpc } from "../../contexts/RpcProviderContext";
import "./Button.css";
import { Button } from "@radix-ui/themes";

import { CSSProperties } from "react";

interface ConnectWalletButtonProps {
    style?: CSSProperties;
    className?: string;
    [key: string]: unknown;
}

function ConnectWalletButton({ style, className = "", ...props }: ConnectWalletButtonProps) {
    const { connected, walletAddress, connectToRpc, disconnectWallet } = useRpc();

    const formatAddress = (address: string) => {
        if (!address) return "";
        return `${address.slice(0, 4)}...${address.slice(-4)}`;
    };

    const handleClick = async () => {
        if (connected) {
            disconnectWallet();
        } else {
            await connectToRpc("Polygon");
        }
    };

    return (
        <Button
            className={`btn ${className}`}
            onClick={handleClick}
            style={style}
            {...props}
        >
            {connected && walletAddress ? (
                <>
                    {formatAddress(walletAddress)} Disconnect Wallet
                </>
            ) : (
                "Connect Wallet"
            )}
        </Button>
    );
}

export default ConnectWalletButton;
