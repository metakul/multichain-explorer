import React from 'react';

import AllBlock from '../../../Components/Blocks/AllBlock.js';
import Transactions from '../../../Components/Transactions/AllTrx.js';
import ExplorerStats from '../../../Components/Stats/index.js';
import { useMediaQuery } from '@mui/material';
import Box from '../../../Components/UI/Box/index.js';
import TopCard from '../../../Components/Cards/HomeCard/SearchBoxCard.js';

//  Explorer Page
const Explorer: React.FC = () => {
  const isNonMobile = useMediaQuery("(min-width: 768px)");

  return (
    <Box sx={{
      px: isNonMobile ? 4 : 2
    }}>
      <TopCard/>
      <ExplorerStats />
    
      <AllBlock showTrx={false} />
      <Transactions />
    </Box>
  );
};

export default Explorer;
