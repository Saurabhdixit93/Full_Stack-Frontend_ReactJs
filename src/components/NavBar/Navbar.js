import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faTimes } from "@fortawesome/free-solid-svg-icons";
import { getTokenCookie } from "../../Context/CookieGet";
const Navbar = () => {
  const user = getTokenCookie();
  let userName = ""; // Initialize with an empty string
  let userEmail = "";
  if (user) {
    const tokenPayload = JSON.parse(atob(user.split(".")[1]));
    userName = tokenPayload.userName; // Assign the value to userName
    userEmail = tokenPayload.userEmail;
  }

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  return (
    <div>
      <span className="background"></span>{" "}
      <div className="menu__wrapper">
        {" "}
        <div className="menu__bar">
          {" "}
          <a href="/" title="Logo">
            {" "}
            <img
              className="logo"
              src={"https://img.icons8.com/nolan/96/bluestacksx.png"}
              title="Logo"
              alt="Logo"
            />{" "}
          </a>{" "}
          <FontAwesomeIcon
            className="menu-icon"
            icon={isMenuOpen ? faTimes : faBars}
            title={isMenuOpen ? "Close Menu" : "Burger Menu"}
            onClick={toggleMenu}
          />{" "}
          <menu
            className={`navigation ${isMenuOpen ? "navigation--mobile" : ""}`}
          >
            {" "}
            {user && (
              <>
                <li>{userName}</li> <li>{userEmail}</li> {" "}
              </>
            )}
            <li>About</li>
            <li>Contact Us</li>{" "}
          </menu>{" "}
        </div>{" "}
      </div>{" "}
    </div>
  );
};

export default Navbar;
