import React from 'react';

import Header from '../../../Components/Headers/ExplorerHeader.js';
// import HeroSection from "../components/heroSection.js";
import Search from '../../../Components/Search/search.js';


//  Explorer Page
const Explorer: React.FC = () => {
  return (
    <div>
      <h3>The Ethereum Blockchain Explorer</h3>

      <section >
        <Header />
        <Search />
        {/* <HeroSection /> */}
      </section>
    </div>
  );
};

export default Explorer;
