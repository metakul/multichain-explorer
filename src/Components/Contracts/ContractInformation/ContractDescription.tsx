import React, { useEffect, useState } from "react";
import contractDescriptions from "../../../Data/ContractInformation.json"
import Box from "../../UI/Box";
import Text from "../../UI/Text";
import Button from "../../UI/Button";

interface ContractDescriptionProps {
  contractName: string;
  deployedAddress?: string;
}

const descriptions: Record<string, string> = contractDescriptions;


const ContractDescription: React.FC<ContractDescriptionProps> = ({ contractName, deployedAddress }) => {
  const [description, setDescription] = useState<string | null>(null);

  useEffect(() => {
    setDescription(descriptions[contractName]);
  }, [contractName]);
  
  const viewOnExplorer = async () => {
    console.log("Opening Explorer for contract", deployedAddress);
  }
  return (
    <Box sx={{
      py: 2,
      maxWidth:"80vw"
    }}>
      {deployedAddress && <Text>
        Contract Address: {deployedAddress}
      </Text>
      }
                         {deployedAddress &&   <Button onClick={viewOnExplorer}>View On Explorer</Button> }
        <Text>

            {description}
        </Text>
    </Box>

  )
};

export default ContractDescription;
