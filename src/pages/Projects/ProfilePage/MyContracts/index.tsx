import React, { useEffect } from 'react';
import { VerificationProps } from '../../../../interfaces/CompInterfaces';
import CustomHeading from '../../../../Components/UI/Typogrpahy/Text/Heading';
import Grid from '../../../../Components/UI/Grid';
import { useDispatch, useSelector } from 'react-redux';
import { selectMyContracts } from '../../../../redux/slices/BackendSlices/Blockchain/MyContractSlice';
import { AppDispatch } from '../../../../redux/store';
import { getMyContracts } from '../../../../redux/slices/BackendSlices/Blockchain/ContractApiSlice';
import ContractInfoCard from '../../../../Components/Cards/ContractCard/ContractInfoCard';
import { useNavigate } from 'react-router-dom';
import { ContractType, PROJECTS } from '../../../../DataTypes/enums';
import { useRpc } from '../../../../contexts/RpcProviderContext';
import Container from '../../../../Components/UI/Container';
import Box from '../../../../Components/UI/Box';
import Text from '../../../../Components/UI/Text';

const MyContracts: React.FC<VerificationProps> = (props) => {
  const myContracts = useSelector(selectMyContracts);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { walletAddress, rpcUrl, networkName } = useRpc();

  useEffect(() => {
    if (walletAddress) {
      dispatch(getMyContracts({ walletAddress, networkName }));
    }
  }, [dispatch, rpcUrl, walletAddress, networkName]);

  const navigateUser = (contract: { contractName: string, deployedAddress: string }) => {
    const path = PROJECTS.DEPLOYED_CONTRACT
      .replace(':contractName', contract.contractName)
      .replace(':deployedAddress', contract.deployedAddress); // Include deployedAddress in the URL

    navigate(`${path}/${networkName}`);
  };

  // Filter contracts based on the networkName
  const filteredContracts = myContracts.filter(
    (contract: any) => contract.networkName === networkName
  );

  return (
    <Container>
      <CustomHeading placeholder={props.pageTitle} />
      <Grid
        container
        spacing={3}
        sx={{
          gridTemplateColumns: 'repeat(3, 1fr)', 
          gridTemplateRows: 'repeat(3, 164px)',
          width: 'auto',
          gap: '16px',
        }}
      >
        {filteredContracts && filteredContracts.length > 0 ? (
          filteredContracts.map((contract: any, index: any) => (
            <Box
              key={index}
              style={{
                border: "1px solid #ddd",
                borderRadius: "8px",
                padding: "16px",
              }}
            >
              {contract && contract.contractName && (
                <ContractInfoCard
                  contractType={ContractType.Deploy}
                  buttonText="Inspect"
                  handleButtonClick={() => navigateUser(contract)}
                  contractInfo={contract}
                  cardType={"multiple"}
                />
              )}
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
