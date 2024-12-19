import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchBlockInfo } from "../../../../redux/slices/BackendSlices/Explorer/Blocks/RecentsBlocks/RecentBlocksApi";
import { selectBlocks, selectBlocksLoading } from "../../../../redux/slices/BackendSlices/Explorer/Blocks/RecentsBlocks/RecentBlocksSlice";
import { useRpc } from "../../../../contexts/RpcProviderContext";
import { AppDispatch } from "../../../../redux/store";
import Box from "../../../../Components/UI/Box";
import Text from "../../../../Components/UI/Text";
import { Skeleton } from "@mui/material";

function SingleBlock() {
    const { block } = useParams<{ block: string }>();
    const dispatch = useDispatch<AppDispatch>();
    const blocks = useSelector(selectBlocks);
    const isLoading = useSelector(selectBlocksLoading);
    const { rpcUrl } = useRpc();
    const blockData = blocks.find((b) => b.number == block || b.hash == block);

    useEffect(() => {
        if (block) {
            dispatch(fetchBlockInfo({ rpcUrl, blockNo: block }));
        }
    }, [block, blockData, dispatch, rpcUrl]);

    return (
        <Box style={{ padding: "16px", margin: "auto", marginTop: "120px" }}>
            <Text style={{ fontSize: "24px", fontWeight: "bold", marginBottom: "16px" }}>
                Block Details
            </Text>
            <Box style={{ border: '1px solid #ccc', borderRadius: '8px', padding: '16px' }}>
                <DetailRow label="Base Fee Per Gas" value={blockData?.baseFeePerGas} isLoading={isLoading} />
                <DetailRow label="Difficulty" value={blockData?.difficulty} isLoading={isLoading} />
                <DetailRow label="Extra Data" value={blockData?.extraData} isLoading={isLoading} />
                <DetailRow label="Gas Limit" value={blockData?.gasLimit} isLoading={isLoading} />
                <DetailRow label="Gas Used" value={blockData?.gasUsed} isLoading={isLoading} />
                <DetailRow label="Hash" value={blockData?.hash} isLoading={isLoading} />
                <DetailRow label="Logs Bloom" value={blockData?.logsBloom} isLoading={isLoading} />
                <DetailRow label="Miner" value={blockData?.miner} isLoading={isLoading} />
                <DetailRow label="Mix Hash" value={blockData?.mixHash} isLoading={isLoading} />
                <DetailRow label="Nonce" value={blockData?.nonce} isLoading={isLoading} />
                <DetailRow label="Block Number" value={blockData?.number} isLoading={isLoading} />
                <DetailRow label="Parent Hash" value={blockData?.parentHash} isLoading={isLoading} />
                <DetailRow label="Receipts Root" value={blockData?.receiptsRoot} isLoading={isLoading} />
                <DetailRow label="SHA3 Uncles" value={blockData?.sha3Uncles} isLoading={isLoading} />
                <DetailRow label="Size" value={blockData?.size} isLoading={isLoading} />
                <DetailRow label="State Root" value={blockData?.stateRoot} isLoading={isLoading} />
                <DetailRow label="Timestamp" value={blockData?.timestamp} isLoading={isLoading} />
                <DetailRow label="Total Difficulty" value={blockData?.totalDifficulty} isLoading={isLoading} />
                <DetailRow label="Transactions Root" value={blockData?.transactionsRoot} isLoading={isLoading} />
                <DetailRow label="Transactions" value={blockData?.transactions?.join(", ")} isLoading={isLoading} />
            </Box>
        </Box>
    );
}

// DetailRow component to display label-value pairs consistently with loading state
const DetailRow = ({ label, value, isLoading }: { label: string; value?: string; isLoading: boolean }) => (
    <Box style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid #eaeaea' }}>
        <Text style={{ fontWeight: 'bold' }}>{label}</Text>
        {isLoading ? (
            <Skeleton width={150} />
        ) : (
            <Text>{truncateValue(value)}</Text>
        )}
    </Box>
);

// Truncate long values to make them more readable
const truncateValue = (value?: string) => {
    if (!value) return "N/A";
    return value.length > 50 ? `${value.slice(0, 50)}...` : value;
};

export default SingleBlock;
