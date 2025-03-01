import GasPriceChart from '../Charts/GasPriceChart';
import Box from '../UI/Box';

interface ChartGridProps {
    gasPriceData: { time: string; price: number }[];
}

function ChartGrid({ gasPriceData }: ChartGridProps) {
    return (
        <Box
            sx={{
                py:2,
                px:1,
                mt:2,
                display: "flex",
                width: "100%",
                maxWidth:"768px",
                justifyContent:"center",
                borderRadius: "12px",
                boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
            }}
        >
            <GasPriceChart gasPriceData={gasPriceData} />
            {/* <GasPriceChart gasPriceData={gasPriceData} /> */}
            {/* <GasPriceChart gasPriceData={gasPriceData} /> */}
            <GasPriceChart gasPriceData={gasPriceData} />
        </Box>
    );
}

export default ChartGrid;
