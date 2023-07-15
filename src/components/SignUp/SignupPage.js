import React, { useState } from "react";
import {
  FaUser,
  FaEye,
  FaEyeSlash,
  FaLock,
  FaEnvelopeOpenText,
} from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import {
  showNotificationForRegisterError,
  showNotificationForRegisterSuccess,
} from "../../Notification/Notify";
import Loading from "../../Loader/loading";
// const SignupUrl = process.env.REACT_APP_SIGNUP_API;
const SignupPage = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    userName: "",
    userEmail: "",
    userPassword: "",
    confirmPassword: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleTogglePassword = () => {
    setShowPassword((prevState) => !prevState);
  };
  axios.defaults.baseURL = process.env.REACT_APP_BASE_URL;
  const HandleRegister = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    await axios
      .post("/user/signup", formData, {
        withCredentials: true,
      })
      .then((result) => {
        if (result.data.status === true) {
          setIsSubmitting(false);
          showNotificationForRegisterSuccess(result.data.message);
          navigate("/login");
          return;
        } else {
          setIsSubmitting(false);
          showNotificationForRegisterError(result.data.message);
          setFormData({
            userName: "",
            userEmail: "",
            userPassword: "",
            confirmPassword: "",
          });
          return;
        }
      })
      .catch((error) => {
        setIsSubmitting(false);
        showNotificationForRegisterError(error.message);
        setFormData({
          userName: "",
          userEmail: "",
          userPassword: "",
          confirmPassword: "",
        });
        return;
      });
  };
  return (
    <>
      {" "}
      <div id="SignUp-Page">
        {" "}
        <div className="signup-form">
          <h2>Create an Account</h2>         {" "}
          <form onSubmit={HandleRegister}>
            {" "}
            <div className="form-group">
              {" "}
              <label htmlFor="userName">
                <FaUser /> Username              {" "}
              </label>{" "}
              <input
                type="text"
                id="userName"
                name="userName"
                value={formData.userName}
                onChange={handleInputChange}
                required
              />{" "}
            </div>{" "}
            <div className="form-group">
              {" "}
              <label htmlFor="userEmail">
                <FaEnvelopeOpenText /> Email              {" "}
              </label>{" "}
              <input
                type="text"
                id="userEmail"
                name="userEmail"
                value={formData.userEmail}
                onChange={handleInputChange}
                required
              />{" "}
            </div>{" "}
            <div className="form-group">
              {" "}
              <label htmlFor="password">
                <FaLock /> Password              {" "}
              </label>{" "}
              <div className="password-input">
                {" "}
                <input
                  type={"password"}
                  id="password"
                  name="userPassword"
                  value={formData.userPassword}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>
            <div className="form-group">
              {" "}
              <label htmlFor="confirmPassword">
                <FaLock /> Re-Password
              </label>
              <div className="password-input">
                {" "}
                <input
                  type={showPassword ? "text" : "password"}
                  id="confirmPassword"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  required
                />
                <span
                  className={`password-toggle ${showPassword ? "show" : ""}`}
                  onClick={handleTogglePassword}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}{" "}
                </span>
              </div>{" "}
            </div>{" "}
            {isSubmitting ? (
              <div className="loader">
                <Loading />             {" "}
              </div>
            ) : (
              <button type="submit">Register</button>
            )}{" "}
          </form>{" "}
          <div className="line">
            <span>Or</span>
          </div>{" "}
          <div className="form-group">
            {" "}
            <Link className="ToPath" to={"/login"}>
              Login
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignupPage;
