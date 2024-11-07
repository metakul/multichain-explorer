import { useParams } from "react-router-dom";
import { AppDispatch } from "../../../../redux/store";
import { useDispatch, useSelector } from "react-redux";
import { useRpc } from "../../../../contexts/RpcProviderContext";
import { getAddressInfo } from "../../../../redux/slices/BackendSlices/Explorer/Address/AddressInfoApi";
import { useEffect } from "react";
import { selectAddressInfoError, selectAddressInfoLoading, selectedAddressInfo } from "../../../../redux/slices/BackendSlices/Explorer/Address/AddressInfoSlice";
import { Text } from "@radix-ui/themes";

function AddressInfo() {
    const { address } = useParams<{ address: string }>(); // Retrieve the address parameter

    const dispatch = useDispatch<AppDispatch>();
    const { rpcUrl } = useRpc();

    const addressInfo = useSelector(selectedAddressInfo);
    const loading = useSelector(selectAddressInfoLoading);
    const error = useSelector(selectAddressInfoError);

    useEffect(() => {
        if (!addressInfo && address) {
            dispatch(getAddressInfo({ rpcUrl, address }));
        }
    }, [dispatch, address, rpcUrl, addressInfo]);

    if (loading) return <Text>Loading...</Text>;
    if (error) return <Text>Error: {error}</Text>;

    return (
        <div>
            <h1>Address Details</h1>
            <p>Balance: {addressInfo?.balance}</p>
            <h2>Transactions</h2>
            <ul>
                {addressInfo?.transactions && addressInfo.transactions.length > 0 ? (
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

export default AddressInfo;
