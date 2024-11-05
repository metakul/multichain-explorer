/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
import * as AlertDialog from "@radix-ui/react-alert-dialog";
import { Box } from "@radix-ui/themes";
import { ContractData, DeployedContract } from "../../../interfaces/interface";
import { useWalletAuth } from "../../../contexts/WalletAuthContext";
import ConnectWalletButton from "../../Buttons/ConnectWalletButton";
import ConstructorInputForm from "./ConstructorInfo";
import { ContractType } from "../../../DataTypes/enums";

// Props for the component
interface ContractInfoProps {
    contractInfo: ContractData | DeployedContract;
    cardType: "multiple" | "single";
    contractType: ContractType;
    buttonText: string;
    handleButtonClick: (constructorParams: any) => void;
}

function isContractData(info: ContractData | DeployedContract): info is ContractData {
    return (info as ContractData).constructor !== undefined;
}
const ContractInfoCard: React.FC<ContractInfoProps> = ({
    contractInfo,
    cardType,
    contractType,
    buttonText,
    handleButtonClick,
}) => {
    const { contractName, constructor, loading, error } = contractInfo;
    const { connected } = useWalletAuth();

    // State to manage constructor inputs
    const [constructorInputs, setConstructorInputs] = useState<string[]>([]);
    const [inputErrors, setInputErrors] = useState<string[]>([]); // State for input errors

    useEffect(() => {
        if (isContractData(contractInfo) && Array.isArray(contractInfo?.constructor)) {
            setConstructorInputs(contractInfo.constructor.map(() => ""));
            setInputErrors([]);
        }
    }, [contractInfo]);

    // Handle input change
    const handleInputChange = (index: number, value: string) => {
        const updatedInputs = [...constructorInputs];
        updatedInputs[index] = value;
        setConstructorInputs(updatedInputs);

        // Clear the error for the specific input if it was previously set
        if (inputErrors[index]) {
            setInputErrors((prevErrors) => {
                const updatedErrors = [...prevErrors];
                updatedErrors[index] = "";
                return updatedErrors;
            });
        }
    };

    // Handle button click
    const handleClick = () => {
        // Initialize errors array with empty strings
        const errors = Array(constructorInputs.length).fill("");

        // Validate inputs
        constructorInputs.forEach((input, index) => {
            if (input.trim() === "") {
                errors[index] = `The ${constructor[index].name} field cannot be empty.`;
            }
        });

        // Set errors if any are found
        if (errors.some((error) => error !== "")) {
            setInputErrors(errors);
            return; // Do not proceed if there are errors
        }

        // Call the parent function if no errors
        handleButtonClick(constructorInputs);
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
                        <AlertDialog.Action>
                            <button>OK</button>
                        </AlertDialog.Action>
                    </AlertDialog.Content>
                </AlertDialog.Portal>
            </AlertDialog.Root>
        );
    }

    return (
        <div>
            <h4>{contractName}</h4>
            {cardType === "single" && contractType === ContractType.Deploy && (
                <ConstructorInputForm
                    constructorParams={constructor || []}
                    constructorInputs={constructorInputs}
                    handleInputChange={handleInputChange}
                    inputErrors={inputErrors}
                />
            )}

            {buttonText && cardType === "single" && contractType === ContractType.Deploy ? (
                connected ? (
                    <button onClick={handleClick}>{buttonText}</button>
                ) : (
                    <ConnectWalletButton />
                )
            ):(
                <>
                    <button onClick={handleButtonClick}>{buttonText}</button>
                </>
            )}

            {cardType === "single" && contractType === ContractType.Interact && <>Ready To Interact with</>}
        </div>
    );
};

export default ContractInfoCard;
