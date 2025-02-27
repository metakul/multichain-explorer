import React from 'react';

import Header from '../../../Components/Headers/ExplorerHeader.js';
import Search from '../../../Components/Search/search.js';
import HeroSection from '../../../Components/Cards/ExplorerCard/heroSection.js';
import AllBlock from '../../../Components/Blocks/AllBlock.js';
import Transactions from '../../../Components/Transactions/AllTrx.js';
import ExplorerStats from '../../../Components/Stats/index.js';
import { useMediaQuery } from '@mui/material';
import Box from '../../../Components/UI/Box/index.js';


//  Explorer Page
const Explorer: React.FC = () => {
  const isNonMobile = useMediaQuery("(min-width: 768px)");

  return (
    <Box sx={{
      px:isNonMobile ? 4 : 2
    }}>
      <Header />
      <Search />
      <ExplorerStats/>
      <HeroSection />
      <AllBlock />
      <Transactions/>
    </Box>
  );
};

export default Explorer;
