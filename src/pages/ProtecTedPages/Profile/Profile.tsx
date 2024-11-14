// import React from 'react'
// import { ProtectedPageProps } from '../../../interfaces/CompInterfaces';
import { useSelector } from 'react-redux'
import { selectUserType } from '../../../redux/slices/authSlice';
import CustomHeading from '../../../Components/UI/Typogrpahy/Text/Heading'
import { Link } from 'react-router-dom'
import { Pages, ProfileTab } from '../../../DataTypes/enums'
import CustomTab from '../../../Components/UI/Tabs/tabs';
import OverView from '../../../Components/Profile/OverView';
import UserActivity from '../../../Components/Profile/Activity';
import UserProfile from '../../../Components/Profile/Profile';
import Box from '../../../Components/UI/Box';

const ProfilePage= () => {
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