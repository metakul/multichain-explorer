/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
import { ContractData, DeployedContract } from "../../../interfaces/interface";
import ConnectWalletButton from "../../Buttons/ConnectWalletButton";
import ConstructorInputForm from "./ConstructorInfo";
import { ContractType } from "../../../DataTypes/enums";
import { useRpc } from "../../../contexts/RpcProviderContext";
// import ContractDescription from "../../Contracts/ContractInformation/ContractDescription";
import Button from "../../UI/Button";

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
        
             <h4>{contractName}</h4>
                    {cardType === "single" && contractType === ContractType.Deploy && (
                        <>
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
                            <Button onClick={handleClick}>{buttonText}</Button>
                        ) : (
                            <ConnectWalletButton />
                        )
                    ) : (
                        <>
                            <Button onClick={handleButtonClick}>{buttonText}</Button>
                        </>
                    )}

                    {cardType === "single" && contractType === ContractType.Interact && <>Ready To Interact with</>}
        </div>
    );
};

export default ContractInfoCard;
