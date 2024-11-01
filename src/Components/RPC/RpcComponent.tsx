import React, { useState } from "react";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { useRpc } from "../../contexts/RpcProviderContext";
import { Network, NetworkType } from "../../DataTypes/enums";
import { Box, Flex } from "@radix-ui/themes";

const RpcComponent: React.FC = () => {
    const { connected, networkName, connectToRpc } = useRpc();
    const [customRpcUrl, setCustomRpcUrl] = useState<string>("");
    const [selectedNetwork, setSelectedNetwork] = useState<NetworkType>("Polygon");

    const handleConnect = async () => {
        // Use the custom RPC URL and selected network if provided
        await connectToRpc(selectedNetwork, customRpcUrl || undefined);
    };

    return (
    
            <Box width="64px" height="64px" style={{
                position:"absolute",
                right:0,
                top:100
            }}>
                <Flex direction={"row"}>
                    <Box>
                        <DropdownMenu.Root>
                            <DropdownMenu.Trigger asChild>
                                <button>Select Network: {Network[selectedNetwork]}</button>
                            </DropdownMenu.Trigger>
                            <DropdownMenu.Content>
                                {Object.keys(Network).map((network) => (
                                    <DropdownMenu.Item
                                        key={network}
                                        onSelect={() => setSelectedNetwork(network as NetworkType)}
                                    >
                                        {Network[network as NetworkType].charAt(0).toUpperCase() +
                                            Network[network as NetworkType].slice(1)}
                                    </DropdownMenu.Item>
                                ))}
                            </DropdownMenu.Content>
                        </DropdownMenu.Root>
                    </Box>
                    <Box>
                        <input
                            type="text"
                            value={customRpcUrl}
                            placeholder="Enter custom RPC URL (optional)"
                            onChange={(e) => setCustomRpcUrl(e.target.value)}
                        />
                    </Box>
                    <Box>
                        <div>
                            {connected ? (
                                <button onClick={handleConnect}>Connected to {networkName}</button>

                            ) : (
                                <button onClick={handleConnect}>Connect</button>
                            )}
                        </div>
                    </Box>
                </Flex>
            </Box>

        
    );
};

export default RpcComponent;
