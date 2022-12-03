import React from "react";
import defaultAvatar from "../assets/avatar.jpeg";
import "../styles/Home.css";
import Avatar from "@mui/material/Avatar";
import { useNavigate } from "react-router-dom";
import { IconButton } from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";

export const UserButton = ({ user, setUser, loggedInStatus, setLoggedInStatus }) => {
  let navigate = useNavigate();

  const onClickHandler = (e) => {
    console.log(e.target.name);
    switch (e.target.name) {
      case "btnLogIn":
        navigate("/login");
        break;
      case "btnRegister":
        navigate("/register");
        break;
      default:
        break;
    }
  };

  const onLogOut = () => {
    setUser(null)
    setLoggedInStatus(false)
    console.log(loggedInStatus)
  }

  if (!loggedInStatus)
    return (
      <div className="user-button-container">
        <button
          name="btnLogIn"
          className="default-button"
          onClick={onClickHandler}
        >
          Log In
        </button>

        <label>or</label>
        <button
          name="btnRegister"
          className="default-button"
          onClick={onClickHandler}
        >
          Register
        </button>
      </div>
    );
  return (
    <div className="user-button-container">
      <button className="default-button user-button">
        <Avatar src={defaultAvatar} />
        <label id="user-name-txtbox" placeholder="Avatar">
          {`Welcome Back, ${user.fname} ${user.lname}`}
        </label>
      </button>
      <IconButton aria-label="logout" onClick={onLogOut}>
        <LogoutIcon />
      </IconButton>
    </div>
  );
};
