import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import Avatar from "@mui/material/Avatar";
import logo from "../assets/logo.png";
import defaultAvatar from "../assets/avatar.jpeg";
import "../styles/style.css";
import "../styles/Home.css";
import { useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";

const Home = ({setTitles}) => {
  const welcomeText = document.getElementById("welcome-text");
  const [searchKey, setSearchKey] = useState("");

  const baseURL = "http://localhost:1337/api";

  let navigate = useNavigate();
  const logoClicked = () => {
    welcomeText.style.display = "flex";
    navigate("/");
  };

  async function searchMovie(e) {
    e.preventDefault();

    if (searchKey) {
      try {
        let url = new URL(`${baseURL}/titles`);
        var query = { primaryTitle: searchKey };
        url.search = new URLSearchParams(query);

        await fetch(url)
          .then((res) => res.json())
          .then((data) => {
            welcomeText.style.display = "none";
            setTitles(data)
          });

        navigate("/search");
      } catch (error) {
        console.log(error.name);
      }
    }
  }

  return (
    <>
      <header>
        <div className="nav-bar">
          <div id="nav-left" className="logo-container" onClick={logoClicked}>
            <img src={logo} alt="Website Logo" />
          </div>

          <div id="nav-center" className="search-box-container">
            <input
              value={searchKey}
              id="search-input"
              onChange={(e) => setSearchKey(e.target.value)}
              type="search"
              placeholder="Search"
            ></input>
            <IconButton id="search-button" onClick={searchMovie}>
              <SearchIcon />
            </IconButton>
          </div>

          <div className="user-button-container" id="nav-right">
            <button id="user-button">
              <Avatar src={defaultAvatar} />
              <text id="user-name-txtbox" placeholder="Avatar">
                Avatar
              </text>
            </button>
          </div>
        </div>
        <div id="welcome-text" className="body">
          <h1>Welcome to I am DB</h1>
        </div>
        <Outlet />
      </header>
    </>
  );
};

export default Home;
