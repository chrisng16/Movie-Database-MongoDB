import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import Avatar from "@mui/material/Avatar";
import logo from "../assets/logo.png";
import defaultAvatar from "../assets/avatar.jpeg";
import "../styles/style.css";

const NavBar = () => {
  return (
    <div class="nav-bar">
      <div id="nav-left" class="logo-container">
        <img src={logo} alt="Website Logo" />
      </div>

      <div id="nav-center" class="search-box-container">
        <input id="search-input" type="search" placeholder="Search"></input>
        <IconButton id="search-button">
          <SearchIcon />
        </IconButton>
      </div>

      <div class="user-button-container" id="nav-right">
        <button id="user-button">
          <Avatar src={defaultAvatar} />
          <text id="user-name-txtbox" placeholder="Avatar">
            Avatar
          </text>
        </button>
      </div>
    </div>
  );
};

export default NavBar;
