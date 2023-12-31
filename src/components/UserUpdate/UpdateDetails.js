import axios from "axios";
import React, { useState } from "react";
import { FaEye, FaEyeSlash  ,FaAngleLeft} from "react-icons/fa"
import { getTokenCookie } from "../../Context/CookieGet";
import { showNotificationForLoginError, showNotificationForLoginSuccess } from "../../Notification/Notify";
import { useNavigate } from "react-router-dom";
import Loading from "../../Loader/loading";
import Cookies from "js-cookie";
import usePasswordStrength from "../../Reusebale/usePasswordStrength";
const UserDetailsUpdate = () => {
  const navigate = useNavigate();
  const hadnleBack = () => {
    navigate(-1);
    return;
  };
  const user = getTokenCookie();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const { passwordStrength, isValidPassword, handlePasswordChange } = usePasswordStrength();

  const [formData, setFormData] = useState({
    userName: "",
    userEmail: "",
    userPassword: "",
    confirmPassword: "",
  });
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    alert('check all fields valid ?');
    setIsSubmitting(true);
    try {
      if (user) {
        const tokenPayload = JSON.parse(atob(user.split(".")[1]));
        const userId = tokenPayload.userId;
        try {
          const result = await axios.put(`/user/api/update-user/${userId}`,formData);
          if (result.data.status === true) {
            showNotificationForLoginSuccess(result.data.message);
            setIsSubmitting(false);
            Cookies.remove('token');
            setFormData({
              userEmail: '',
              userName: '',
              userPassword: "",
              confirmPassword: ""
            });
            navigate('/');
            window.location.reload();
            return;
          }
        } catch (error) {
          setIsSubmitting(false);
          showNotificationForLoginError(error.message);
          setFormData({
            userEmail: '',
            userName: '',
            userPassword: "",
            confirmPassword: ""
          });
          return;
        }
      }
    } catch (error) {
      setIsSubmitting(false);
      showNotificationForLoginError(error.message);
      setFormData({
        userEmail: '',
        userName: '',
        userPassword: "",
        confirmPassword: ""
      });
      return;
    }
  };

  return (
    <>
      <div id="userUpdate-page">
        <div className="user-details-update">
          <h2>Update User Details</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="userName">Username</label>
              <input
                type="text"
                id="userName"
                name="userName"
                value={formData.userName}
                onChange={handleInputChange}
                placeholder="Enter valid UserName"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="userEmail">Email</label>
              <input
                type="email"
                id="userEmail"
                name="userEmail"
                value={formData.userEmail}
                onChange={handleInputChange}
                placeholder="Enter valid Email" 
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="userPassword">Password</label>
              <input
                type="password"
                id="userPassword"
                name="userPassword"
                value={formData.userPassword}
                onChange={(event) => {
                  handleInputChange(event);
                  handlePasswordChange(event);
                }}
                className={!isValidPassword ? 'invalid' : ''}
                placeholder="Enter valid Password"
                required
              />
            </div>
            <div className={`password-strength ${!isValidPassword && 'invalid'}`}>{passwordStrength}</div>
              {!isValidPassword && <p className="password-error">Password should be min 6 digits with one special and Capital Letter</p>}
            <div className="form-group">
              <label htmlFor="confirmPassword">Confirm Password</label>
              <div className="password-input">
                <input
                  type={showPassword ? "text" : "password"}
                  id="confirmPassword"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  placeholder="Enter valid Confirm Password" 
                  required
                />

                <span
                  className={`toggle-password ${showPassword ? "show" : ""}`}
                  onClick={togglePasswordVisibility}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}{" "}
                </span>
              </div>
            </div>         
            {isSubmitting ? (
              <div className="loader">
                <Loading />
              </div>
            ) : (
               <button type="submit">Update</button>
            )}
          </form>
          <div className="back-page">
            <button className="back-button-icon" onClick={hadnleBack} > <FaAngleLeft/> </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserDetailsUpdate;

