// components/InfoBox.tsx
import React from 'react';
import Skeleton from '@mui/material/Skeleton';
import Box from '../../UI/Box';
import Text from '../../UI/Text';
import LinearProgress from '@mui/material/LinearProgress';
import { getColors } from '../../../layout/Theme/themes';

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
}

const BlockCardInfo: React.FC<InfoBoxProps> = ({
    label,
    value,
    loading = false,
    loadingWidth = 100,
    navigateTo,
    icon,
    progressValue,
    fontSize = '14px',
    fontWeight = 'normal',
    showProgressBar = false,
}) => {
    /**
     * Renders content with a loading skeleton if data is not available.
     * @param value - The value to display.
     * @param loadingWidth - The width of the skeleton loader.
     * @returns JSX.Element
     */
    const renderContent = (value: string | number | undefined, loadingWidth: number) => {
        if (loading || value === undefined) {
            return <Text sx={{ width: loadingWidth }}><Skeleton /></Text>;
        }
        return <span>{value}</span>;
    };

    /**
     * Truncate the text if it's longer than a certain length.
     * @param text - The text to be truncated.
     * @param maxLength - The max length of text default to 12.
     * @returns string
     */

    const truncateText = (text: string | number, maxLength = 12) => {
        if (typeof text === 'string' && text.length > maxLength) {
            const firstPart = text.slice(0, 6);
            const lastPart = text.slice(-4);
            return `${firstPart}...${lastPart}`;
        }
        return text;
    };


    return (
        <Box sx={{ marginBottom: '8px' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                {icon && <span>{icon}</span>}
                {label && <strong>{label}:</strong>}
                {navigateTo ? (
                    <Text
                        sx={{
                            color: getColors().blueAccent[500],
                            fontWeight,
                            cursor: "pointer",
                            fontSize,
                            width:100
                        }}
                        onClick={() => navigateTo()}
                    >
                        {value && <>
                            {renderContent(truncateText(value), loadingWidth)}
                        </> 
                        }
                    </Text>
                ) : (
                    <Text
                        sx={{
                            fontWeight,
                            fontSize,
                            width:100
                        }}
                    >
                        {value && <>
                        {renderContent(truncateText(value), loadingWidth)}
                        </> 
                        }
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
                        marginTop: '4px',
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

export default BlockCardInfo;