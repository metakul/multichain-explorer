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
import { TrxChartInfo } from '../Charts/TotalTrxChart';
import { GasPricePoint } from '../Charts/GasPriceChart';
// import { getColors } from '../../layout/Theme/themes';

function ExplorerStats() {
    const dispatch = useDispatch<AppDispatch>();
    const { rpcUrl } = useRpc();
    const isNonMobile = useMediaQuery("(min-width: 1100px)");

    const stats = useSelector(selectStatsInfo);
    const loading = useSelector(selectStatsLoading);
    const [gasPriceData, setGasPriceData] = useState<GasPricePoint[]>([]);
    const [totalTrx, setTotalTrxData] = useState<TrxChartInfo[]>([]);

    const updateGasPriceChart = (stats: any) => {
        console.log(stats);

        const latestGas = stats?.gasPrices?.average;
        const dailyTotalTrx = stats?.transactionsToday;
        if (latestGas) {
            const newPoint: GasPricePoint = {
                time: new Date().toLocaleTimeString(),
                price: latestGas
            };
            setGasPriceData((prev) => [...prev, newPoint]); // Keep only last 20 entries
        }
        if (dailyTotalTrx) {
            const newPoint: TrxChartInfo = {
                time: new Date().toLocaleTimeString(),
                trxCount: dailyTotalTrx
            };
            setTotalTrxData((prev) => [...prev, newPoint]); // Keep only last 20 entries
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
     
    }, [dispatch, rpcUrl]);

    return (
        <Box>
            <Text
                sx={{
                    fontSize: { xs: "16px", sm: "20px", md: "24px" },
                    fontWeight: "bold",
                    mt: "16px",
                    textAlign: "center"
                }}
            >
                Explorer Stats Info
            </Text>
            <Box
                sx={{
                    display: "flex",
                    flexDirection: isNonMobile ? "row" : "column",
                    justifyContent: "center",
                    // padding: isNonMobile ? "20px" : "8px"

                }}
            >
                {/* <Box sx={{
            width:"100%",
            height:"80px",
            mt:4,
            background:getColors().redAccent[800]
        }}>
           <Text>
                This is a test for ads
           </Text>
        </Box> */}
                {/* Stats Section */}

                <StatsGrid stats={stats} loading={loading} isNonMobile={isNonMobile} />

                {/* Charts Section */}
                <ChartGrid gasPriceData={gasPriceData} dailyTrxData={totalTrx} />
            </Box>

        </Box>
    );
}

export default ExplorerStats;
