import React, { useEffect, useState } from "react";
import contractDescriptions from "../../../Data/ContractInformation.json"
import Box from "../../UI/Box";
import Text from "../../UI/Text";

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

  return (
    <Box sx={{
      py: 2,
      maxWidth:"80vw"
    }}>
      {deployedAddress && <Text>
        Contract Address: {deployedAddress}
      </Text>
      }
      {description}
    </Box>

  )
};

export default ContractDescription;
