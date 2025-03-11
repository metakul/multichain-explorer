// sAllBlocksPage.tsx
import React from 'react';

import AllBlock from '../../../../Components/Blocks/AllBlock';
import Box from '../../../../Components/UI/Box';
import { useMediaQuery } from '@mui/material';

const AllBlocksPage: React.FC = () => {
  const isNonMobile = useMediaQuery("(min-width: 768px)");

    return (
        <Box sx={{
            px: isNonMobile ? 4 : 2
        }}>
              <AllBlock showTrx={true}/>
        </Box>
    );
};

export default AllBlocksPage;
