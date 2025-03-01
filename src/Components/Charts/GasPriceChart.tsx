import { useMediaQuery } from '@mui/material';
import React from 'react';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import Text from '../UI/Text';
import { getColors } from '../../layout/Theme/themes';
import Box from '../UI/Box';

interface GasPricePoint {
    time: string;
    price: number;
}

interface Props {
    gasPriceData: GasPricePoint[];
}

const GasPriceChart: React.FC<Props> = ({ gasPriceData }) => {
    const isNonMobile = useMediaQuery("(min-width: 768px)");

    const chartWidth = isNonMobile ? 350 : 230;
    const chartHeight = isNonMobile ? 300 : 250;

    return (
        <Box sx={{ width: chartWidth, height: chartHeight }}>
            {gasPriceData.length === 0 ? (
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
                        Loading Gas Price Data...
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
                    <LineChart
                        data={gasPriceData}
                        margin={{ top: 20, right: 4, left: 0, bottom: 2 }}
                    >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="time" />
                        <YAxis />
                        <Tooltip contentStyle={{
                            background:getColors().primary[900]
                        }} />
                        <Legend />
                        <Line
                            type="monotone"
                            dataKey="price"
                            stroke={getColors().blueAccent[100]}
                        />
                    </LineChart>
                </ResponsiveContainer>
            )}
        </Box>
    );
};

export default GasPriceChart;
