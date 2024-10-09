/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import * as AlertDialog from "@radix-ui/react-alert-dialog";
import { Box } from "@radix-ui/themes";
import { ContractData } from "../../../interfaces/interface";
import { useWalletAuth } from "../../../contexts/WalletAuthContext";
import ConnectWalletButton from "../../Buttons/ConnectWalletButton";
import ConstructorInputForm from "./ConstructorInfo";

// Props for the component
interface ContractInfoProps {
    contractInfo: ContractData;
    cardType: "multiple" | "single";
    buttonText: string;
    handleButtonClick: (constructorParams: any) => void;
}

const ContractInfoCard: React.FC<ContractInfoProps> = ({
    contractInfo,
    cardType,
    buttonText,
    handleButtonClick,
}) => {
    const { contractName, constructor, loading, error } = contractInfo;
    const { connected } = useWalletAuth();

    // State to manage constructor inputs
    const [constructorInputs, setConstructorInputs] = useState<any[]>([]);

    // Handle input change
    const handleInputChange = (index: number, value: string) => {
        const updatedInputs = [...constructorInputs];
        updatedInputs[index] = value;
        setConstructorInputs(updatedInputs);
    };

    // While data is being fetched
    if (loading) {
        return <Box>Loading Contract</Box>;
    }

    // If there is an error fetching data
    if (error) {
        return (
            <AlertDialog.Root>
                <AlertDialog.Trigger />
                <AlertDialog.Portal>
                    <AlertDialog.Overlay />
                    <AlertDialog.Content>
                        <AlertDialog.Title>Error</AlertDialog.Title>
                        <AlertDialog.Description>
                            {error}
                        </AlertDialog.Description>
                        <AlertDialog.Action >
                            <button >
                                OK
                            </button>
                        </AlertDialog.Action>
                    </AlertDialog.Content>
                </AlertDialog.Portal>
            </AlertDialog.Root>
        );
    }

    return (
        <div>
            <div >
                <h4 >{contractName}</h4> <br />
            </div>

            {cardType === "single" && (
                <ConstructorInputForm
                    constructorParams={constructor || []}
                    constructorInputs={constructorInputs}
                    handleInputChange={handleInputChange}
                />
            )}

            {/* Button */}
            {buttonText && cardType === "single" ? (
                <button
                    onClick={() => handleButtonClick(constructorInputs)} // Pass input values
                >
                    {connected ? buttonText : <ConnectWalletButton />}
                </button>
            ) : (
                <button
                    onClick={() => handleButtonClick(constructorInputs)} // Pass input values
                >
                    {buttonText}
                </button>
            )}
        </div>
    );
};

export default ContractInfoCard;
