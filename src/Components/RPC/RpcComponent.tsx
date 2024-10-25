import React, { useState } from "react";
import { useRpc } from "../../contexts/RpcProviderContext";

const RpcComponent: React.FC = () => {
    const { connected, rpcUrl, connectToRpc } = useRpc();
    const [customRpcUrl, setCustomRpcUrl] = useState<string>("");

    const handleConnect = async () => {
        // Use the custom RPC if provided, otherwise default to MetaMask
        await connectToRpc(customRpcUrl || undefined);
    };

    return (
        <div>
            <h2>Connect to RPC Endpoint</h2>
            <input
                type="text"
                value={customRpcUrl}
                placeholder="Enter custom RPC URL (optional)"
                onChange={(e) => setCustomRpcUrl(e.target.value)}
            />
            <button onClick={handleConnect}>Connect</button>

            <div>
                {connected ? (
                    <p>Connected to: {rpcUrl ? rpcUrl : "MetaMask/Default Network"}</p>
                ) : (
                    <p>Not connected</p>
                )}
            </div>
        </div>
    );
};

export default RpcComponent;
