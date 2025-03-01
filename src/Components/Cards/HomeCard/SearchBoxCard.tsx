import { useTheme } from '@mui/material/styles';
import Search from '../../Search/search';
import Box from '../../UI/Box';

export default function TopCard() {
    const theme = useTheme();

    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                gap: "16px",
                py: "2px",
                borderRadius: "16px",
                boxShadow: "0 8px 24px rgba(0, 0, 0, 0.1)",
                width: "100%",
                margin: "0 auto",
                position: "relative",
                overflow: "hidden",
                "&:before": {
                    content: '""',
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: "url(/assets/subtle-texture.png)",
                    opacity: 0.05,
                    pointerEvents: "none"
                }
            }}
        >
            <Box
                sx={{
                    fontSize: "20px",
                    fontWeight: "bold",
                    color: theme.palette.text.primary,
                    marginBottom: "8px",
                    textAlign:"center"
                }}
            >
                The Multi- Blockchain Explorer
                    <img
                        width={40} height={40}
                        src="/logo.svg"
                        alt="Colm Tuite"
                    />
            </Box>
            {/* Header and Search Components */}
            <Search />
        </Box>
    );
}
