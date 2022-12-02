import React from "react";
import defaultAvatar from "../assets/avatar.jpeg";
import "../styles/Home.css";
import Avatar from "@mui/material/Avatar";
import { useNavigate } from "react-router-dom";

export const UserButton = ({ loggedInStatus }) => {
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
          Avatar
        </label>
      </button>
    </div>
  );
};
