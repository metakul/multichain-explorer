/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect } from 'react';
import { VerificationProps } from '../../../../../interfaces/CompInterfaces';
import CustomHeading from '../../../../../Components/UI/Typogrpahy/Text/Heading';
import Grid from '../../../../../Components/UI/Grid';
import { useDispatch, useSelector } from 'react-redux';
import { selectContractsLoading, selectMyContracts } from '../../../../../redux/slices/BackendSlices/Blockchain/MyContractSlice';
import { AppDispatch } from '../../../../../redux/store';
import { getMyContracts } from '../../../../../redux/slices/BackendSlices/Blockchain/ContractApiSlice';
import ContractInfoCard from '../../../../../Components/Cards/ContractCard/ContractInfoCard';
import { useNavigate } from 'react-router-dom';
import { ContractType, PROJECTS } from '../../../../../DataTypes/enums';
import { useRpc } from '../../../../../contexts/RpcProviderContext';
import Container from '../../../../../Components/UI/Container';
import Box from '../../../../../Components/UI/Box';
import Text from '../../../../../Components/UI/Text';

const MyContracts: React.FC<VerificationProps> = (props) => {

  const myContracts = useSelector(selectMyContracts)
  const myContractsLoading = useSelector(selectContractsLoading)
  const dispatch = useDispatch()
  const navigate = useNavigate();
  const { walletAddress, rpcUrl, networkName } = useRpc()

  useEffect(() => {
    walletAddress && (dispatch as AppDispatch)(getMyContracts(walletAddress));
  }, [dispatch, rpcUrl, walletAddress]);

  const navigateUser = (contract: { contractName: string, deployedAddress: string }) => {
    // Replace :contractName in the path with the actual contract name
    const path = PROJECTS.DEPLOYED_CONTRACT
      .replace(':contractName', contract.contractName)
      .replace(':deployedAddress', contract.deployedAddress); // Include deployedAddress in the URL

    navigate(`${path}/${networkName}`);
  };
  return (
    <Container style={{
    }}>
      <CustomHeading placeholder={props.pageTitle} />
      <Grid
        container
        spacing={3}  // Spacing between items (MUI uses a spacing scale)
        sx={{
          gridTemplateColumns: 'repeat(3, 1fr)',  // Custom columns (3 columns)
          gridTemplateRows: 'repeat(3, 164px)',  // Custom rows (3 rows, each 164px)
          width: 'auto',  // Auto width
          gap: '16px',  // Custom gap between items
        }}
      >
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
              <ContractInfoCard contractType={ContractType.Deploy} buttonText="Inspect" handleButtonClick={() => navigateUser(contract)} contractInfo={contract} cardType={"multiple"} isLoading={myContractsLoading} />
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
