/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect } from "react";
import { ethers } from "ethers";
import CustomForm, { CustomFormField, CustomFormSubmit } from "../UI/Form";
interface ContractFunctionProps {
    deployedAddress: string;
    abi: any;
}

const ContractFunctionsForm: React.FC<ContractFunctionProps> = ({ deployedAddress, abi }) => {
    const [contract, setContract] = useState<ethers.Contract | null>(null);
    const [functionInputs, setFunctionInputs] = useState<{ [key: string]: any }>({});
    const [loading, setLoading] = useState<boolean>(false);


    useEffect(() => {
        const initializeContract = async () => {
            const provider = new ethers.BrowserProvider(window.ethereum);
            const signer = await provider.getSigner();
            const contractInstance = new ethers.Contract(deployedAddress, abi, signer);
            setContract(contractInstance);
        };

        initializeContract();
    }, [deployedAddress, abi]);

    const handleInputChange = (functionName: string, inputIndex: number, value: any) => {
        setFunctionInputs((prevState) => ({
            ...prevState,
            [functionName]: {
                ...prevState[functionName],
                [inputIndex]: value,
            },
        }));
    };

    const handleFunctionSubmit = async (functionName: string, inputs: any[]) => {
        if (!contract) return;

        setLoading(true);
        try {
            const args = inputs.map((_: any, idx: number) => functionInputs[functionName]?.[idx]);
            const response = await contract[functionName](...args);
            console.log("Function Response:", response);
        } catch (error) {
            console.error("Error executing function:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            {abi
                .filter((item: any) => item.type === "function")
                .map((func: any) => (
                    <div key={func.name}>
                        <h3>{func.name}</h3>
                        <CustomForm
                            onSubmit={(e) => {
                                e.preventDefault();
                                handleFunctionSubmit(func.name, func.inputs);
                            }}
                        >
                            {func.inputs.map((input: any, index: number) => (
                                <CustomFormField
                                    name="personal-form"
                                    key={`${func.name}-${index}`}
                                    label={`${input.name} (${input.type})`}
                                    type="text"
                                    onChange={(e) => handleInputChange(func.name, index, e.target.value)}
                                />
                            ))}
                            <CustomFormSubmit disabled={loading}>
                                <button type="submit" disabled={loading}>
                                    {loading ? "Loading..." : `Execute ${func.name}`}
                                </button>
                            </CustomFormSubmit>
                        </CustomForm>
                    </div>
                ))}
        </div>
    );
};

export default ContractFunctionsForm;
