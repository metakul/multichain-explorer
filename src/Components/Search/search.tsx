import { SetStateAction, useState } from "react";
import { Container, TextField } from "@radix-ui/themes";
import SearchResults from "./searchResult";
import SubmitButton from "../Buttons/SubmitButton";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../redux/store";
import { fetchSearchResult } from "../../redux/slices/BackendSlices/Explorer/ExplorerApiSlice";
import { selectMySearchResult } from "../../redux/slices/BackendSlices/Explorer/ExplorerResultSlice";

export default function Search() {

    const dispatch = useDispatch<AppDispatch>();
    const SearchResult = useSelector(selectMySearchResult);

    const [showResult, setShowResult] = useState(false);
    const [searchInput, setSearchInput] = useState("");
    
    const changeHandler = (e: { target: { value: SetStateAction<string> } }) => {
        setSearchInput(e.target.value);
    };

    const handleSearch = async () => {
        dispatch(fetchSearchResult({searchInput, setShowResult}));
    };

    console.log("SearchResult", SearchResult);
    

    return (
        <div>
            <Container>
                <div style={{
                    display:"flex"
                }}>
                    <TextField.Root>
                        <TextField.Root
                            type="text"
                            placeholder="Search by Address / Txn Hash / Block / Token / Domain Name"
                            required
                            value={searchInput}
                            onChange={changeHandler}
                        />
                    </TextField.Root>

                    {/* Replaced Button with LoadingButton */}
                    <SubmitButton onClick={handleSearch} variant="surface" buttonText="Search">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                            width="24"
                            height="24"
                        >
                            <path
                                fillRule="evenodd"
                                d="M10.5 3.75a6.75 6.75 0 100 13.5 6.75 6.75 0 000-13.5zM2.25 10.5a8.25 8.25 0 1114.59 5.28l4.69 4.69a.75.75 0 11-1.06 1.06l-4.69-4.69A8.25 8.25 0 012.25 10.5z"
                                clipRule="evenodd"
                            />
                        </svg>
                    </SubmitButton>
                </div>
            </Container>
            {showResult && <SearchResults result={{ SearchResult, searchInput }} />}
        </div>
    );
}
