// navigationHelpers.ts
import { useNavigate } from 'react-router-dom';
import { EXPLORER_PAGE, NetworkType, Pages, PROJECTS } from '../DataTypes/enums';

export const navigateToTransaction = (navigate: ReturnType<typeof useNavigate>, hash: string, networkName: NetworkType | "Users_Chain") => {
    navigate(`${EXPLORER_PAGE.SINGLE_TRANSACTIONS}/${hash}/${networkName}`);
};

export const navigateToBlock = (navigate: ReturnType<typeof useNavigate>, blockNumber: number, networkName: NetworkType | "Users_Chain") => {
    navigate(`${EXPLORER_PAGE.SINGLE_BLOCK}/${blockNumber}/${networkName}`);
};

export const navigateToAllBlock = (navigate: ReturnType<typeof useNavigate>, networkName: NetworkType | "Users_Chain") => {
    navigate(`${Pages.BLOCKS}/${networkName}`);
};

export const navigateToAddress = (navigate: ReturnType<typeof useNavigate>, address: string, networkName: NetworkType |  "Users_Chain") => {
    navigate(`${EXPLORER_PAGE.SINGLE_ADDRESS}/${address}/${networkName}`);
};
export const navigateToContract = (navigate: ReturnType<typeof useNavigate>,contractName:string, contractAddress: string, networkName: NetworkType |  "Users_Chain") => {
      const path = PROJECTS.DEPLOYED_CONTRACT
          .replace(':deployedAddress', contractAddress) // Include deployedAddress in the URL
          .replace(':contractName', contractName) // Include deployedAddress in the URL
        navigate(`${path}/${networkName}`);
};
