import React from "react";
import VisibilityIcon from '@mui/icons-material/Visibility';
import { ITrx } from "../../interfaces/interface";
import { useNavigate } from "react-router-dom";
import { navigateToAddress, navigateToTransaction } from "../../helpers/navigationHelpers";
import Skeleton from "@mui/material/Skeleton";
import { useRpc } from "../../contexts/RpcProviderContext";
import { getColors } from "../../layout/Theme/themes";
import Box from "../UI/Box";
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import EastIcon from '@mui/icons-material/East';
import Text from "../UI/Text";
import { Avatar } from "@mui/material";

interface TrxInfoProps {
    transaction: ITrx | null;
    loading: boolean;
    showDetails?: boolean;
    error: string | null;
}

const TransactionInfo: React.FC<TrxInfoProps> = ({ transaction, loading, error, showDetails }) => {
    const navigate = useNavigate();
    const { networkName } = useRpc();

    if (error) {
        return (
            <Box sx={{ p: 2 }}>
                <Text variant="h4" style={{ color: getColors().redAccent[500] }}>
                    Error: {error}
                </Text>
            </Box>
        );
    }

    if (loading) {
        return (
            <Box sx={{ p: 2 }}>
                {/* Skeleton for the header */}
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <Skeleton variant="circular" width={24} height={24} />
                    <Skeleton variant="text" width={100} height={24} />
                    <Skeleton variant="circular" width={24} height={24} />
                </Box>
                {/* Skeleton for the address section */}
                <Box sx={{ display: "flex", gap: "10px", mt: 2 }}>
                    <Skeleton variant="text" width={100} height={24} />
                    <Skeleton variant="circular" width={24} height={24} />
                    <Skeleton variant="text" width={100} height={24} />
                </Box>
                {/* Skeleton for the value and fee section */}
                <Box sx={{ mt: 2 }}>
                    <Skeleton variant="text" width={150} height={24} />
                    <Skeleton variant="text" width={200} height={24} />
                </Box>
            </Box>
        );
    }

    return (
        <Box>

            <Box
                sx={{
                    backgroundColor: getColors().secondary[900],
                    boxShadow: 3, // This applies a medium shadow
                    borderRadius: 2, // Override the default border radius if needed
                    p: 3, // Padding
                    my: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-around',
                    alignItems: 'center',
                    '&:hover': {
                        boxShadow: 6, // Increase shadow on hover
                        transform: 'translateY(-4px)', // Slight lift effect on hover
                        transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
                    },
                }}
            >
                {/* Transaction Header */}
                {transaction &&
                    <Box sx={{
                        pb: 2
                    }}>
                        <Box sx={{
                            display: "flex", alignItems: "center", gap: 1,
                            justifyContent: "center",
                            flexDirection: {
                                sx: "row",
                                md: "row"
                            },
                        }}>
                            <ReceiptLongIcon /> ContractCall
                            <VisibilityIcon
                                onClick={() => navigateToTransaction(navigate, transaction?.hash, networkName)}
                                style={{ cursor: "pointer" }}
                            />

                        </Box>
                        <Text
                            variant="h5"
                            style={{ color: getColors().blueAccent[500], cursor: "pointer" }}
                            onClick={() => navigateToTransaction(navigate, transaction?.hash, networkName)}
                        >
                            Trx Hash: {transaction?.hash?.slice(0, 8)}...{transaction?.hash?.slice(-8)}
                        </Text>
                    </Box>
                }
                {transaction && (
                    <Box key={transaction?.hash} display={"flex"} flexDirection={"row"} justifyContent={"space-between"}>
                        <Box sx={{
                            display: "flex",
                            justifyContent: "center",
                            flexDirection: "column",
                            alignItems: "center",
                            position: "relative",
                            right: {
                                md: 60
                            }
                        }}>
                            <Avatar sx={{

                                width: {
                                    sx: 40,
                                    md: 80
                                },
                                height: {
                                    sx: 40,
                                    md: 80
                                },
                            }} />
                            <Text
                                style={{ color: getColors().blueAccent[200], cursor: "pointer" }}
                                onClick={() => navigateToAddress(navigate, transaction?.from, networkName)}
                            >
                                {transaction?.from?.slice(0, 6)}...{transaction?.from?.slice(-6)}
                            </Text>
                        </Box>

                        <Box sx={{ px: 2 }}>
                            <Text>Value: {(transaction?.value / 10 ** 18).toFixed(4)} ETH</Text>
                            <EastIcon sx={{
                            }} />
                            <EastIcon sx={{
                            }} />
                            <EastIcon sx={{
                            }} />
                            <EastIcon sx={{
                            }} />
                            <EastIcon sx={{
                            }} />
                            <EastIcon sx={{
                            }} />
                            <Text>Fee: {(parseFloat(transaction?.gasPrice) / 10 ** 18).toFixed(12)} ETH</Text>
                        </Box>
                        <Box sx={{
                            display: "flex",
                            justifyContent: "center",
                            flexDirection: "column",
                            alignItems: "center",
                            position: "relative",
                            left: {
                                md: 60,
                            }
                        }}>
                            <Avatar sx={{
                                width: {
                                    sx: 40,
                                    md: 80
                                },
                                height: {
                                    sx: 40,
                                    md: 80
                                },
                            }} />
                            <Text
                                style={{ color: getColors().blueAccent[200], cursor: "pointer" }}
                                onClick={() => navigateToAddress(navigate, transaction?.to, networkName)}
                            >
                                {transaction?.to?.slice(0, 6)}...{transaction?.to?.slice(-6)}
                            </Text>
                        </Box>
                    </Box>
                )}
            </Box>
            {showDetails &&
                <Box>
                    <Text>Details</Text>
                    <Text>GAS Price: {transaction?.gasPrice}
                    </Text>
                    <Text>Gas Limit: {transaction?.gasLimit}
                    </Text>
                    <Text>Nonce: {transaction?.nonce}
                    </Text>
                </Box>

            }
        </Box>
    );
};

export default TransactionInfo;