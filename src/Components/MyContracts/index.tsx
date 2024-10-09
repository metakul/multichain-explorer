/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect } from 'react';
import { VerificationProps } from '../../interfaces/CompInterfaces';
import { Box, Container, Text } from '@radix-ui/themes';
import CustomHeading from '../Typogrpahy/Text/Heading';
import Grid from "../../Components/Grid";
import { useDispatch, useSelector } from 'react-redux';
import { selectMyContracts } from '../../redux/slices/BackendSlices/Blockchain/MyContractSlice';
import { AppDispatch } from '../../redux/store';
import { getMyContracts } from '../../redux/slices/BackendSlices/Blockchain/ContractApiSlice';
import ContractInfoCard from '../Cards/ContractCard/ContractInfoCard';
import { useNavigate } from 'react-router-dom';

const MyContracts: React.FC<VerificationProps> = (props) => {

  const myContracts = useSelector(selectMyContracts)
  const dispatch = useDispatch()
  const navigate = useNavigate();

  useEffect(() => {
    (dispatch as AppDispatch)(getMyContracts());
  }, [dispatch]);

  const navigateUser = (contract: { contractName: any; }) => {
    navigate(`/profile/contract/${contract.contractName}`)
  }
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
              <ContractInfoCard buttonText="Inspect" handleButtonClick={() => navigateUser(contract)} contractInfo={contract} cardType={"multiple"} />
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
