import axios from "axios";
import React, { useState } from "react";
import { showNotificationForLoginError, showNotificationForLoginSuccess } from "../../Notification/Notify";
import { useNavigate } from "react-router-dom";
import Loading from "../../Loader/loading";
const OtpVerification = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    passwordOtp: "",
    userEmail: "",
    userPassword: "",
    confirmPassword: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleVerification = async (e) => {
    e.preventDefault();
    alert('check carefully all field are valid ?');
    setIsSubmitting(true);
    try {
      const result = await axios.post('/user/api/verify-otp', formData);
      if (result.data.status === true) {
        setIsSubmitting(false);
        showNotificationForLoginSuccess(result.data.message);
        setFormData({
          userEmail: '',
          passwordOtp: '',
          userPassword: "",
          confirmPassword: ""
        });
        navigate('/login');
        return;
      } else {
        setIsSubmitting(false);
        showNotificationForLoginError(result.data.message);
        setFormData({
          userEmail: '',
          passwordOtp: '',
          userPassword: "",
          confirmPassword: ""
        });
        return;
      }
    } catch (error) {
      setFormData({
        userEmail: '',
        passwordOtp: '',
        userPassword: "",
        confirmPassword: ""
      });
      setIsSubmitting(false);
      showNotificationForLoginError(error.message);
      return;
    }
  };

  return (
    <>
      <div id="otp-page">
        <div className="otp-verification-container">
          <h2>OTP Verification</h2>
          <form className="input-container" onSubmit={handleVerification}>
            <input 
             name="userEmail"
             type="email"
             value={formData.userEmail} 
             placeholder="Enter Your Email"
             onChange={handleInputChange} 
             required

            />
            <input
              name="passwordOtp"
              type="text"
              maxLength={6}
              placeholder="Enter OTP"
              value={formData.passwordOtp}
              onChange={handleInputChange}
              required
            />
            <input
              name="userPassword"
              type="password"
              placeholder="Enter New Password"
              value={formData.userPassword}
              onChange={handleInputChange}
              required
            />
            <input
              name="confirmPassword"
              type="password"
              placeholder="Confirm New Password"
              value={formData.confirmPassword}
              onChange={handleInputChange}
              required
            />
            {isSubmitting ? (
              <div className="loader">
                <Loading />
              </div>
            ) : (
              <button className="submit-btn" type="submit">
                Verify and Update Password
              </button>
            )}
          </form>
        </div>
      </div>
    </>
  );
};

export default OtpVerification;
