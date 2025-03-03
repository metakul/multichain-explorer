// import React from 'react'
// import { ProtectedPageProps } from '../../../interfaces/CompInterfaces';
import { BlockDetailsTab } from '../../../../DataTypes/enums'
import CustomTab from '../../../../Components/UI/Tabs/tabs';
import UserActivity from '../../../../Components/Profile/Activity';
import BlockOverView from './BlockOverView';
import TransactionOverView from './TransactionOverViewPage.tsx';
import { useSearchParams } from 'react-router-dom';

const SingleBlockPage = () => {

    const [searchParams] = useSearchParams();

    const defaultTab = searchParams.get('tab') || BlockDetailsTab.tabTitle1;

    const tabs = [
        { value: BlockDetailsTab.tabTitle1, content: <BlockOverView />, label: BlockDetailsTab.tabTitle1 },
        { value: BlockDetailsTab.tabTitle2, content: <TransactionOverView />, label: BlockDetailsTab.tabTitle2 },
        { value: BlockDetailsTab.tabTitle3, content: <UserActivity />, label: BlockDetailsTab.tabTitle3 },
    ];

    return (
        <>
            <>
                <CustomTab tabs={tabs} defaultTab={defaultTab} />
            </>
        </>
    )
}

export default SingleBlockPage