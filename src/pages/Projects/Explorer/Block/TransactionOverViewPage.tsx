import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getBlockWithTrx } from '../../../../redux/slices/BackendSlices/Explorer/Blocks/RecentsBlocks/RecentBlocksApi';
import { useRpc } from '../../../../contexts/RpcProviderContext';
import { AppDispatch } from '../../../../redux/store';
import BlockInfo from '../../../../Components/Blocks/SingleBlockWithTrx';
import { selectBlocks } from '../../../../redux/slices/BackendSlices/Explorer/Blocks/RecentsBlocks/RecentBlocksSlice';

function TransactionOverViewPage() {

    const { block } = useParams<{ block: string }>();
    const dispatch = useDispatch<AppDispatch>()
    const { rpcUrl } = useRpc();

    const blocks = useSelector(selectBlocks);
    const blockData = blocks.find((b) => b.number == block || b.hash == block);

    console.log("blockInfo", blockData);
    
    
    useEffect(() => {
        if (block) {
            dispatch(getBlockWithTrx({ blockNo: block, rpcUrl }));
        }
    }, [block, dispatch, rpcUrl]);

    return (
        <div>
            {blockData &&

                <BlockInfo block={blockData} />
            }
        </div>
    )
}

export default TransactionOverViewPage
