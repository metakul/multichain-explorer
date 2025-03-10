
import Box from "../../../../../Components/UI/Box";
import Transactions from "../../../../../Components/Transactions/AllTrx";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchSingleTrx } from "../../../../../redux/slices/BackendSlices/Explorer/Transactions/AllTrxApiSlice";
import { useRpc } from "../../../../../contexts/RpcProviderContext";
import { useParams } from "react-router-dom";
import { AppDispatch } from "../../../../../redux/store";
import { selectTransactionByHash } from "../../../../../redux/slices/BackendSlices/Explorer/Transactions/AllTrxSlice";

function SingleTransactionPage() {

      const { hash } = useParams<{  hash?: string }>();
        const {rpcUrl}=useRpc()
        const trxInfo=hash && useSelector((state:any) => selectTransactionByHash(state, hash))

    const dispatch=useDispatch<AppDispatch>()
    useEffect(() => {
        hash &&
        dispatch(fetchSingleTrx({rpcUrl,hash}));
    }, [dispatch, rpcUrl]);

    console.log(trxInfo);
    

    
    return (
        <Box style={{ marginTop: "120px" }}>
         {/* <Transactions/> */}
        </Box>
    );
}

export default SingleTransactionPage;
