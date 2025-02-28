// sAllBlocksPage.tsx
import React from 'react';

import Text from '../../../../Components/UI/Text';
import AllBlock from '../../../../Components/Blocks/AllBlock';

const AllBlocks: React.FC = () => {
    return (
        <div style={{
        }}>
            <Text style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '16px' }}>All Blocks Info</Text>
              <AllBlock showTrx={true}/>
        </div>
    );
};

export default AllBlocks;
