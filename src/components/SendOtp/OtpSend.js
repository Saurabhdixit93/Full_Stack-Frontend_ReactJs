import axios from "axios";
import React, { useState } from "react";
import { showNotificationForLoginError, showNotificationForLoginSuccess } from "../../Notification/Notify";
import { useNavigate } from "react-router-dom";

const SendOTP = () => {
  const navigate = useNavigate();
  const [userEmail, setEmail] = useState("");

  const handleChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit =async (e) => {
    e.preventDefault();
    alert('otp sending.. ! is your email valid ?');
    try {
      const result = await axios.post('/user/api/send-otp', userEmail);
      if (result.data.status === true) {
        showNotificationForLoginSuccess(result.data.message);
        navigate('/verify-otp');
        setEmail('');
        return;
      } else {
        showNotificationForLoginError(result.data.message);
        setEmail('');
        return;
      }
    } catch (error) {
      showNotificationForLoginError(error.message);
      setEmail('');
      return;
    }
  };

  return (
    <>
      <div id="otp-page">
        <div className="send-otp-container">
          <h2>Send OTP</h2>
          <p>Enter your email address to receive a One-Time Password (OTP).</p>
          <form className="input-container" onSubmit={handleSubmit}>
            <input
              type="email"
              id="email"
              name="userEmail"
              placeholder="Enter your email"
              value={userEmail}
              onChange={handleChange}
              required
            />
            <button className="submit-btn" type="submit">
              Send OTP
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default SendOTP;
