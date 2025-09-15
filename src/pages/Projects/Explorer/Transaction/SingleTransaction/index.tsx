
import Box from "../../../../../Components/UI/Box";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchSingleTrx } from "../../../../../redux/slices/BackendSlices/Explorer/Transactions/AllTrxApiSlice";
import { useRpc } from "../../../../../contexts/RpcProviderContext";
import { useParams } from "react-router-dom";
import { AppDispatch } from "../../../../../redux/store";
import { selectTransactionByHash } from "../../../../../redux/slices/BackendSlices/Explorer/Transactions/AllTrxSlice";
import TransactionInfo from "../../../../../Components/Transactions/TrxTable";
import { ITrx } from "../../../../../interfaces/interface";

function SingleTransactionPage() {

    const { hash } = useParams<{ hash?: string }>();
    const { rpcUrl } = useRpc()
    const trxInfo = hash && useSelector((state: any) => selectTransactionByHash(state, hash))

    const dispatch = useDispatch<AppDispatch>()
    useEffect(() => {
        hash &&
            dispatch(fetchSingleTrx({ rpcUrl, hash }));
    }, [dispatch, rpcUrl]);

    return (
        <Box style={{ marginTop: "120px" }}>
            <TransactionInfo key={`trx-${1}`} transaction={trxInfo as ITrx} loading={false} error={null} showDetails={true} />
        </Box>
    );
}

export default SingleTransactionPage;
