/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchContractByName, saveNewContract } from "../../../../redux/slices/BackendSlices/Blockchain/ContractApiSlice";
import { selectContractDetails, selectSingleContractLoading } from "../../../../redux/slices/BackendSlices/Blockchain/ContractSlice";
import { AppDispatch } from "../../../../redux/store";
import ContractInfoCard from "../../../../Components/Cards/ContractCard/ContractInfoCard";
import { ethers } from "ethers";
import { SingleContractProps } from "../../../../interfaces/CompInterfaces";
import { ContractType } from "../../../../DataTypes/enums";
import ContractFunctionsForm from "../../../../Components/Contracts/InteractWithContract";
import { useRpc } from "../../../../contexts/RpcProviderContext";
import Text from "../../../../Components/UI/Text";
import Box from "../../../../Components/UI/Box";
import MobileTabNavigation2 from ".";
import ContractDescription from "../../../../Components/Contracts/ContractInformation";

const SingleContractPage: React.FC<SingleContractProps> = (props) => {
  const { contractName, deployedAddress } = useParams<{ contractName: string, deployedAddress?: string }>();
  const dispatch = useDispatch<AppDispatch>();
  const contract = useSelector(selectContractDetails);
  const contractLoading = useSelector(selectSingleContractLoading);
  // const contractError = useSelector(selectSingleContractError);

  const { walletAddress, connected } = useRpc();

  // Fetch the single contract when the component mounts
  useEffect(() => {
    if (contractName) {
      dispatch(fetchContractByName(contractName));
    }
  }, [contractName, dispatch]);

  // Handle loading or error cases
  if (!contract) {
    return <Text>Loading contract data...</Text>;
  }

  // Function to deploy contract
  const deployContract = async (constructorParams: any[]) => {
    try {
      if (!window.ethereum) throw new Error("No Ethereum wallet detected");

      // Request wallet connection
      if (window && window.ethereum && window.ethereum.request) {

        await window?.ethereum.request({ method: "eth_requestAccounts" });
        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();

        // Prepare contract for deployment
        const factory = new ethers.ContractFactory(contract.abi, contract.bytecode as any, signer);

        // Deploy the contract
        const deployedContract = await factory.deploy(...constructorParams);

        // Wait for the deployment to finish and get the address
        await deployedContract.getAddress().then((deployedAddress) => {
          // Dispatch the action with the resolved contract address
          dispatch(saveNewContract({ contractName, deployedAddress, walletAddress }));
        })
      }
    } catch (error) {
      console.error("Deployment error:", error);
    }
  };

  const viewOnExplorer = async () => {
    console.log("Opening Explorer for contract", deployedAddress);
  }

  const tabs = [
    {
      value: (
        "OverView"
      ),
      content: contractName && <ContractDescription contractName={contractName} deployedAddress={deployedAddress} />
      ,
      label: "OverView",
    },
    {
      value: (
        props.contractType == ContractType.Deploy ? "Deploy" : "Explorer"
      ),
      content: <>
        {props.contractType == ContractType.Deploy ? (
          <ContractInfoCard
            contractType={ContractType.Deploy}
            contractInfo={contract}
            cardType="single"
            buttonText={ContractType.Deploy}
            isLoading={contractLoading}
            handleButtonClick={deployContract} // Pass deploy function
          />
        ) : (
          <>
            <ContractInfoCard
              contractType={ContractType.Interact}
              contractInfo={contract}
              cardType="single"
              buttonText="View On Explorer"
              isLoading={contractLoading}
              handleButtonClick={viewOnExplorer} // Pass deploy function
            />
            <ContractFunctionsForm abi={contract.abi} deployedAddress={deployedAddress as string} />
          </>
        )},
      </>,
      label: "Explorer",
    },
  ];
  
  return (
    <Box>
      <h4>{contractName}</h4>
      <MobileTabNavigation2 tabs={tabs} />
    </Box>
  );
};

export default SingleContractPage;
