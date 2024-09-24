// src/components/ContractSelector.tsx
import React from 'react';

interface Contract {
    name: string;
    contractAddress: string;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    abi: any; // Define a more specific type for ABI if available
}

interface ContractSelectorProps {
    contracts: Contract[];
    selectedContract: Contract;
    setSelectedContract: (contract: Contract) => void;
}

const ContractSelector: React.FC<ContractSelectorProps> = ({ contracts, setSelectedContract }) => {
    return (
        <label>
            Select Contract:
            <select onChange={(e) => setSelectedContract(contracts[parseInt(e.target.value)])}>
                {contracts.map((contract, index) => (
                    <option key={index} value={index}>
                        {contract.name}
                    </option>
                ))}
            </select>
        </label>
    );
};

export default ContractSelector;
