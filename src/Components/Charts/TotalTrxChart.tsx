import { useMediaQuery } from '@mui/material';
import React from 'react';
import { ResponsiveContainer, AreaChart, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Area } from 'recharts';
import Text from '../UI/Text';
import { getColors } from '../../layout/Theme/themes';
import Box from '../UI/Box';


export interface TrxChartInfo {
    date: string;
    transactionsCount: number;
}

interface Props {
    dailyTrxData: TrxChartInfo[];
}

const TotalTrxChart: React.FC<Props> = ({ dailyTrxData }) => {
    const isNonMobile = useMediaQuery("(min-width: 768px)");
    
    const chartWidth = isNonMobile ? 350 : 230;
    const chartHeight = isNonMobile ? 300 : 250;

    return (
        <Box sx={{ width: chartWidth, height: chartHeight }}>
            {dailyTrxData.length === 0 ? (
                <Box
                    sx={{
                        width: '98%',
                        height: '100%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor: getColors().grey[800],
                        borderRadius: '8px',
                    }}
                >
                    <Text
                        sx={{
                            fontSize: '16px',
                            color: '#555',
                            animation: 'pulse 1.5s infinite ease-in-out'
                        }}
                    >
                        Loading Daily Trx Count
                    </Text>

                    {/* Optional: Add CSS animation for pulse effect */}
                    <style>
                        {`
                        @keyframes pulse {
                            0% { opacity: 0.6; }
                            50% { opacity: 1; }
                            100% { opacity: 0.6; }
                        }
                        `}
                    </style>
                </Box>
            ) : (
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart
                        data={dailyTrxData}
                        margin={{ top: 20, right: 4, left: 0, bottom: 2 }}
                    >
                        <CartesianGrid strokeDasharray="2 2" />
                        <XAxis dataKey="date" />
                        <YAxis />
                        <Tooltip contentStyle={{
                            background:getColors().primary[900]
                        }} />
                        <Legend />
                        <Area
                            type="monotone"
                            dataKey="transactionsCount"
                            fill='green'
                            stroke={getColors().blueAccent[800]}
                        />
                    </AreaChart>
                </ResponsiveContainer>
            )}
        </Box>
    );
};

export default TotalTrxChart;
