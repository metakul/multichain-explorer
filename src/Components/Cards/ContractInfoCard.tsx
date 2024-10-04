import React from "react";
import * as AlertDialog from "@radix-ui/react-alert-dialog";
import { Box } from "@radix-ui/themes";
import { ContractData } from "../../interfaces/interface";
import { useWalletAuth } from "../../contexts/WalletAuthContext";
import ConnectWalletButton from "../Buttons/ConnectWalletButton";



// Props for the component
interface ContractInfoProps {
    contractInfo: ContractData;
    cardType: "multiple" | "single";
    buttonText: string;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    handleButtonClick: any
}

const ContractInfoCard: React.FC<ContractInfoProps> = ({ contractInfo, cardType, buttonText, handleButtonClick }) => {
    const { contractName, abi, bytecode, constructor, loading, error } = contractInfo;
    const { connected } = useWalletAuth()
    // While data is being fetched
    if (loading) {
        return (
            <Box >
                Loading Contract
            </Box>
        );
    }

    // If there is an error fetching data
    if (error) {
        return (
            <AlertDialog.Root>
                <AlertDialog.Trigger />
                <AlertDialog.Portal>
                    <AlertDialog.Overlay className="bg-black/30 fixed inset-0" />
                    <AlertDialog.Content className="bg-white p-4 rounded-lg shadow-lg fixed top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 w-[90vw] max-w-lg focus:outline-none">
                        <AlertDialog.Title className="font-bold text-lg">Error</AlertDialog.Title>
                        <AlertDialog.Description className="mt-2 text-red-600">{error}</AlertDialog.Description>
                        <AlertDialog.Action className="mt-4">
                            <button className="bg-blue-500 text-white px-4 py-2 rounded-lg">OK</button>
                        </AlertDialog.Action>
                    </AlertDialog.Content>
                </AlertDialog.Portal>
            </AlertDialog.Root>
        );
    }

    // Render contract info
    return (
        <div className="p-4">
            <div className="bg-gray-100 p-6 rounded-lg shadow-lg">

                <div className="mb-4">
                    <h4 className="font-semibold">{contractName}</h4> <br />
                </div>

                {/* Display constructor */}
                {cardType == "single" && (
                    <div className="mt-4">
                        <span className="font-semibold">Constructor:</span>
                        {constructor && constructor.length > 0 ? (
                            <ul className="list-disc pl-5">
                                {constructor.map((param, index) => (
                                    <li key={index} className="text-sm">
                                        Param {index + 1}: {JSON.stringify(param)}
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p className="text-gray-600 text-sm">No constructor parameters available.</p>
                        )}
                    </div>

                )}


                {/* Button to be shown based on the condition */}
                {buttonText && cardType == "single" ? (
                    <button
                        onClick={() => handleButtonClick()} // Use the prop function
                        className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-lg"
                    >
                        {connected ? buttonText : <ConnectWalletButton /> }
                    </button>
                ) : (
                    <button
                        onClick={() => handleButtonClick()} // Use the prop function
                        className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-lg"
                    >
                        {buttonText}
                    </button>
                )}

                {connected}

            </div>
        </div>
    );
};

export default ContractInfoCard;
