import React, { useEffect, useState } from "react";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { useRpc } from "../../contexts/RpcProviderContext";
import { Network, NetworkType } from "../../DataTypes/enums";
import { Box, Flex } from "@radix-ui/themes";

const RpcComponent: React.FC = () => {
    const { networkName, setRpc } = useRpc();
    const [customRpcUrl, setCustomRpcUrlState] = useState<string>("");
    const [selectedNetwork, setSelectedNetwork] = useState<NetworkType>(networkName);
    const [isCustomRpc, setIsCustomRpc] = useState<boolean>(false);
    const [isEditing, setIsEditing] = useState<boolean>(false); 

    // Handle setting custom RPC
    const handleSetCustomRpc = () => {
        if (customRpcUrl) {
            setRpc(selectedNetwork, customRpcUrl); 
            setIsCustomRpc(true);
            setIsEditing(!isEditing);
        } else {
            setRpc(selectedNetwork); 
            setIsCustomRpc(false);
            setIsEditing(!isEditing);
        }
    };

    const handleRemoveCustomRpc = () => {
        setCustomRpcUrlState(""); // Clear the custom RPC URL
        setIsCustomRpc(false);
        setRpc(selectedNetwork); // Switch back to default RPC
    };

    // Effect to set RPC on network change
    useEffect(() => {
        handleSetCustomRpc();
    }, [handleSetCustomRpc, selectedNetwork]);

    const handleEditToggle = () => {
        setIsEditing(!isEditing);
    };

    return (
        <Box
            width="64px"
            height="64px"
            style={{
                position: "absolute",
                right: 20,
                top: 60,
            }}
        >
            <Flex direction={"row"}>
                <Box>
                    <DropdownMenu.Root>
                        <DropdownMenu.Trigger asChild>
                            <button>
                                Select Network: {Network[selectedNetwork]}
                            </button>
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
                        onChange={(e) => setCustomRpcUrlState(e.target.value)}
                        disabled={!isEditing} // Disable input if custom RPC is connected
                    />
                    <button onClick={handleRemoveCustomRpc}><svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M5.5 1C5.22386 1 5 1.22386 5 1.5C5 1.77614 5.22386 2 5.5 2H9.5C9.77614 2 10 1.77614 10 1.5C10 1.22386 9.77614 1 9.5 1H5.5ZM3 3.5C3 3.22386 3.22386 3 3.5 3H5H10H11.5C11.7761 3 12 3.22386 12 3.5C12 3.77614 11.7761 4 11.5 4H11V12C11 12.5523 10.5523 13 10 13H5C4.44772 13 4 12.5523 4 12V4L3.5 4C3.22386 4 3 3.77614 3 3.5ZM5 4H10V12H5V4Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path></svg></button> {/* Remove button */}
                </Box>

                <Box>
                    <div>
                        {isCustomRpc ? (
                            <>
                                <button onClick={handleSetCustomRpc}>Using Custom Rpc to {networkName}</button>
                                {!isEditing && <button onClick={handleEditToggle}>Edit</button>} {/* Edit button */}
                            </>
                        ) : (
                            <button onClick={handleSetCustomRpc}>Connect to Own Rpc</button>
                        )}
                    </div>
                </Box>
            </Flex>
        </Box>
    );
};

export default RpcComponent;
