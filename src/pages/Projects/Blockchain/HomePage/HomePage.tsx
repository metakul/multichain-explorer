// src/App.tsx
import React from 'react';
import { Container } from '@radix-ui/themes';
import ContractsGrid from './AllContracts';





const ContractHomePage: React.FC = () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return (
    <Container style={{
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      textAlign: 'center',
      marginTop: "80px",
      minHeight: "100vh",
      padding: "20px",
      width: "100%",
    }}>
      <h1>Dynamic Contract Interaction</h1>

      <ContractsGrid />
    </Container>
  );
};

export default ContractHomePage;
