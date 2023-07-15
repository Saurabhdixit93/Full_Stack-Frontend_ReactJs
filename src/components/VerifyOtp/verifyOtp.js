import React, { useState } from "react";

const OtpVerification = () => {
  const [passwordOtp, setOtp] = useState("");
  const [userPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [userEmail, setUserEmail] = useState("");

  const handleOtpChange = (e) => {
    setOtp(e.target.value);
  };

  const handleNewPasswordChange = (e) => {
    setNewPassword(e.target.value);
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
  };

  const handleVerification = (e) => {
    e.preventDefault();
    // Add logic here to verify the OTP and handle password update

    setOtp("");
    setNewPassword("");
    setConfirmPassword("");
  };

  return (
    <>
      <div id="otp-page">
        <div className="otp-verification-container">
          <h2>OTP Verification</h2>
          <form className="input-container" onSubmit={handleVerification}>
            <input
              name="passwordOtp"
              type="text"
              maxLength={6}
              placeholder="Enter OTP"
              value={passwordOtp}
              onChange={handleOtpChange}
              required
            />
            <input
              name="userPassword"
              type="password"
              placeholder="Enter New Password"
              value={userPassword}
              onChange={handleNewPasswordChange}
              required
            />
            <input
              name="confirmPassword"
              type="password"
              placeholder="Confirm New Password"
              value={confirmPassword}
              onChange={handleConfirmPasswordChange}
              required
            />
            <input type="hidden" value={userEmail} onChange={() => {}} />
            <button className="submit-btn" type="submit">
              Verify and Update Password
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default OtpVerification;
