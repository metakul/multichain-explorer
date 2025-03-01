import StatCard from '../Cards/StatsCard';
import { Grid2, Typography, useMediaQuery } from '@mui/material';
import Box from '../UI/Box';
import { getColors } from '../../layout/Theme/themes';

interface StatsGridProps {
    stats: any;
    loading: boolean;
    isNonMobile: boolean;
}

function StatsGrid({ stats, loading }: StatsGridProps) {
    const showCard = useMediaQuery("(min-width: 1600px)");

    return (
        <Box sx={{
            borderRadius: "12px",
            py:2,
            px:1,
            mr:2,
            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
        }}>

        <Grid2 container spacing={0} sx={{
            display: "flex",
            justifyContent:"center"
        }}>
            <Grid2 >
            <StatCard label="Total Blocks" value={stats?.totalBlocks} loading={loading} />
            </Grid2>
            <Grid2>
            <StatCard label="Total Addresses" value={stats?.totalAddresses} loading={loading} />
            </Grid2>
            <Grid2>
            <StatCard label="Trx Today" value={stats?.transactionsToday} loading={loading} />
            </Grid2>
            <Grid2>
            <StatCard label="Gas Used Today" value={stats?.gasUsedToday} loading={loading} />
            </Grid2>
            <Grid2>
            <StatCard label="Average Gas" value={stats?.gasPrices?.average} loading={loading} />
            </Grid2>
            <Grid2>
            <StatCard label="Fast Gas Price" value={stats?.gasPrices?.fast} loading={loading} />
            </Grid2>
        </Grid2>

        {showCard && 
        <Box sx={{
            width:"100%",
            height:"80px",
            mt:4,
            background:getColors().redAccent[800]
        }}>
           <Typography>
                This is a test for ads
           </Typography>
        </Box>
        }
        </Box>


    );
}

export default StatsGrid;
