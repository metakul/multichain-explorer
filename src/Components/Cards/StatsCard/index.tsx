import Skeleton from '@mui/material/Skeleton';
import Box from '../../UI/Box';
import Text from '../../UI/Text';
import { getColors } from '../../../layout/Theme/themes';
import { Card } from '@mui/material';
import Flex from '../../UI/Flex';



const StatCard = ({ label, value, loading }: { label: string; value: string | number | null | undefined; loading: boolean }) => (
    <Card sx={{
        backgroundColor: getColors().primary[900],
        borderRadius: '8px',
        border: "1px solid",
        marginBottom: "2px",
        borderColor: getColors().primary[100],
        maxWidth: "200px",
        maxHeight: "100px"

    }}>  {/* Force re-render to trigger animation */}
        <Flex>
            <Box
                sx={{ padding: '8px' }}
            >
                <Text sx={{
                    fontWeight: "bold",
                    fontSize: { xs: "12px", md: "14px" }
                }}>
                    {label}
                </Text>
                {loading ? (
                    <Skeleton width="120px" height="18px" />
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