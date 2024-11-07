import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchBlockInfo } from "../../../../redux/slices/BackendSlices/Explorer/Blocks/RecentsBlocks/RecentBlocksApi";
import { selectBlocks, selectBlocksLoading } from "../../../../redux/slices/BackendSlices/Explorer/Blocks/RecentsBlocks/RecentBlocksSlice";
import { useRpc } from "../../../../contexts/RpcProviderContext";
import { Box, Text } from "@radix-ui/themes";
import { AppDispatch } from "../../../../redux/store";

function SingleBlock() {
    const { block } = useParams<{ block: string }>();
    const dispatch = useDispatch<AppDispatch>();
    const blocks = useSelector(selectBlocks);
    const isLoading = useSelector(selectBlocksLoading);
    const { rpcUrl } = useRpc();
    const blockData = blocks.find((b) => b.number === block || b.hash === block);

    useEffect(() => {
        if (block && !blockData) {
            dispatch(fetchBlockInfo({ rpcUrl, blockNo: block }));
        }
    }, [block, blockData, dispatch, rpcUrl]);


    return (
        <Box style={{ padding: "16px", margin: "auto", marginTop: "120px" }}>
            <Text style={{ fontSize: "24px", fontWeight: "bold", marginBottom: "16px" }}>
                Block Details
            </Text>
           
                {blockData ? (
                    <Box style={{ border: '1px solid #ccc', borderRadius: '8px', padding: '16px' }}>
                        <DetailRow label="Base Fee Per Gas" value={blockData.baseFeePerGas} loading={isLoading} />
                        <DetailRow label="Difficulty" value={blockData.difficulty} loading={isLoading} />
                        <DetailRow label="Extra Data" value={blockData.extraData} loading={isLoading} />
                        <DetailRow label="Gas Limit" value={blockData.gasLimit} loading={isLoading} />
                        <DetailRow label="Gas Used" value={blockData.gasUsed} loading={isLoading} />
                        <DetailRow label="Hash" value={blockData.hash} loading={isLoading} />
                        <DetailRow label="Logs Bloom" value={blockData.logsBloom} loading={isLoading} />
                        <DetailRow label="Miner" value={blockData.miner} loading={isLoading} />
                        <DetailRow label="Mix Hash" value={blockData.mixHash} loading={isLoading} />
                        <DetailRow label="Nonce" value={blockData.nonce} loading={isLoading} />
                        <DetailRow label="Block Number" value={blockData.number} loading={isLoading} />
                        <DetailRow label="Parent Hash" value={blockData.parentHash} loading={isLoading} />
                        <DetailRow label="Receipts Root" value={blockData.receiptsRoot} loading={isLoading} />
                        <DetailRow label="SHA3 Uncles" value={blockData.sha3Uncles} loading={isLoading} />
                        <DetailRow label="Size" value={blockData.size} loading={isLoading} />
                        <DetailRow label="State Root" value={blockData.stateRoot} loading={isLoading} />
                        <DetailRow label="Timestamp" value={blockData.timestamp} loading={isLoading} />
                        <DetailRow label="Total Difficulty" value={blockData.totalDifficulty} loading={isLoading} />
                        <DetailRow label="Transactions Root" value={blockData.transactionsRoot} loading={isLoading} />
                        <DetailRow label="Uncles" value={blockData.uncles.join(", ")} loading={isLoading} />
                        <DetailRow label="Transactions" value={blockData.transactions.join(", ")} loading={isLoading} />
                    </Box>
                ) : (
                    <Text>Loading block data...</Text>
                )}
        </Box>
    );
}


// DetailRow component to display label-value pairs consistently with loading state
const DetailRow = ({ label, value, loading }: { label: string; value?: string; loading: boolean }) => (
    <Box style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid #eaeaea' }}>
        <Text style={{ fontWeight: 'bold' }}>{label}</Text>
        <Text>{loading ? <Skeleton /> : truncateValue(value)}</Text>
    </Box>
);

// Skeleton component for displaying a loading placeholder
const Skeleton = () => (
    <Box style={{ width: '100px', height: '16px', backgroundColor: '#eaeaea', borderRadius: '4px' }} />
);

// Truncate long values to make them more readable
const truncateValue = (value?: string) => {
    if (!value) return "N/A";
    return value.length > 50 ? `${value.slice(0, 50)}...` : value;
};

export default SingleBlock;
