/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
import Skeleton from "@mui/material/Skeleton"; // Import MUI Skeleton
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
    isLoading: boolean;
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
    isLoading,
    handleButtonClick,
}) => {
    const { contractName, constructor } = contractInfo;
    const { connected, networkName, connectToRpc, rpcUrl } = useRpc();

    const [constructorInputs, setConstructorInputs] = useState<string[]>([]);
    const [inputErrors, setInputErrors] = useState<string[]>([]);

    useEffect(() => {
        if (isContractData(contractInfo) && Array.isArray(contractInfo?.constructor)) {
            setConstructorInputs(contractInfo.constructor.map(() => ""));
            setInputErrors([]);
        }
    }, [contractInfo]);

    const handleInputChange = (index: number, value: string) => {
        const updatedInputs = [...constructorInputs];
        updatedInputs[index] = value;
        setConstructorInputs(updatedInputs);

        if (inputErrors[index]) {
            setInputErrors((prevErrors) => {
                const updatedErrors = [...prevErrors];
                updatedErrors[index] = "";
                return updatedErrors;
            });
        }
    };

    const handleClick = () => {
        const errors = Array(constructorInputs.length).fill("");
        if (rpcUrl) {
            connectToRpc(networkName);
        }

        constructorInputs.forEach((input, index) => {
            if (input.trim() === "") {
                errors[index] = `The ${constructor[index].name} field cannot be empty.`;
            }
        });

        if (errors.some((error) => error !== "")) {
            setInputErrors(errors);
            return;
        }

        handleButtonClick(constructorInputs);
    };

    return (
        <div>
            {isLoading ? (
                <>
                    <Skeleton variant="text" width={200} height={30} />
                    <Skeleton variant="rectangular" width="100%" height={150} />
                    {cardType === "single" && contractType === ContractType.Deploy && (
                        <Skeleton variant="rectangular" width="100%" height={50} />
                    )}
                    <Skeleton variant="rectangular" width={120} height={40} />
                </>
            ) : (
                <>
                    <h4>{contractName}</h4>
                    {cardType === "single" && contractType === ContractType.Deploy && (
                        <>
                            <ContractDescription contractName={contractName} />
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
                    ) : (
                        <>
                            <button onClick={handleButtonClick}>{buttonText}</button>
                        </>
                    )}

                    {cardType === "single" && contractType === ContractType.Interact && <>Ready To Interact with</>}
                </>
            )}
        </div>
    );
};

export default ContractInfoCard;
