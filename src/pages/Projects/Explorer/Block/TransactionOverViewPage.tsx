import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getBlockWithTrx } from '../../../../redux/slices/BackendSlices/Explorer/Blocks/RecentsBlocks/RecentBlocksApi';
import { useRpc } from '../../../../contexts/RpcProviderContext';
import { AppDispatch } from '../../../../redux/store';
import { selectBlocksForCurrentPage } from '../../../../redux/slices/BackendSlices/Explorer/Blocks/RecentsBlocks/BlocksWithFrameSlice';
import SingleBlockInfo from '../../../../Components/Blocks/SingleBlockCard';
function TransactionOverViewPage() {

    const { block } = useParams<{ block: string }>();
    const dispatch = useDispatch<AppDispatch>()
    const { rpcUrl } = useRpc();
    const blocks = useSelector(selectBlocksForCurrentPage);
    const blockData = blocks.find((b) => b.number == block || b.hash == block);

    useEffect(() => {
        if (block) {
            dispatch(getBlockWithTrx({ blockNo: block, rpcUrl }));
        }
    }, [block, dispatch, rpcUrl]);

    return (
        <div>
            {blockData &&
                <SingleBlockInfo block={blockData} showTrx={true} isSingleBlock={true} />
            }
        </div>
    )
}

export default TransactionOverViewPage
