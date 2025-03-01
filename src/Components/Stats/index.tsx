import { useEffect, useState } from 'react';
import { AppDispatch } from '../../redux/store';
import { useDispatch, useSelector } from 'react-redux';
import { selectStatsInfo, selectStatsLoading } from '../../redux/slices/BackendSlices/Explorer/ExplorerStatsSlice';
import { fetchExplorerStats } from '../../redux/slices/BackendSlices/Explorer/ExplorerApiSlice';
import { setExplorerStats } from '../../redux/slices/BackendSlices/Explorer/ExplorerStatsSlice';
import { useRpc } from '../../contexts/RpcProviderContext';
import Box from '../UI/Box';
import Text from '../UI/Text';
import { useMediaQuery } from '@mui/material';
import ChartGrid from './ChartGrid';
import StatsGrid from './StatsGrid';

interface GasPricePoint {
    time: string;
    price: number;
}

function ExplorerStats() {
    const dispatch = useDispatch<AppDispatch>();
    const { rpcUrl } = useRpc();
    const isNonMobile = useMediaQuery("(min-width: 1100px)");

    const stats = useSelector(selectStatsInfo);
    const loading = useSelector(selectStatsLoading);
    const [gasPriceData, setGasPriceData] = useState<GasPricePoint[]>([]);

    const updateGasPriceChart = (stats: any) => {
        const latestGas = stats?.gasPrices?.average;
        if (latestGas) {
            const newPoint: GasPricePoint = {
                time: new Date().toLocaleTimeString(),
                price: latestGas
            };
            setGasPriceData((prev) => [...prev, newPoint].slice(-20)); // Keep only last 20 entries
        }
    };

    useEffect(() => {
        dispatch(fetchExplorerStats({ rpcUrl }));

        const ws = new WebSocket(import.meta.env.VITE_WEBSOCKET_URL);

        ws.onopen = () => {
            console.log('WebSocket for stats connected');
            ws.send(JSON.stringify({ type: 'STATS_INIT', rpcUrl }));
        };

        ws.onmessage = (event) => {
            try {
                const updatedStats = JSON.parse(event.data);
                if (updatedStats.type === 'STATS_UPDATE') {
                    dispatch(setExplorerStats(updatedStats.stats));
                    updateGasPriceChart(updatedStats.stats);
                }
            } catch (error) {
                console.error('Failed to parse stats update:', error);
            }
        };

        ws.onerror = (error) => {
            console.error('WebSocket error for stats:', error);
        };

        ws.onclose = () => {
            console.log('WebSocket for stats closed');
        };

        return () => {
            ws.close();
        };
    }, [dispatch, rpcUrl]);

    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: isNonMobile ? "row" : "column",
                justifyContent: "center",
                padding: isNonMobile ? "20px" : "8px"

            }}
        >
            <Text
                sx={{
                    fontSize: { xs: "16px", sm: "20px", md: "24px" },
                    fontWeight: "bold",
                    marginBottom: "16px",
                    textAlign: "center"
                }}
            >
                Explorer Stats Info
            </Text>
            {/* Stats Section */}

            <StatsGrid stats={stats} loading={loading} isNonMobile={isNonMobile} />

            {/* Charts Section */}
            <ChartGrid gasPriceData={gasPriceData} />
        </Box>
    );
}

export default ExplorerStats;
