import { Typography } from '@mui/material';
import GasPriceChart, { GasPricePoint } from '../Charts/GasPriceChart';
import TotalTrxChart, { TrxChartInfo } from '../Charts/TotalTrxChart';
import Box from '../UI/Box';

interface ChartGridProps {
    gasPriceData:GasPricePoint[];
    dailyTrxData:TrxChartInfo[]
}

function ChartGrid({ gasPriceData,dailyTrxData }: ChartGridProps) {
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
                <TotalTrxChart dailyTrxData={dailyTrxData} />
            </Box>
            <Typography variant='h6' sx={{
                 textDecoration: "underline",
                 textAlign:"center"
            }}>
                Average Gas Price (in Wei)
            </Typography>
        </Box>
    );
}

export default ChartGrid;
