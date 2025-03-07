/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchContractByName, saveNewContract } from "../../../../redux/slices/BackendSlices/Blockchain/ContractApiSlice";
import { selectContractDetails } from "../../../../redux/slices/BackendSlices/Blockchain/ContractSlice";
import { AppDispatch } from "../../../../redux/store";
import ContractInfoCard from "../../../../Components/Cards/ContractCard/ContractInfoCard";
import { SingleContractProps } from "../../../../interfaces/CompInterfaces";
import { ContractType } from "../../../../DataTypes/enums";
import { useRpc } from "../../../../contexts/RpcProviderContext";
import Text from "../../../../Components/UI/Text";
import Box from "../../../../Components/UI/Box";
import MobileTabNavigation from "../../../../Components/UI/Tabs/MobileTabNavigation";
import ContractDescription from "../../../../Components/Contracts/ContractInformation/ContractDescription";
import ContractFunctions from "../../../../Components/Contracts/ContractInformation/ContractFunctions";
import { useMediaQuery } from "@mui/material";
import { getAddressTransactions } from "../../../../redux/slices/BackendSlices/Explorer/Address/AddressInfoApi";
import { useContractExecutor } from "../../../../contexts/ContractExecutor";

const SingleContractPage: React.FC<SingleContractProps> = () => {
  const { contractName, deployedAddress } = useParams<{ deployedAddress: string, contractName?: string }>();
  const dispatch = useDispatch<AppDispatch>();
  const contract = useSelector(selectContractDetails);
  const { executeContract }  = useContractExecutor();
  // const contractLoading = useSelector(selectSingleContractLoading);

  // const contractError = useSelector(selectSingleContractError);
  const isNonMobile = useMediaQuery("(min-width: 766px)");

  const { walletAddress,networkName,rpcUrl } = useRpc();

  // Fetch the single contract when the component mounts
  useEffect(() => {
    if (contractName) {
      dispatch(fetchContractByName(contractName));
      deployedAddress && dispatch(getAddressTransactions({ networkName,rpcUrl,address:deployedAddress }));
    }
  }, [contractName, dispatch]);

  // const renderSolidityCode = (abi: any[]) => {
  //   if (!abi) return "No ABI available.";
  
  //   return abi
  //     .filter((item) => item.type === "function")
  //     .map(
  //       (fn) =>
  //         `function ${fn.name}(${fn.inputs.map((i: { type: any; name: any; }) => `${i.type} ${i.name}`).join(", ")}) external ${fn.stateMutability !== "nonpayable" ? fn.stateMutability : ""};`
  //     )
  //     .join("\n");
  // };
  
  // Handle loading or error cases
  if (!contract) {
    return <Text>Loading contract data...</Text>;
  }

  // Function to deploy contract
  const deployMyContract = async (constructorParams: any[]) => {
    try {
      if (!window.ethereum) throw new Error("No Ethereum wallet detected");
      await executeContract({
        operation: "deploy",
        abi: contract.abi,
        bytecode: contract.bytecode,
        inputs: constructorParams,
    }).then((res) => {
          console.log("Deployed contract:", res);
          
           dispatch(saveNewContract({ contractName, deployedAddress:res.address, walletAddress, networkName }));

         })
    
    } catch (error) {
      console.error("Deployment error:", error);
    }
  };



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
        "Functions"
      ),
      content: contractName && <>
      <ContractFunctions abi={contract.abi} deployedAddress={deployedAddress} />
        {!deployedAddress && 
          <ContractInfoCard
              contractType={ContractType.Deploy}
              contractInfo={contract}
              cardType="single"
              buttonText={ContractType.Deploy}
              handleButtonClick={deployMyContract} // Pass deploy function
            />
        }
      </> 

      ,
      label: "OverView",
    },
    // {
    //   value: "Interface",
    //   content: (
    //     <Box sx={{
    //       maxWidth:"80vw"
    //     }}>
    //       <Text style={{ whiteSpace: "pre-wrap", fontFamily: "monospace" }}>
    //         {renderSolidityCode(contract.abi)}
    //       </Text>
    //     </Box>
    //   ),
    //   label: "Interface",
    // },
    // {
    //   value: "Transactions",
    //   content: (
    //     <Box
    //     sx={{
    //       maxWidth:"80vw"
    //     }}>
    //       <Text style={{ whiteSpace: "pre-wrap", fontFamily: "monospace" }}>
    //         {renderSolidityCode(contract.abi)}
    //       </Text>
    //     </Box>
    //   ),
    //   label: "Interface",
    // },
  ];
  
  return (
    <Box>
      <h4>{contractName}</h4>
      <MobileTabNavigation tabs={tabs} orientation={isNonMobile ? "vertical" : "horizontal"} />
    </Box>
  );
};

export default SingleContractPage;
