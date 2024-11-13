// src/components/BlockInfo.tsx
import React from 'react';
import { Box, Text } from '@radix-ui/themes';
import { navigateToBlock } from '../../helpers/navigationHelpers';
import { useNavigate } from 'react-router-dom';
import { Block } from '../../interfaces/interface';

interface BlockInfoProps {
    block: Block;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
}

const BlockInfo: React.FC<BlockInfoProps> = ({ block }) => {
    const navigate = useNavigate();
    const mockTransactions = [
        {
            hash: '0x1234abcd5678efgh9012ijkl3456mnop',
            from: '0xabcdefabcdefabcdefabcdefabcdefabcdef',
            to: '0x1234567890123456789012345678901234567890',
            value: '1.25 ETH',
            gasPrice: '20 gwei',
            blockNumber: 123456,
        },
        {
            hash: '0x9876abcd5432efgh6789ijkl3456mnop',
            from: '0xabcdefabcdefabcdefabcdefabcdefabcdef',
            to: '0x112233445566778899aabbccddeeff0011223344',
            value: '0.5 ETH',
            gasPrice: '15 gwei',
            blockNumber: 123456,
        },
        {
            hash: '0x5678abcd1234efgh2345ijkl6789mnop',
            from: '0xabcdefabcdefabcdefabcdefabcdefabcdef',
            to: '0x445566778899aabbccddeeff0011223344556677',
            value: '0.75 ETH',
            gasPrice: '25 gwei',
            blockNumber: 123456,
        },
    ];
    return (
        <div style={{ display: 'flex', alignItems: 'center', border: '1px solid black' }}>
            <Box
                key={block.hash}
                style={{
                    backgroundColor: '#ffffff',
                    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                    borderRadius: '8px',
                    padding: '16px',
                    marginBottom: '16px',
                }}
            >
                <Text
                    style={{
                        color: 'blue',
                        fontSize: '18px',
                        fontWeight: 'bold',
                        marginBottom: '8px',
                    }}
                    onClick={() => navigateToBlock(navigate, Number(block?.number))}
                >
                    Block #{block?.number ?? 'N/A'}
                </Text>
                <p><strong>Gas Limit:</strong> {block?.gasLimit ?? 'N/A'}</p>
                <p><strong>Size:</strong> {block?.size ? `${block.size} bytes` : 'N/A'}</p>
                <p><strong>Difficulty:</strong> {block?.difficulty ?? 'N/A'}</p>
                <p><strong>Timestamp:</strong> {block?.timestamp ? new Date(parseInt(block.timestamp) * 1000).toLocaleString() : 'N/A'}</p>
            </Box>

            <div style={{ background: 'black', width: '40px', height: '2px' }}></div> {/* vertical line div */}
            <div style={{ borderLeft: '1px solid black' }}>
                <div style={{ padding: '16px', marginLeft: '16px' }}>
                    {mockTransactions.map((trx, index) => (
                        <div
                            key={index}
                            style={{
                                marginBottom: '12px',
                                padding: '8px',
                                border: '1px solid #ddd',
                                borderRadius: '4px',
                            }}
                        >
                            <p>
                                <strong>Transaction Hash:</strong>{' '}
                                <a href={`https://etherscan.io/tx/${trx.hash}`} target="_blank" rel="noopener noreferrer">
                                    {trx.hash}
                                </a>
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default BlockInfo;
