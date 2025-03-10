import Skeleton from '@mui/material/Skeleton';
import Box from '../../UI/Box';
import Text from '../../UI/Text';
import { getColors } from '../../../layout/Theme/themes';
import { Card } from '@mui/material';
import Flex from '../../UI/Flex';

const StatCard = ({ label, value, loading }: { label: string; value: string | number | null | undefined; loading: boolean }) => (
    <Card sx={{
        backgroundColor: getColors().primary[900],
        borderColor: getColors().primary[100],
        width: {
            xs: "140px",
            md: "160px",
        },
        height: {
            xs: "60px",
            md: "60px",
        },
        m: 0.5
    }}>
        <Flex>
            <Box sx={{ padding: '8px' }} >
                <Text sx={{
                    fontWeight: "bold",
                    fontSize: { xs: "12px", md: "14px" }
                }}>
                    {label}
                </Text>
                {loading || !value ? (
                    <Skeleton width="100px" height="18px" />
                ) : (
                    <Text sx={{
                        fontWeight: "",
                        fontSize: { xs: "12px", md: "14px" }
                    }}>    {value}
                    </Text>
                )}
            </Box>
        </Flex>
    </Card>
);

export default StatCard;