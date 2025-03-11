// sAllBlocksPage.tsx
import React from 'react';

import AllBlock from '../../../../Components/Blocks/AllBlock';
import Box from '../../../../Components/UI/Box';

const AllBlocksPage: React.FC = () => {
    return (
        <Box style={{
        }}>
              <AllBlock showTrx={true}/>
        </Box>
    );
};

export default AllBlocksPage;
