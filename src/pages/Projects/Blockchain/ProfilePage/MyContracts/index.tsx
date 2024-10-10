/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect } from 'react';
import { VerificationProps } from '../../../../../interfaces/CompInterfaces';
import { Box, Container, Text } from '@radix-ui/themes';
import CustomHeading from '../../../../../Components/Typogrpahy/Text/Heading';
import Grid from "../../../../../Components/Grid";
import { useDispatch, useSelector } from 'react-redux';
import { selectMyContracts } from '../../../../../redux/slices/BackendSlices/Blockchain/MyContractSlice';
import { AppDispatch } from '../../../../../redux/store';
import { getMyContracts } from '../../../../../redux/slices/BackendSlices/Blockchain/ContractApiSlice';
import ContractInfoCard from '../../../../../Components/Cards/ContractCard/ContractInfoCard';
import { useNavigate } from 'react-router-dom';
import { useWalletAuth } from '../../../../../contexts/WalletAuthContext';
import { ContractType, PROJECTS } from '../../../../../DataTypes/enums';

const MyContracts: React.FC<VerificationProps> = (props) => {

  const myContracts = useSelector(selectMyContracts)
  const dispatch = useDispatch()
  const navigate = useNavigate();
  const { walletAddress } =useWalletAuth()

  useEffect(() => {
    (dispatch as AppDispatch)(getMyContracts(walletAddress));
  }, [dispatch]);

  const navigateUser = (contract: { contractName: string, deployedAddress: string }) => {
    // Replace :contractName in the path with the actual contract name
    const path = PROJECTS.DEPLOYED_CONTRACT
      .replace(':contractName', contract.contractName)
      .replace(':deployedAddress', contract.deployedAddress); // Include deployedAddress in the URL

    navigate(path);
  };
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
      <CustomHeading placeholder={props.pageTitle} />
      <Grid columns="3" gap="3" width="auto" rows="repeat(3, 164px)">
        {myContracts && myContracts.length > 0 ? (
          myContracts.map((contract: any, index: any) => (
            <Box
              key={index}
              style={{
                border: "1px solid #ddd",
                borderRadius: "8px",
                padding: "16px",
              }}
            >
              <ContractInfoCard contractType={ContractType.Deploy} buttonText="Inspect" handleButtonClick={() => navigateUser(contract)} contractInfo={contract} cardType={"multiple"} />
            </Box>
          ))
        ) : (
          <Text>No contracts available.</Text>
        )}
      </Grid>
    </Container>
  );
};

export default MyContracts;
