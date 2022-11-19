import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import Avatar from "@mui/material/Avatar";
import logo from "../assets/logo.png";
import defaultAvatar from "../assets/avatar.jpeg";
import "../styles/style.css";
import { useState } from "react";

const NavBar = () => {
  const [searchKey, setSearchKey] = useState("");
  // const [getResult, setGetResult] = useState(null);
  const baseURL = "http://localhost:1337/api";
  
  // const fortmatResponse = (res) => {
  //   return JSON.stringify(res, null, 2);
  // };

  async function searchMovie(e) {
    e.preventDefault();
    if (searchKey) {
      try {
        let url = new URL(`${baseURL}/titles`);
        // const params = { primaryTitle: searchKey };
        // url.search = new URLSearchParams(params);

        const res = await fetch(url);
        console.log(res)
        // if(!res.ok) {
        //   const message = `An error has occured: ${res.status} - ${res.statusText}`;
        //   throw Error(message)
        // }

        // const data = await res.json()

        // const result = {
        //   status: res.status + "-" + res.statusText,
        //   headers: {
        //     "Content-Type": res.headers.get("Content-Type"),
        //     "Content-Length": res.headers.get("Content-Length"),
        //   },
        //   data: data,
        // };

        // setGetResult(fortmatResponse(result));

      } catch (error) {
        console.log(error.name)
      }
    }
  }

  return (
    <div class="nav-bar">
      <div id="nav-left" class="logo-container">
        <img src={logo} alt="Website Logo" />
      </div>

      <div id="nav-center" class="search-box-container">
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
