import { useEffect } from 'react';
import { AppDispatch } from '../../redux/store';
import { useDispatch, useSelector } from 'react-redux';
import { selectStatsInfo, selectStatsLoading, selectStatsError } from '../../redux/slices/BackendSlices/Explorer/ExplorerStatsSlice';
import { fetchExplorerStats } from '../../redux/slices/BackendSlices/Explorer/ExplorerApiSlice';
import { setExplorerStats } from '../../redux/slices/BackendSlices/Explorer/ExplorerStatsSlice';
import { useRpc } from '../../contexts/RpcProviderContext';
import Box from '../UI/Box';
import Text from '../UI/Text';
import Grid from '../UI/Grid';
import StatCard from '../Cards/StatsCard';
import { Card, CardActionArea, CardContent, CardMedia, Typography, useMediaQuery } from '@mui/material';
import { getColors } from '../../layout/Theme/themes';

function ExplorerStats() {
    const dispatch = useDispatch<AppDispatch>();
    const { rpcUrl } = useRpc();
    const isNonMobile = useMediaQuery("(min-width: 768px)");

    const stats = useSelector(selectStatsInfo);
    const loading = useSelector(selectStatsLoading);
    const error = useSelector(selectStatsError);


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
        <Box style={{ margin: "auto" }}>

            <Text style={{ fontSize: "24px", fontWeight: "bold", }}> Explorer Stats Info </Text>
            {error && <Box style={{ margin: "auto", marginTop: "" }}>
                <p>Error loading stats</p>
            </Box>
            }
            <Box sx={{
                display: "flex",
                justifyContent: "space-between",
                flexDirection: isNonMobile ? "row" : "column"
            }}>
                <Grid columns={isNonMobile ? 2 : 3} sx={{
                    display: "flex",
                    xs: "row",   // Small screens (xs) and below: column layout
                    width: "100%",
                }}>

                    <StatCard label="Total Blocks" value={stats?.totalBlocks} loading={loading} />
                    <StatCard label="Total Addresses" value={stats?.totalAddresses} loading={loading} />
                    {/* <StatCard label="Total Trx" value={stats?.totalTransactions} /> */}
                    {/* <StatCard label="Average Block Time" value={`${stats?.averageBlockTime} s`} /> */}
                    <StatCard label="Total Gas Used" value={stats?.totalGasUsed} loading={loading} />
                    <StatCard label="Trx Today" value={stats?.transactionsToday} loading={loading} />
                    <StatCard label="Gas Used Today" value={stats?.gasUsedToday} loading={loading} />
                    <StatCard label="Average Gas Price" value={stats?.gasPrices?.average} loading={loading} />
                    <StatCard label="Fast Gas Price" value={stats?.gasPrices?.fast} loading={loading} />
                    {/* <StatCard label="Slow Gas Price" value={stats?.gasPrices?.slow} /> */}
                    <StatCard label="Static Gas Price" value={stats?.staticGasPrice} loading={loading} />
                    {/* <StatCard label="Network Utilization" value={`${stats?.networkUtilizationPercentage}%`} /> */}
                </Grid>
                <Box sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    flexDirection: "row"
                }}>
                    <Card sx={{ width: 220, background: getColors().primary[900] }}>
                        <CardActionArea>
                            <CardMedia
                                component="img"
                                height="140"
                                image="/logo.svg"
                                alt="green iguana"
                            />
                            <CardContent>
                                <Typography gutterBottom variant="h5" component="div">
                                    Lizard
                                </Typography>

                            </CardContent>
                        </CardActionArea>
                    </Card>
                    <Card sx={{
                        display: {
                            xs: "none",    // flex on extra small screens
                            sm: "none",    // hide on small screens
                            md: "none",    // hide on medium screens
                            lg: "flex",    // hide on lg
                            xl: "flex"     // hide as flex on large screens and up
                        }, width: 220, background: getColors().primary[900]
                    }}>
                        <CardActionArea>
                            <CardMedia
                                component="img"
                                height="140"
                                image="/logo.svg"
                                alt="green iguana"
                            />
                            <CardContent>
                                <Typography gutterBottom variant="h5" component="div">
                                    Lizard
                                </Typography>

                            </CardContent>
                        </CardActionArea>
                    </Card>
                    <Card sx={{ width: 220, background: getColors().primary[900] }}>
                        <CardActionArea>
                            <CardMedia
                                component="img"
                                height="140"
                                image="/logo.svg"
                                alt="green iguana"
                            />
                            <CardContent>
                                <Typography gutterBottom variant="h5" component="div">
                                    Lizard
                                </Typography>

                            </CardContent>
                        </CardActionArea>
                    </Card>
                    <Card sx={{
                        display: {
                            xs: "flex",    // flex on extra small screens
                            sm: "none",    // flex on small screens
                            md: "none",    // hide on medium screens
                            lg: "none",    // hide on lg
                            xl: "flex"     // hide as flex on large screens and up
                        }, width: 220, background: getColors().primary[900]
                    }}>
                        <CardActionArea>
                            <CardMedia
                                component="img"
                                height="140"
                                image="/logo.svg"
                                alt="green iguana"
                            />
                            <CardContent>
                                <Typography gutterBottom variant="h5" component="div">
                                    Lizard
                                </Typography>

                            </CardContent>
                        </CardActionArea>
                    </Card>

                </Box>
            </Box>
        </Box>

    );
}

export default ExplorerStats;
