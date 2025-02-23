import React, { useEffect, useState } from "react";
import contractDescriptions from "../../Data/ContractInformation.json"
import Box from "../UI/Box";

interface ContractDescriptionProps {
  contractName: string;
}

const descriptions: Record<string, string> = contractDescriptions;


const ContractDescription: React.FC<ContractDescriptionProps> = ({ contractName }) => {
  const [description, setDescription] = useState<string | null>(null);

  useEffect(() => {
    setDescription(descriptions[contractName] || "No description available.");
  }, [contractName]);

  return (
    <Box sx={{
      py: 2
    }}>
      {description}
    </Box>

  )
};

export default ContractDescription;
