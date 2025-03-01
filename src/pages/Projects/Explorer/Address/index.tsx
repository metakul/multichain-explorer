import { useParams } from "react-router-dom";
import { AppDispatch } from "../../../../redux/store";
import { useDispatch, useSelector } from "react-redux";
import { useRpc } from "../../../../contexts/RpcProviderContext";
import { getAddressInfo } from "../../../../redux/slices/BackendSlices/Explorer/Address/AddressInfoApi";
import { useEffect } from "react";
import { selectAddressInfoError, selectAddressInfoLoading, selectedAddressInfo } from "../../../../redux/slices/BackendSlices/Explorer/Address/AddressInfoSlice";
import Text from "../../../../Components/UI/Text";

function AddressInfo() {
    const { address } = useParams<{ address: string }>(); // Retrieve the address parameter

    const dispatch = useDispatch<AppDispatch>();
    const { rpcUrl } = useRpc();

    const addressInfo = useSelector(selectedAddressInfo);
    const loading = useSelector(selectAddressInfoLoading);
    const error = useSelector(selectAddressInfoError);

    useEffect(() => {
        if (address) {
            dispatch(getAddressInfo({ rpcUrl, address }));
        }
    }, [rpcUrl, dispatch]);

    return (
        <div>
            <h1>Address Details</h1>
            {loading ? (
                <Text>Loading Balance</Text>
            ) : (
                <Text>Balance: {addressInfo?.balance} ethers</Text>
            )}

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

export default AddressInfo;
