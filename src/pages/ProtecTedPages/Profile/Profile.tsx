import React from 'react'
import { ProtectedPageProps } from '../../../interfaces/CompInterfaces';
import { useSelector } from 'react-redux'
import { selectUserType } from '../../../redux/slices/authSlice';
import { Box } from '@radix-ui/themes'
import CustomHeading from '../../../Components/Typogrpahy/Text/Heading'
import { Link } from 'react-router-dom'
import { Pages, ProfileTab } from '../../../DataTypes/enums'
import CustomTab from '../../../Components/Tabs/tabs';
import OverView from '../../../Components/Profile/OverView';
import UserActivity from '../../../Components/Profile/Activity';
import UserProfile from '../../../Components/Profile/Profile';

const ProfilePage: React.FC<ProtectedPageProps> = () => {
  const selectedUserType = useSelector(selectUserType)

  const tabs = [
    { value: ProfileTab.tabTitle1, content: <OverView/>, label: ProfileTab.tabTitle1 },
    { value: ProfileTab.tabTitle2, content: <UserProfile />, label: ProfileTab.tabTitle2 },
    { value: ProfileTab.tabTitle3, content: <UserActivity />, label: ProfileTab.tabTitle3 },
  ];

  return (
    <>
      <Box style={{
        display: "flex",
        justifyContent: "center",
      }}>
        <CustomHeading>
          Hi {selectedUserType}
        </CustomHeading>
      </Box>
      <Link to={Pages.DASHBOARD}>Back To Dashboard</Link>
      <CustomTab tabs={tabs} />
    </>
  )
}

export default ProfilePage