import logo from "../assets/logo.png";
import "../styles/style.css";
import IconButton from "@mui/material/IconButton";
import SearchIcon from '@mui/icons-material/Search';

const Home = () => {
  return (
    <nav>
      <div id="nav-left" class="logo-container">
        <img src={logo} alt="Website Logo" />
      </div>

      <div id = 'nav-center' class="search-box-container">
        <input id="search-input" type="search" placeholder="Search"></input>
        <IconButton id='search-button'>
            <SearchIcon/>
        </IconButton>
      </div>

      <div id='nav-right'>

      </div>
    </nav>
  );
};

export default Home;
