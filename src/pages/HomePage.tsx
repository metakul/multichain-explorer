// src/App.tsx
import React, { useState } from 'react';
import { ethers } from 'ethers';
import SimpleStorage from '../contracts/SimpleStorage.json';
import Contract1 from '../contracts/Contract1.json';
import { Container } from '@radix-ui/themes';
import ContractSelector from '../Components/ContractSelector/ContractSelector';
import ValueInput from '../Components/ContractSelector/InputValue';
import { Eip1193Provider } from 'ethers';

// interface Contract {
//   name: string;
//   contractAddress: string;
//   // eslint-disable-next-line @typescript-eslint/no-explicit-any
//   abi: any; // You can define a more specific type for ABI if you have it
// }

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const contracts: any[] = [
  { name: 'Simple Storage', ...SimpleStorage },
  { name: 'Contract 1', ...Contract1 },
];

const HomePage: React.FC = () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [selectedContract, setSelectedContract] = useState<any>(contracts[0]);
  const [value, setValue] = useState<number>(0);
  const [inputValue, setInputValue] = useState<string>('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (typeof window.ethereum !== 'undefined') {
      const provider = new ethers.BrowserProvider(window.ethereum as Eip1193Provider);
      const signer = await provider.getSigner();
      const contract = new ethers.Contract(selectedContract.contractAddress, selectedContract.abi, signer);
      await contract.set(inputValue);
      setValue(Number(inputValue)); // Ensure the value is a number
      setInputValue('');
    }
  };

  return (
    <Container style={{
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
      textAlign: 'center'
    }}>
      <h1>Dynamic Contract Interaction</h1>
      
      <ContractSelector
        contracts={contracts}
        selectedContract={selectedContract}
        setSelectedContract={setSelectedContract}
      />
      <ValueInput
        value={value}
        inputValue={inputValue}
        handleInputChange={handleInputChange}
        handleSubmit={handleSubmit}
      />
    </Container>
  );
};

export default HomePage;
