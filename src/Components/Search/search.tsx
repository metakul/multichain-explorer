import { SetStateAction, useState } from "react";
import SubmitButton from "../Buttons/SubmitButton";
import { useRpc } from "../../contexts/RpcProviderContext";
import TextField from "../UI/TextField";
import Box from "../UI/Box";
import { navigateToAddress, navigateToBlock, navigateToTransaction } from "../../helpers/navigationHelpers";
import { useNavigate } from "react-router-dom";
import { getColors } from "../../layout/Theme/themes";
import Text from "../UI/Text";

export default function Search() {

    const navigate = useNavigate();

    const [searchInput, setSearchInput] = useState("");
    const { networkName } = useRpc()

    const changeHandler = (e: { target: { value: SetStateAction<string> } }) => {
        setSearchInput(e.target.value);
    };

    function detectInputType(input: string): "transaction" | "address" | "smart-contract" | "block" | "unknown" {
        if (/^0x[a-fA-F0-9]{64}$/.test(input)) {
            return "transaction";
        }
        if (/^0x[a-fA-F0-9]{40}$/.test(input)) {
            // Could be address or smart contract - you'd need an on-chain check to see if it's a contract.
            return "address";
        }
        if (/^\d+$/.test(input)) {
            return "block";
        }
        return "unknown";
    }


    const handleSearch = async () => {
        const type = detectInputType(searchInput);

        if (type === "unknown") {
            alert("Please enter a valid transaction hash, address, or block number.");
            return;
        }

        if (type === "transaction") {
            navigateToTransaction(navigate, searchInput, networkName);
            return;  // No need to dispatch or showResult
        }

        if (type === "block") {
            const blockNumber = parseInt(searchInput, 10);
            navigateToBlock(navigate, blockNumber, networkName)
            return;
        }

        if (type === "address") {

            navigateToAddress(navigate, searchInput, networkName);
            return;
        }
    };


    return (
        <div >
            <Box sx={{
                display: "flex",
                px: 4,
                mb: 2
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
                <Box sx={{
                    width: "100px",
                    background: getColors().redAccent[800],
                    borderRadius: "8px",
                    ml:2
                }}>
                    <Text>
                        This is a test for ads
                    </Text>
                </Box>
            </Box>
        </div>
    );
}
