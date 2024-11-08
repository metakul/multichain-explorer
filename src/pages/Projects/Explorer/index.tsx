import React from 'react';

import Header from '../../../Components/Headers/ExplorerHeader.js';
import Search from '../../../Components/Search/search.js';
import HeroSection from '../../../Components/Cards/ExplorerCard/heroSection.js';
import AllBlock from '../../../Components/Blocks/AllBlock.js';
import Transactions from '../../../Components/Transactions/AllTrx.js';
import ExplorerStats from '../../../Components/Stats/index.js';


//  Explorer Page
const Explorer: React.FC = () => {
  return (
    <div>
      <Header />
      <Search />
      <ExplorerStats/>
      <HeroSection />
      <AllBlock />
      <Transactions/>
    </div>
  );
};

export default Explorer;
