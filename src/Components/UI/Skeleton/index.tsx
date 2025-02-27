import { Box } from '@mui/material';
import { getColors } from '../../../layout/Theme/themes';

const SkeletonBox = ({ width, height }: { width: string; height: string }) => (
    <Box style={{ width, height, backgroundColor: getColors().primary[900],borderColor:getColors().primary[100],border:"1px dashed", borderRadius: '6px', margin: '4px 0' }} />
);

export default SkeletonBox;
