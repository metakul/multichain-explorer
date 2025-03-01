import { Typography } from '@mui/material';
import GasPriceChart from '../Charts/GasPriceChart';
import Box from '../UI/Box';

interface ChartGridProps {
    gasPriceData: { time: string; price: number }[];
}

function ChartGrid({ gasPriceData }: ChartGridProps) {
    return (
        <Box sx={{
            display:"flex",
            justifyContent:"center",
            flexDirection:"column",
            py: 2,
            px: 1,
            mt: 2,
            width: "100%",
            maxWidth: "768px",
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
                <GasPriceChart gasPriceData={gasPriceData} />
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
