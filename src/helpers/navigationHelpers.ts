// navigationHelpers.ts
import { useNavigate } from 'react-router-dom';
import { EXPLORER_PAGE, Pages } from '../DataTypes/enums';

export const navigateToTransaction = (navigate: ReturnType<typeof useNavigate>,hash: string) => {
    navigate(`${EXPLORER_PAGE.SINGLE_TRANSACTIONS}/${hash}`);
};

export const navigateToBlock = (navigate: ReturnType<typeof useNavigate>, blockNumber: number) => {
    navigate(`${EXPLORER_PAGE.SINGLE_BLOCK}/${blockNumber}`);
};
export const navigateToAllBlock = (navigate: ReturnType<typeof useNavigate>) => {
    navigate(`${Pages.BLOCKS}`);
};

export const navigateToAddress = (navigate: ReturnType<typeof useNavigate>, address: string) => {
    navigate(`${EXPLORER_PAGE.SINGLE_ADDRESS}/${address}`);
};
