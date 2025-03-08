// src/App.tsx
import React from 'react';
import ContractsGrid from './AllContracts';
import Container from '../../../../Components/UI/Container';

const ContractHomePage: React.FC = () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return (
    <Container>
      <h1>Our Contracts (Pre-built Contracts)</h1>
      <p>
        Pre-built contracts are proxy contracts created by the thirdweb team to cover most common use cases and patterns for smart contracts. Contracts cover various use cases across NFTs, airdrops, staking, marketplaces, memberships, and more. All pre-built contracts are available to deploy here.
      </p>
      <ContractsGrid />
    </Container>
  );
};

export default ContractHomePage;
