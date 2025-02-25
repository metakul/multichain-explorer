import { useEffect } from 'react';
import { AppDispatch } from '../../redux/store';
import { useDispatch, useSelector } from 'react-redux';
import { selectStatsInfo, selectStatsLoading, selectStatsError } from '../../redux/slices/BackendSlices/Explorer/ExplorerStatsSlice';
import { fetchExplorerStats } from '../../redux/slices/BackendSlices/Explorer/ExplorerApiSlice';
import { useRpc } from '../../contexts/RpcProviderContext';
import Box from '../UI/Box';
import Text from '../UI/Text';
import Flex from '../UI/Flex';
import Card from '../UI/Card';

function ExplorerStats() {
    const dispatch = useDispatch<AppDispatch>();
    const { rpcUrl } = useRpc();

    const stats = useSelector(selectStatsInfo);
    const loading = useSelector(selectStatsLoading);
    const error = useSelector(selectStatsError);

    useEffect(() => {
        dispatch(fetchExplorerStats({ rpcUrl }));
    }, [dispatch, rpcUrl]);

    const StatCard = ({ label, value }: { label: string; value: string | number | null | undefined }) => (
            <Card>
                <Flex >
                    <Box sx={{
                        padding: '8px',
                    }}>
                        <Text style={{ fontWeight: "bold", fontSize:"14px" }}>
                            {label}
                        </Text>
                        <Text style={{  fontSize:"14px" }}>
                            {value ?? "N/A"} {/* Show N/A if value is null or undefined */}
                        </Text>
                    </Box>
                </Flex>
            </Card>
    );

    const StatCardSkeleton = () => (
        <Box sx={{
            backgroundColor: '#ffffff',
            boxShadow: '4px 4px 8px rgba(0, 0, 0, 0.1)',
            borderRadius: '8px',
            padding: '6px',
            height: "60px",
            marginBottom: "2px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
        }}>
            <Card>
                <Flex gap="3">
                    <Box>
                        <SkeletonBox width="120px" height="12px" />
                        <SkeletonBox width="80px" height="12px" />
                    </Box>
                </Flex>
            </Card>
        </Box>
    );

    const SkeletonBox = ({ width, height }: { width: string; height: string }) => (
        <Box style={{ width, height, backgroundColor: '#eaeaea', borderRadius: '4px', margin: '4px 0' }} />
    );

    return (
        <Box style={{ margin: "auto" }}>
            <Box sx={{
                display: "flex"
            }}>
                <Text style={{ fontSize: "24px", fontWeight: "bold", }}>  Explorer Stats Info </Text>
            </Box>
            {error && <Box style={{ margin: "auto", marginTop: "" }}>
                <p>Error loading stats</p>
            </Box>
            }
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '6px' }}>
                {loading
                    ? Array.from({ length: 8 }).map((_, index) => <StatCardSkeleton key={index} />)
                    : stats && (
                        <>
                            <StatCard label="Total Blocks" value={stats.totalBlocks} />
                            <StatCard label="Total Addresses" value={stats.totalAddresses} />
                            <StatCard label="Total Trx" value={stats.totalTransactions} />
                            <StatCard label="Average Block Time" value={`${stats.averageBlockTime} s`} />
                            <StatCard label="Total Gas Used" value={stats.totalGasUsed} />
                            <StatCard label="Trx Today" value={stats.transactionsToday} />
                            <StatCard label="Gas Used Today" value={stats.gasUsedToday} />
                            <StatCard label="Average Gas Price" value={stats.gasPrices.average} />
                            <StatCard label="Fast Gas Price" value={stats.gasPrices.fast} />
                            <StatCard label="Slow Gas Price" value={stats.gasPrices.slow} />
                            <StatCard label="Static Gas Price" value={stats.staticGasPrice} />
                            <StatCard label="Network Utilization" value={`${stats.networkUtilizationPercentage}%`} />
                        </>
                    )}
            </div>
        </Box>

    );
}

export default ExplorerStats;
