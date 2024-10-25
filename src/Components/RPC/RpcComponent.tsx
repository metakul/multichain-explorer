import React, { useState } from "react";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { useRpc } from "../../contexts/RpcProviderContext";
import { NetworkType } from "../../DataTypes/enums";
import { Box, Flex } from "@radix-ui/themes";

const RpcComponent: React.FC = () => {
    const { connected, networkName, connectToRpc } = useRpc();
    const [customRpcUrl, setCustomRpcUrl] = useState<string>("");
    const [selectedNetwork, setSelectedNetwork] = useState<NetworkType>("polygon");

    const handleConnect = async () => {
        // Use the custom RPC URL and selected network if provided
        await connectToRpc(selectedNetwork, customRpcUrl || undefined);
    };

    return (
        <div>
            <h2>Connect to RPC Endpoint</h2>
            <Box width="64px" height="64px" style={{
                position:"absolute",
                right:0
            }}>
                <Flex direction={"row"}>
                    <Box>

                        <DropdownMenu.Root>
                            <DropdownMenu.Trigger asChild>
                                <button>Select Network: {selectedNetwork}</button>
                            </DropdownMenu.Trigger>
                            <DropdownMenu.Content>
                                <DropdownMenu.Item onSelect={() => setSelectedNetwork("polygon")}>
                                    Polygon
                                </DropdownMenu.Item>
                                <DropdownMenu.Item onSelect={() => setSelectedNetwork("bsc")}>
                                    BSC
                                </DropdownMenu.Item>
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

        
        </div>
    );
};

export default RpcComponent;
