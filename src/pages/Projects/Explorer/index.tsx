import React from 'react';

import Header from '../../../Components/Headers/ExplorerHeader.js';
import Search from '../../../Components/Search/search.js';
import HeroSection from '../../../Components/Cards/ExplorerCard/heroSection.js';


//  Explorer Page
const Explorer: React.FC = () => {
  return (
    <div>
        <Header />
        <Search />
        <HeroSection />
    </div>
  );
};

export default Explorer;
