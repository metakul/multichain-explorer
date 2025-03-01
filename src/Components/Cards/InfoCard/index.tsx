// components/InfoBox.tsx
import React from 'react';
import Skeleton from '@mui/material/Skeleton';
import Box from '../../UI/Box';
import Text from '../../UI/Text';
import LinearProgress from '@mui/material/LinearProgress';
import { getColors } from '../../../layout/Theme/themes';
import { Typography } from '@mui/material';

interface InfoBoxProps {
    label?: string; // Optional label
    value: string | number | undefined; // Value to display
    loading?: boolean; // Loading state
    loadingWidth?: number; // Width of the skeleton loader
    navigateTo?: () => void; // Optional navigation path
    icon?: React.ReactNode; // Optional icon
    progressValue?: number; // Optional progress bar value
    fontSize?: string; // Optional font size
    fontWeight?: string; // Optional font weight
    showProgressBar?: boolean; // Whether to show the progress bar
    error?: string | null; // Optional error message
}

const InfoCard: React.FC<InfoBoxProps> = ({
    label,
    value,
    loading = false,
    loadingWidth = 60,
    navigateTo,
    icon,
    progressValue,
    fontSize = '14px',
    fontWeight = 'normal',
    showProgressBar = false,
    error
}) => {
    /**
     * Renders content with a loading skeleton if data is not available.
     * @param value - The value to display.
     * @param loadingWidth - The width of the skeleton loader.
     * @returns JSX.Element
     */
    const renderContent = (value: string | number | undefined, loadingWidth: number) => {
        
        const shouldShowSkeleton = loading || value === undefined || value === "#" || value === "N/A" || (label && !value);

        if (shouldShowSkeleton) {
            return <span style={{ width: loadingWidth }}><Skeleton /></span>;
        }
        return <Typography sx={{
            fontSize: { sm: "12px", md: "14px" }
        }} >{value}</Typography>;
    };

    /**
     * Truncate the text if it's longer than a certain length.
     * @param text - The text to be truncated.
     * @param maxLength - The max length of text default to 12.
     * @returns string
     */

    const truncateText = (text: string | number, maxLength = 18) => {
        if (typeof text === 'string' && text.length > maxLength) {
            const firstPart = text.slice(0, 4);
            const lastPart = text.slice(-4);
            return `${firstPart}...${lastPart}`;
        }
        return text;
    };


    return (
        <Box sx={{ marginBottom: '1px' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 0 }}>
               <Box sx={{display:"flex",m:0, p:0}}>
                {icon && <Typography sx={{
                    fontSize: { sm: "12px", md: "14px" }
                }} >{icon}</Typography>}
                {label && <Typography sx={{
                    fontSize: { sm: "12px", md: "14px" }
                }}> {label}:</Typography>}
                
               </Box>
                {navigateTo ? (
                    <Text
                        sx={{
                            color: getColors().blueAccent[500],
                            fontWeight,
                            cursor: "pointer",
                            fontSize,
                            width:80
                        }}
                        onClick={() => navigateTo()}
                    >
                         <>
                            {renderContent(value !== undefined ? truncateText(value) : value, loadingWidth)}
                        </> 
                        {error && <>
                            {error}
                        </>}
                    </Text>
                ) : (
                    <Text
                        sx={{
                            fontWeight,
                            fontSize,
                            width:80
                        }}
                    >
                         <>
                        {renderContent(value !== undefined ? truncateText(value) : value, loadingWidth)}
                        </> 
                        
                    </Text>
                )}

            </Box>
            {showProgressBar && (
                <LinearProgress
                    variant="determinate"
                    value={progressValue}
                    sx={{
                        height: '8px',
                        borderRadius: '4px',
                        marginTop: '2px',
                        backgroundColor: getColors().primary[700],
                        '& .MuiLinearProgress-bar': {
                            backgroundColor: getColors().blueAccent[400],
                        },
                    }}
                />
            )}
        </Box>
    );
};

export default InfoCard;