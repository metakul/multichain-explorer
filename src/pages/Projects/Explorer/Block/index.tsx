// import React from 'react'
// import { ProtectedPageProps } from '../../../interfaces/CompInterfaces';
import { BlockDetailsTab, ProfileTab } from '../../../../DataTypes/enums'
import CustomTab from '../../../../Components/UI/Tabs/tabs';
import UserActivity from '../../../../Components/Profile/Activity';
import UserProfile from '../../../../Components/Profile/Profile';
import BlockOverView from './BlockOverViewPage';

const BlockOverViewPage = () => {

    const tabs = [
        { value: BlockDetailsTab.tabTitle1, content: <BlockOverView />, label: ProfileTab.tabTitle1 },
        { value: BlockDetailsTab.tabTitle2, content: <UserProfile />, label: ProfileTab.tabTitle2 },
        { value: BlockDetailsTab.tabTitle3, content: <UserActivity />, label: ProfileTab.tabTitle3 },
    ];

    return (
        <>
            <CustomTab tabs={tabs} />
        </>
    )
}

export default BlockOverViewPage