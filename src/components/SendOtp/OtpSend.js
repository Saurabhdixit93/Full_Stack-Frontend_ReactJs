import axios from "axios";
import React, { useState } from "react";
import { showNotificationForLoginError, showNotificationForLoginSuccess } from "../../Notification/Notify";
import { useNavigate } from "react-router-dom";
import Loading from "../../Loader/loading";
const SendOTP = () => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [userEmail, setEmail] = useState("");

  const handleChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit =async (e) => {
    e.preventDefault();
    alert('otp sending.. ! is your email valid ?');
    setIsSubmitting(true);
    try {
      const result = await axios.post('/user/api/send-otp', userEmail);
      if (result.data.status === true) {
        showNotificationForLoginSuccess(result.data.message);
        setIsSubmitting(false);
        navigate('/verify-otp');
        setEmail('');
        return;
      } else {
        setIsSubmitting(false);
        showNotificationForLoginError(result.data.message);
        setEmail('');
        return;
      }
    } catch (error) {
      setIsSubmitting(false);
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
            {isSubmitting ? (
              <div className="loader">
                <Loading />
              </div>
            ) : (
              <button className="submit-btn" type="submit">
                Send OTP
              </button>
            )}
          </form>
        </div>
      </div>
    </>
  );
};

export default SendOTP;
