// navigationHelpers.ts
import { useNavigate } from 'react-router-dom';
import { EXPLORER_PAGE } from '../DataTypes/enums';

export const navigateToTransaction = (navigate: ReturnType<typeof useNavigate>,hash: string) => {
    navigate(`${EXPLORER_PAGE.Transaction}/${hash}`);
};

export const navigateToBlock = (navigate: ReturnType<typeof useNavigate>, blockNumber: number) => {
    navigate(`/block/${blockNumber}`);
};

export const navigateToAddress = (navigate: ReturnType<typeof useNavigate>, address: string) => {
    navigate(`/address/${address}`);
};
