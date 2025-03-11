import { Typography } from '@mui/material';
import GasPriceChart, { GasPricePoint } from '../Charts/GasPriceChart';
import TotalTrxChart, { TrxChartInfo } from '../Charts/TotalTrxChart';
import Box from '../UI/Box';
import { useRpc } from '../../contexts/RpcProviderContext';
import { useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { AppDispatch } from '../../redux/store';
import { getColors } from '../../layout/Theme/themes';

interface ChartGridProps {
    gasPriceData:GasPricePoint[];
}

function ChartGrid({ gasPriceData }: ChartGridProps) {
    const dispatch = useDispatch<AppDispatch>();
    const { rpcUrl } = useRpc();
    const [totalTrx, setTotalTrxData] = useState<TrxChartInfo[]>([]);


        useEffect(() => {
    
            const ws = new WebSocket(import.meta.env.VITE_WEBSOCKET_URL);
    
            ws.onopen = () => {
                console.log('WebSocket for stats connected');
                ws.send(JSON.stringify({ type: 'DAILY_TRX_INIT', rpcUrl }));
            };
    
            ws.onmessage = (event) => {
                try {
                    const updatedStats = JSON.parse(event.data);
                    if (updatedStats.type === 'DAILY_TRX_UPDATE') {
                        console.log("updatedStats",updatedStats);
                        setTotalTrxData(updatedStats.data)
                        // updateGasPriceChart(updatedStats.stats);
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
        <Box sx={{
            display:"flex",
            justifyContent:"center",
            flexDirection:"column",
            py: 2,
            px: 1,
            mt: 2,
            width: "100%",
            borderRadius: "12px",
            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
        }}>
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "center",
                }}
            >
                <GasPriceChart gasPriceData={gasPriceData} />
                {/* <GasPriceChart gasPriceData={gasPriceData} /> */}
                {/* <GasPriceChart gasPriceData={gasPriceData} /> */}
                <TotalTrxChart dailyTrxData={totalTrx} />
            </Box>
      
            <Box sx={{
            px:8
        }}>

        <Box sx={{
            width:"100%",
            height:"60px",
            mt:1,
            background:getColors().redAccent[800]
        }}>
           <Typography>
                This is a test for ads
           </Typography>
        </Box>
        {/* } */}
        </Box>
        </Box>
    );
}

export default ChartGrid;
