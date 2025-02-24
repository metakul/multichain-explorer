import { useRpc } from "../../contexts/RpcProviderContext";
import Button from "../UI/Button";
import Text from "../UI/Text";
import "./Button.css";
import { CSSProperties, useEffect } from "react";

interface ConnectWalletButtonProps {
    style?: CSSProperties;
    className?: string;
    [key: string]: unknown;
}

function ConnectWalletButton({ style, ...props }: ConnectWalletButtonProps) {
    const { connected, walletAddress,rpcUrl,setRpc, connectToRpc, disconnectWallet, networkName } = useRpc();

    const formatAddress = (address: string) => {
        if (!address) return "";
        return `${address.slice(0, 4)}...${address.slice(-4)}`;
    };

    useEffect(() => {
        if (rpcUrl) {
            setRpc(networkName);
        }
    }, [rpcUrl, setRpc, networkName]);

    const handleClick = async () => {
        if (connected) {
            disconnectWallet();
        } else {
            await connectToRpc(networkName);
        }
    };

    return (
        <Button
            onClick={handleClick}
            style={style}
            {...props}
        >
            {connected && walletAddress ? (
                <>
                    {formatAddress(walletAddress)} Disconnect Wallet
                </>
            ) : (
                <Text>

                Connect Wallet
                </Text>
            )}
        </Button>
    );
}

export default ConnectWalletButton;
