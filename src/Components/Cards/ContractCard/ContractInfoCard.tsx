import React, { useEffect, useState } from "react";
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
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
    const [constructorInputs, setConstructorInputs] = useState<string[]>([]);
    const [inputErrors, setInputErrors] = useState<string[]>([]); // State for input errors



    // Effect to set constructor inputs based on the constructor array
    useEffect(() => {
        // Update the constructor inputs when the constructor changes
        setConstructorInputs(constructor.map(() => ""));
        setInputErrors(Array(constructor.length).fill("")); // Reset input errors based on new constructor length
    }, [constructor]); // Dependency array to re-run the effect when constructor changes


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

        console.log("init error", errors);

        // Validate inputs
        constructorInputs.forEach((input, index) => {
            if (input.trim() === "") {
                errors[index] = `The ${constructor[index].name} field cannot be empty.`;
            }
        });

        console.log(errors);

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
            <div>
                <h4>{contractName}</h4>
                <br />
            </div>

            {cardType === "single" && (
                <ConstructorInputForm
                    constructorParams={constructor || []}
                    constructorInputs={constructorInputs}
                    handleInputChange={handleInputChange}
                    inputErrors={inputErrors} // Pass errors to the child component
                />
            )}

            {/* Button */}
            {buttonText && cardType === "single" ? (
                <>
                    {!connected ? <ConnectWalletButton /> : <button onClick={handleClick}>  {buttonText} </button>}
                </>
            ) : (
                <button onClick={handleButtonClick}>
                    {buttonText}
                </button>
            )}
        </div>
    );
};

export default ContractInfoCard;
