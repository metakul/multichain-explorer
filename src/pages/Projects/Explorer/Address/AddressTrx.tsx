import { AppDispatch } from "../../../../redux/store";
import { useDispatch, useSelector } from "react-redux";
import { useRpc } from "../../../../contexts/RpcProviderContext";
import { getAddressTransactions } from "../../../../redux/slices/BackendSlices/Explorer/Address/AddressInfoApi";
import { useEffect } from "react";
import {  selectAddressTransactionsError, selectAddressTransactionsLoading, selectedAddressInfo } from "../../../../redux/slices/BackendSlices/Explorer/Address/AddressInfoSlice";
import Text from "../../../../Components/UI/Text";
import { Alert } from "@mui/material";

interface AddressTrxProps {
    address?: string | null; // Optional label
}

const AddressTrx: React.FC<AddressTrxProps> = ({
    address,
}) => {
    const dispatch = useDispatch<AppDispatch>();
    const { rpcUrl,networkName } = useRpc();

    const addressInfo = useSelector(selectedAddressInfo);
    const loading = useSelector(selectAddressTransactionsLoading);
    const error = useSelector(selectAddressTransactionsError);

    useEffect(() => {
        if (address) {
            dispatch(getAddressTransactions({networkName, rpcUrl, address }));
        }
    }, [rpcUrl, dispatch]);

    return (
        <div>
            {loading && 
            <Alert>
                Loading User Transactions
            </Alert>

            }
            <h2>Transactions</h2>
            <ul>
                {!error && addressInfo?.transactions && addressInfo.transactions.length > 0 ? (
                    addressInfo.transactions.map((trx, index) => (
                        <li key={index}>
                            Transaction {index + 1}: {trx}
                        </li>
                    ))
                ) : (
                    <Text>No transactions found</Text>
                )}
            </ul>
        </div>
    );
}

export default AddressTrx;
