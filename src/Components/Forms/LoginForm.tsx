import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser, loginVerifyUser, resendOtpLogin } from '../../redux/slices/authApiSlice';
import { LoginData, VerifyLoginData } from '../../interfaces/interface';
import { AppDispatch } from '../../redux/store';
import CustomHeading from '../UI/Typogrpahy/Text/Heading';
import CustomTextField from '../UI/Typogrpahy/Text/TextFeild';
import { LoginFormProps } from '../../interfaces/CompInterfaces';
import { LoginButtonText } from '../../DataTypes/constText';
import DependentSignUpForm from './SignUp/Applicants/Dependent';
import { Pages, UserType } from '../../DataTypes/enums';
import { selectTrxId, selectUser } from '../../redux/slices/authSlice';
import { Link } from 'react-router-dom';

const LoginForm: React.FC<LoginFormProps> = (props) => {
  const dispatch = useDispatch();
  const selectedUser = useSelector(selectUser)
  const trxId = useSelector(selectTrxId)

  const [user, setuser] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [otp, setOtp] = useState<string>('');
  const [showOtpField, setShowOtpField] = useState<boolean>(false);
  const [showSignUpForm, setShowSignUpForm] = useState<boolean>(false)

  const handleLoginSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

      const loginData: LoginData = {
        userId: user,
        password: password,
        userType: props.userType,
      };

      (dispatch as AppDispatch)(loginUser(loginData));
      setShowOtpField(true);
   
  };

  const handleVerifyOtpSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

      const verifyLoginData: VerifyLoginData = {
        trxId,
        otp: otp,
      };

      // Dispatch loginVerifyUser action
      (dispatch as AppDispatch)(loginVerifyUser(verifyLoginData));
 
  };

  const handleResendOtp = async () => {
    (dispatch as AppDispatch)(resendOtpLogin({ trxId: props.userType }));
  };

  const handleSignUpForm = async () => {
    setShowSignUpForm(!showSignUpForm)
  }

  const renderSignUpFormBasedOnUserType = () => {
    switch (props.userType as UserType) {
      case props.userType:
        return <DependentSignUpForm userType={props.userType} isSignnFormOpen={showSignUpForm} handleSignUpForm={handleSignUpForm} />
      default:
        return <DependentSignUpForm userType={UserType.RANDOM} isSignnFormOpen={showSignUpForm} handleSignUpForm={handleSignUpForm} />
    }
  }

  return (
    <>
      {!selectedUser ? (
        <>
          {!showSignUpForm &&
            <>
              <form onSubmit={showOtpField ? handleVerifyOtpSubmit : handleLoginSubmit}>
                <CustomHeading placeholder="Login Form" style={{ fontSize: '24px' }}>
                  {props.loginTitle}
                </CustomHeading>

                <CustomTextField
                  className="usernameLogin"
                  label="Username"
                  placeholder="Enter your username"
                  value={user}
                  onChange={(value: React.SetStateAction<string>) => setuser(value)}
                />

                <CustomTextField
                  className="loginPassword"
                  label="Password"
                  placeholder="Enter your password"
                  type="password"
                  value={password}
                  onChange={(value: React.SetStateAction<string>) => setPassword(value)}
                />

                {showOtpField && (
                  <CustomTextField
                    className="loginOtp"
                    label="OTP"
                    placeholder="Enter OTP"
                    type="text"
                    value={otp}
                    onChange={(value: React.SetStateAction<string>) => setOtp(value)}
                  />
                )}

                <div>
                  <button type="submit" className={`${showOtpField ? "verifyOtp" : "sendOtp"}`}>
                    {showOtpField ? LoginButtonText.VERIFY_OTP : LoginButtonText.SEND_OTP}
                  </button>

                  {showOtpField && (
                    <button type="button" onClick={handleResendOtp}>
                      {LoginButtonText.RESEND_OTP}
                    </button>
                  )}
                </div>
              </form>

              <button type="button" onClick={handleSignUpForm}>
                SIGNUP
              </button>

            </>

          }
          {showSignUpForm && (
            <div>
              {renderSignUpFormBasedOnUserType()}

              <button type="button" onClick={handleSignUpForm}>
                SIGNIN
              </button>
            </div>
          )}
        </>
      ) : (
        <>
          <CustomHeading style={{
            fontSize: "18px"
          }}>
            Already Logged In. Visit the
          </CustomHeading>
          <Link to={Pages.DASHBOARD}>
            DASHBOARD
          </Link>
        </>
      )}
    </>

  );
};

export default LoginForm;
