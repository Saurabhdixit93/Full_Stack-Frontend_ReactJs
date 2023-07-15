import React, { useState } from "react";

const SendOTP = () => {
  const [email, setEmail] = useState("");

  const handleChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add logic here to send the OTP and handle the confirmation
    setEmail("");
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
              placeholder="Enter your email"
              value={email}
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
