import { useParams } from "react-router-dom";
import { AppDispatch } from "../../../../redux/store";
import { useDispatch, useSelector } from "react-redux";
import { useRpc } from "../../../../contexts/RpcProviderContext";
import { getAddressInfo } from "../../../../redux/slices/BackendSlices/Explorer/Address/AddressInfoApi";
import { useEffect } from "react";
import { selectAddressInfoLoading, selectedAddressInfo } from "../../../../redux/slices/BackendSlices/Explorer/Address/AddressInfoSlice";
import Text from "../../../../Components/UI/Text";
import AddressTrx from "./AddressTrx";

function AddressInfoPage() {
    const { address } = useParams<{ address: string }>(); // Retrieve the address parameter

    const dispatch = useDispatch<AppDispatch>();
    const { rpcUrl } = useRpc();

    const addressInfo = useSelector(selectedAddressInfo);
    const loading = useSelector(selectAddressInfoLoading);

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

            <AddressTrx address={address} /> 
        </div>
    );
}

export default AddressInfoPage;
