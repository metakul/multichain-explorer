// src/App.tsx
import React from 'react';
import ContractsGrid from './AllContracts';
import Container from '../../../../Components/UI/Container';

const ContractHomePage: React.FC = () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return (
    <Container>
      <h1>Dynamic Contract Interaction</h1>
      <ContractsGrid />
    </Container>
  );
};

export default ContractHomePage;
