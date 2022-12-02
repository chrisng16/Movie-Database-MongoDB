import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import logo from "../assets/logo.png";
import "../styles/style.css";
import "../styles/Home.css";
import { useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { RadioButton } from "../components/RadioButton";
import { Checkbox } from "../components/Checkbox";
import { UserButton } from "../components/UserButton";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

const theme = createTheme();

const Home = ({ setTitles, loggedInStatus }) => {
  const OPTION_NAME = "Name";
  const OPTION_YEAR = "Year";
  const OPTION_GENRE = "Genre";
  const FILTER_OPTION_IS_NOT_ADULT = "is NOT Adult";

  const SORT_ORDER_ASCENDING = "ascending";
  const SORT_ORDER_DECENDING = "decending";

  const [searchKey, setSearchKey] = useState("");
  const [searchOption, setSearchOption] = useState(OPTION_NAME);
  const [filterOption, setFilterOption] = useState(false);
  const [sortBy, setSortBy] = useState(searchOption);
  const [sortOrder, setSortOrder] = useState(SORT_ORDER_ASCENDING);
  const baseURL = "http://localhost:1337/api/titles";

  let navigate = useNavigate();
  const logoClicked = () => {
    navigate("/");
  };

  async function searchMovie(e) {
    e.preventDefault();

    if (searchKey) {
      try {
        let url = new URL(`${baseURL}`);
        var query = {};
        switch (searchOption) {
          case OPTION_NAME:
            Object.assign(query, { primaryTitle: searchKey });
            break;
          case OPTION_YEAR:
            Object.assign(query, { startYear: searchKey });
            break;
          case OPTION_GENRE:
            Object.assign(query, { genres: searchKey });
            break;
          default:
            break;
        }

        if (filterOption) Object.assign(query, { isAdult: 0 });
        var sortOption = sortBy === OPTION_NAME ? "primaryTitle" : "startYear";
        if (sortOrder === SORT_ORDER_DECENDING) sortOption = "-" + sortOption;
        Object.assign(query, { sort: sortOption });

        console.log(query);
        url.search = new URLSearchParams(query);

        await fetch(url)
          .then((res) => res.json())
          .then((data) => {
            setTitles(data);
          });

        navigate("/search" + url.search);
      } catch (error) {
        console.log(error);
      }
    }
  }
  const filterOptionHandler = (e) => {
    setFilterOption(!filterOption);
    console.log(`Filter changed: ${filterOption}`);
  };
  const searchOptionHandler = (e) => {
    console.log(`Search option changed: ${e.target.value}`);
    setSearchOption(e.target.value);
  };

  const sortByHandler = (e) => {
    console.log(`Sort option changed: ${e.target.value}`);
    setSortBy(e.target.value);
  };
  const sortOrderHandler = (e) => {
    console.log(`Sort order changed: ${e.target.value}`);
    setSortOrder(e.target.value);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
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

          <UserButton loggedInStatus={loggedInStatus} />
        </div>
        <div className="h-divider" />

        <div className="query-options-bar">
          <div className="search-options">
            <div className="query-options">
              <label>Search Options: </label>
              <RadioButton
                value={OPTION_NAME}
                onChange={searchOptionHandler}
                isSelected={searchOption === OPTION_NAME}
              />
              <RadioButton
                value={OPTION_YEAR}
                onChange={searchOptionHandler}
                isSelected={searchOption === OPTION_YEAR}
              />
              <RadioButton
                value={OPTION_GENRE}
                onChange={searchOptionHandler}
                isSelected={searchOption === OPTION_GENRE}
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
              <select
                className="sort-by-button"
                name="sort-by"
                onChange={sortByHandler}
              >
                <option value={OPTION_NAME}>Name</option>
                <option value={OPTION_YEAR}>Year</option>
              </select>

              <label>Sort order: </label>
              <select
                className="sort-by-button"
                name="sort-order"
                onChange={sortOrderHandler}
              >
                <option value={SORT_ORDER_ASCENDING}>
                  Ascending (A-Z 1-9)
                </option>
                <option value={SORT_ORDER_DECENDING}>
                  Decending (Z-A 9-1)
                </option>
              </select>
            </div>
          </div>
        </div>
      </header>
      <Outlet />
    </ThemeProvider>
  );
};

export default Home;
