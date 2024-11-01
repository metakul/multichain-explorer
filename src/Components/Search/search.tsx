import { SetStateAction, useState } from "react";
import { Button, TextField } from "@radix-ui/themes";
import SearchResults from "./searchResult";
import SubmitButton from "../Buttons/SubmitButton";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../redux/store";
import { fetchSearchResult } from "../../redux/slices/BackendSlices/Explorer/ExplorerApiSlice";
import { useRpc } from "../../contexts/RpcProviderContext";

export default function Search() {

    const dispatch = useDispatch<AppDispatch>();
    const { rpcUrl } = useRpc()

    const [showResult, setShowResult] = useState(false);
    const [searchInput, setSearchInput] = useState("");

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
                <TextField.Root
                    type="text"
                    placeholder="Search by Address / Txn Hash / Block / Token / Domain Name"
                    required
                    value={searchInput}
                    onChange={changeHandler}
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
                    {showResult && <SearchResults searchInput={searchInput} />}
            </div>

        </div>
    );
}
