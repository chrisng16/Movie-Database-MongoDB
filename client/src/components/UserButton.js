import React from "react";
import defaultAvatar from "../assets/avatar.jpeg";
import "../styles/Home.css";
import { Avatar, Button } from "@mui/material/";
import { useNavigate } from "react-router-dom";

export const UserButton = ({ user, loggedInStatus }) => {
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
      case "btnUser":
        navigate("/user");
        break;
      default:
        break;
    }
  };

  if (!loggedInStatus)
    return (
      <div className="user-button-container">
        <Button
          variant="contained"
          name="btnLogIn"
          className="default-button"
          onClick={onClickHandler}
          margin="normal"
        >
          Log In
        </Button>
        <label>or</label>
        <Button
          variant="contained"
          name="btnRegister"
          className="default-button"
          onClick={onClickHandler}
          margin="normal"
        >
          Register
        </Button>
      </div>
    );
  return (
    <div className="user-button-container">
      <button
        className="default-button user-button"
        name="btnUser"
        onClick={onClickHandler}
      >
        <Avatar src={defaultAvatar} />
        <label id="user-name-txtbox" placeholder="Avatar">
          {`Welcome Back, ${user.fname} ${user.lname}`}
        </label>
      </button>
    </div>
  );
};
