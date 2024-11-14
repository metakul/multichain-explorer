import { SetStateAction, useState } from "react";
import SubmitButton from "../Buttons/SubmitButton";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../redux/store";
import { fetchSearchResult } from "../../redux/slices/BackendSlices/Explorer/ExplorerApiSlice";
import { useRpc } from "../../contexts/RpcProviderContext";
import { selectSearchResultError, selectSearchResultLoading, selectTransactionBySearchInput } from "../../redux/slices/BackendSlices/Explorer/ExplorerResultSlice";
import { ITrx } from "../../interfaces/interface";
import TransactionInfo from "../Transactions/TrxTable";
import Button from "../UI/Button";
import TextField from "../UI/TextField";

export default function Search() {

    const dispatch = useDispatch<AppDispatch>();
    
    const [showResult, setShowResult] = useState(false);
    const [searchInput, setSearchInput] = useState("");
    const { rpcUrl } = useRpc()
    const loading = useSelector(selectSearchResultLoading);
    const error = useSelector(selectSearchResultError);
    const transaction: ITrx | undefined = useSelector(selectTransactionBySearchInput(searchInput));

    const changeHandler = (e: { target: { value: SetStateAction<string> } }) => {
        setSearchInput(e.target.value);
    };

    const handleSearch = async () => {
        setShowResult(true)
        dispatch(fetchSearchResult({ searchInput, rpcUrl }));
    };
    const closeSearch = async () => {
        setShowResult(false);
    };

    return (
        <div >
            <div style={{
                display: "flex"
            }}>
                <TextField
                    type="text"
                    placeholder="Search by  Txn Hash" // todo add search by block, address,ens
                    required
                    value={searchInput}
                    onChange={changeHandler}
                    style={{
                        width: "100%",
                        marginRight: "10px"
                    }}
                />

                {/* Replaced Button with LoadingButton */}
                <SubmitButton onClick={handleSearch} variant="surface" buttonText="Search">
                   Search
                </SubmitButton>
                {showResult && <Button onClick={closeSearch}>
                    Close
                </Button>}
            </div>
            <div>
                {showResult  && <TransactionInfo transaction={[transaction] as ITrx[]} loading={loading} error={error}/>}
            </div>
        </div>
    );
}
