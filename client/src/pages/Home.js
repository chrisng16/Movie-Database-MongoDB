import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import Avatar from "@mui/material/Avatar";
import logo from "../assets/logo.png";
import defaultAvatar from "../assets/avatar.jpeg";
import "../styles/style.css";
import "../styles/Home.css";
import { useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { RadioButton } from "../components/RadioButton";
import { Checkbox } from "../components/Checkbox";

const Home = ({ setTitles }) => {
  const SEARCH_OPTION_NAME = "by Name";
  const SEARCH_OPTION_YEAR = "by Year";
  const SEARCH_OPTION_GENRE = "by Genre";
  const FILTER_OPTION_IS_NOT_ADULT = "is NOT Adult";

  const [searchKey, setSearchKey] = useState("");
  const [searchOption, setSearchOption] = useState(SEARCH_OPTION_NAME);
  const [filterOption, setFilterOption] = useState(false);

  const baseURL = "http://localhost:1337/api/titles";

  let navigate = useNavigate();
  const logoClicked = () => {
    navigate("/");
  };
  console.log(searchOption);
  async function searchMovie(e) {
    e.preventDefault();

    if (searchKey) {
      try {
        let url = new URL(`${baseURL}`);
        var query = {};
        switch (searchOption) {
          case SEARCH_OPTION_NAME:
            query = { primaryTitle: searchKey };
            break;
          case SEARCH_OPTION_YEAR:
            query = { startYear: searchKey };
            break;
          case SEARCH_OPTION_GENRE:
            query = { genres: searchKey };
            break;
          default:
            query = {}
            break;
        }
        url.search = new URLSearchParams(query);

        await fetch(url)
          .then((res) => res.json())
          .then((data) => {
            setTitles(data);
          });

        navigate("/search"+url.search);
      } catch (error) {
        console.log(error.name);
      }
    }
  }
  const filterOptionHandler = (e) => {
    setFilterOption(!filterOption);
  };
  const searchOptionHandler = (e) => {
    setSearchOption(e.target.value);
  };

  return (
    <>
      <header>
        <div className="nav-bar">
          <div id="nav-left" className="logo-container" onClick={logoClicked}>
            <img src={logo} alt="Website Logo" />
          </div>

          <div id="nav-center">
            <div className="search-box-container">
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
        <div className="h-divider" />

        <div className="query-options-bar">
          <div className="search-options">
            <div className="query-options">
              <label>Search Options: </label>
              <RadioButton
                value={SEARCH_OPTION_NAME}
                onChange={searchOptionHandler}
                isSelected={searchOption === SEARCH_OPTION_NAME}
              />
              <RadioButton
                value={SEARCH_OPTION_YEAR}
                onChange={searchOptionHandler}
                isSelected={searchOption === SEARCH_OPTION_YEAR}
              />
              <RadioButton
                value={SEARCH_OPTION_GENRE}
                onChange={searchOptionHandler}
                isSelected={searchOption === SEARCH_OPTION_GENRE}
              />
            </div>
          </div>
        </div>
        <div className="h-divider" />

        <div className="filter-sort-options-bar">
          <div className="filter-options">
            <div className="query-options">
              <label>Filter: </label>
              <Checkbox
                label={FILTER_OPTION_IS_NOT_ADULT}
                isChecked={filterOption}
                onChange={filterOptionHandler}
              />
            </div>
          </div>

          <div className="v-divider" />

          <div className="sort-options">
            <div className="query-options sort-options">
              <label>Sort by: </label>
              <select className="sort-by-button" name="sort-by">
                <option>Name</option>
                <option>Year</option>
              </select>

              <label>Sort order: </label>
              <select className="sort-by-button" name="sort-order">
                <option>Ascending (A-Z 1-9)</option>
                <option>Decending (Z-A 9-1)</option>
              </select>
            </div>
          </div>
          <div className="v-divider" />

          <div className="query-options">
          <label>Title per Page: </label>
              <select className="sort-by-button" name="titles-per-page">
                <option>10</option>
                <option>25</option>
                <option>50</option>
                <option>Unlimited</option>
              </select>
          </div>
        </div>
        
      </header>
      <Outlet />
    </>
  );
};

export default Home;
