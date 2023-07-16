import React from "react";
import { useNavigate } from "react-router-dom";
import { getTokenCookie } from "../../Context/CookieGet";
import {
  showNotificationForLoginError,
  showNotificationForLogoutSuccess,
} from "../../Notification/Notify";
import Cookies from "js-cookie";
import axios from "axios";
const HomePage = () => {
  // const user = localStorage.getItem("token");
  const navigate = useNavigate();
  const user = getTokenCookie();
  let userName = ""; // Initialize with an empty string
  let userEmail = "";

  if (user) {
    const tokenPayload = JSON.parse(atob(user.split(".")[1]));
    userName = tokenPayload.userName; // Assign the value to userName
    userEmail = tokenPayload.userEmail;
  }
  const handleDeleteAccount = async(e) => {
    e.preventDefault();
    alert('Are you sure to delete');
    try {
      if (user) { 
        const tokenPayload = JSON.parse(atob(user.split(".")[1]));
        const userId = tokenPayload.userId;
        try {
          const result = await axios.delete(`/user/api/delete-user/${userId}`);
          if (result.data.status === true) {
            Cookies.remove("token");
            showNotificationForLogoutSuccess(result.data.message);
            navigate('/');
            return;
          } else {
            showNotificationForLoginError(result.data.message);
            return;
          }
        } catch (error) {
          showNotificationForLoginError(error.message);
          return;
        }     
      }
    } catch (error) {
      showNotificationForLoginError(error.message);
      return;
    }
  }

  const handleLogout = async (e) => {
    alert('Are you sure to logout');
    try {
      if (user) {
        Cookies.remove("token");
        showNotificationForLogoutSuccess("Logout Successfull");
        navigate("/");
        window.location.reload();
        return;
      }
    } catch (error) {
      showNotificationForLoginError(error.message);
      return;
    }
  };
  return (
    <>
      {" "}
      <div id="Home_page">
        {" "}
        <div className="container">
          {" "}
          <div className="profile-card">
            <h1 className="welcome-message">Welcome to User Authentication</h1>{" "}
            {user && (
              <>
                {" "}
                <div className="profile-info">
                  <h2 className="name">{userName}</h2>
                  <p className="email">{userEmail}</p>{" "}
                </div>{" "}
                <button className="logout-button" onClick={handleLogout}>
                  Logout{" "}
                </button>{" "}
                <br/>
                <button id="delete" className="logout-button" onClick={handleDeleteAccount}>
                  Delete account
                </button>
              </>
            )}{" "}
          </div>{" "}
        </div>{" "}
      </div>{" "}
    </>
  );
};

export default HomePage;
