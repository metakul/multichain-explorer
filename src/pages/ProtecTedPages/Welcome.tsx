import React from 'react'
import { ProtectedPageProps } from '../../interfaces/CompInterfaces'
import { useSelector, useDispatch } from 'react-redux'
import { logout } from '../../redux/slices/authSlice'
import { AppDispatch } from '../../redux/store'
import { /*selectUser,*/ selectUserType } from '../../redux/slices/authSlice';
import CustomHeading from '../../Components/UI/Typogrpahy/Text/Heading'
import { Link } from 'react-router-dom'
import { Pages } from '../../DataTypes/enums'
import VerificationData from '../Projects/ProfilePage/MyContracts'
import Container from '../../Components/UI/Container'
import Button from '../../Components/UI/Button'
const ProtectedPage: React.FC<ProtectedPageProps> = (props) => {
  // const selectedUser = useSelector(selectUser)
  const selectedUserType = useSelector(selectUserType)
  const dispatch = useDispatch();

  const handleLogout = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      // Dispatch the login action with correct action type
      (dispatch as AppDispatch)(logout());
    } catch (error) {
      console.error('Error Calling Dispatch', error);
    }
  };

  return (
    <Container>
      {props.pageTitle}. {props.pageDescription}
      <CustomHeading style={{ fontSize: '24px' }}>
        Hi {selectedUserType} this is dashboard
      </CustomHeading>
      <Link to={Pages.PROFILE}>Profile</Link>


      {selectedUserType === "ROOT_ADMIN" && (
        <div>
          <VerificationData pageTitle={`Verification by ${selectedUserType}`} userType={selectedUserType}/>
        </div>
      )}

      <Button onClick={handleLogout}>
        Logout
      </Button>
    </Container>
  )
}

export default ProtectedPage