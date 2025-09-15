import { useMediaQuery } from '@mui/material';
import React from 'react';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import Text from '../UI/Text';
import { getColors } from '../../layout/Theme/themes';
import Box from '../UI/Box';

export interface GasPricePoint {
    time: string;
    slowGasPrice: number;
    averageGasPrice: number;
    fastGasPrice: number;
}

interface Props {
    gasPriceData: GasPricePoint[];
}

const GasPriceChart: React.FC<Props> = ({ gasPriceData }) => {
    const isNonMobile = useMediaQuery("(min-width: 768px)");

    const chartWidth = isNonMobile ? 350 : 230;
    const chartHeight = isNonMobile ? 300 : 250;
  const colors = getColors();

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
                        backgroundColor: colors.grey[800],
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
                        Loading Gas Price Charts
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
                        data={gasPriceData}
                        margin={{ top: 20, right: 4, left: 0, bottom: 2 }}
                    >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="time" />
                        <YAxis />
                        <Tooltip contentStyle={{
                            background: colors.primary[900]
                        }} />
                        <Legend />
                        <Area
                            type="monotone"
                            dataKey="slowGasPrice"
                            stackId="1"
                            stroke={colors.blueAccent[100]}
                            fill={colors.blueAccent[100]}
                        />
                        <Area
                            type="monotone"
                            dataKey="averageGasPrice"
                            stackId="1"
                            stroke={colors.greenAccent[100]}
                            fill={colors.greenAccent[100]}
                        />
                        <Area
                            type="monotone"
                            dataKey="fastGasPrice"
                            stackId="1"
                            stroke={colors.redAccent[100]}
                            fill={colors.redAccent[100]}
                        />
                    </AreaChart>
                </ResponsiveContainer>
            )}
        </Box>
    );
};

export default GasPriceChart;