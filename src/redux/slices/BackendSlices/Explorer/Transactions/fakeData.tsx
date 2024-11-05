import { ITrx } from "../../../../../interfaces/interface";

// Function to generate a fake transaction
const createFakeTransaction = (index: number): ITrx => ({
    hash: `0x${(Math.random() * 1e18).toString(16)}`,
    blockNumber: 1000000 + index, // Incrementing block number for uniqueness
    from: `0x${(Math.random() * 1e18).toString(16)}`,
    to: `0x${(Math.random() * 1e18).toString(16)}`,
    value: (Math.random() * 1e18).toString(), // Value in Wei
    gasPrice: (Math.random() * 1e9).toFixed(0), // Gas price in Wei as string
});

// Generate an array of fake transactions
export const generateFakeTransactions = (num: number): ITrx[] => {
    return Array.from({ length: num }, (_, index) => createFakeTransaction(index));
};