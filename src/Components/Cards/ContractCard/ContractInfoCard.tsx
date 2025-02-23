/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
import { ContractData, DeployedContract } from "../../../interfaces/interface";
import ConnectWalletButton from "../../Buttons/ConnectWalletButton";
import ConstructorInputForm from "./ConstructorInfo";
import { ContractType } from "../../../DataTypes/enums";
import { useRpc } from "../../../contexts/RpcProviderContext";
import ContractDescription from "../../Contracts/ContractInformation";

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
    const { contractName, constructor} = contractInfo;
    const { connected } = useRpc();

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


    return (
        <div>
            <h4>{contractName}</h4>
            {cardType === "single" && contractType === ContractType.Deploy && (
                <>
                <ContractDescription contractName={contractName}/>
                <ConstructorInputForm
                    constructorParams={constructor || []}
                    constructorInputs={constructorInputs}
                    handleInputChange={handleInputChange}
                    inputErrors={inputErrors}
                    />
                    </>
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
