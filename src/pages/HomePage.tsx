/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from 'react';
import { ethers } from 'ethers';
import { Container } from '@radix-ui/themes';
import ContractSelector from '../Components/ContractSelector/ContractSelector';
import { Eip1193Provider } from 'ethers';
import GetContractsRequest from '../Backend/fakeBackend/FakeContracts';
import { ContractFactory } from 'ethers';

const HomePage: React.FC = () => {
  const [contracts, setContracts] = useState<any[]>([]);
  const [selectedContract, setSelectedContract] = useState<any>(null);

  useEffect(() => {
    const loadContracts = async () => {
      try {
        const options = {
          url: '/contracts',
          method: 'GET',
        };
        const contractData = await GetContractsRequest(options);
        setContracts(contractData);
        setSelectedContract(contractData[0]); // Select the first contract by default
      } catch (error) {
        console.error('Error loading contracts:', error);
      }
    };

    loadContracts();
  }, []);

  const deployContract = async () => {
    if (!selectedContract) {
      console.error('No contract selected.');
      return;
    }

    if (!selectedContract.abi || !selectedContract.bytecode) {
      console.error('Invalid contract data. Ensure ABI and bytecode are set.');
      return;
    }

    if (typeof window.ethereum !== 'undefined') {
      try {
        const provider = new ethers.BrowserProvider(window.ethereum as Eip1193Provider);
        const signer = await provider.getSigner();

        // Create a ContractFactory
        const factory = new ContractFactory(selectedContract.abi, selectedContract.bytecode, signer);

        // Deploy the contract
        const contract = await factory.deploy(); // Pass constructor arguments if required

        console.log('Contract deployed at:', contract);
      } catch (error) {
        console.error('Contract deployment failed:', error);
      }
    } else {
      console.error('Ethereum provider not available.');
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
      <h1>Dynamic Contract Deployment</h1>

      {contracts.length > 0 && (
        <>
          <ContractSelector
            contracts={contracts}
            selectedContract={selectedContract}
            setSelectedContract={setSelectedContract}
          />
          <button onClick={deployContract}>Deploy Contract</button>
        </>
      )}
    </Container>
  );
};

export default HomePage;
