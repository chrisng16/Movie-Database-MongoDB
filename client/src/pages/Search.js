import React, { useState, useEffect } from "react";
import Cards from "../components/Cards";
import "../styles/Card.css";
import "../styles/style.css";
import "../styles/Pagination.css";
import { Box, Pagination } from "@mui/material";

function Search({ titles }) {
  const [titlesPerPage, setTitlesPerPage] = useState(10);
  const [results, setResults] = useState([])

  const [paginationStats, setPaginationStats] = useState({
    from: 0,
    to: titlesPerPage,
    nResults: 0,
  });

  const paginateData = (from, to) => {
    const currentTitles = Object.entries(titles)[0][1].slice(from, to);
    setResults(currentTitles)
  }

  useEffect(() => {
    paginateData(paginationStats.from, paginationStats.to)
  }, [paginationStats.from, paginationStats.to])
  

  const pageChangeHandler = (event, page) => {
    const from = (page-1) * titlesPerPage
    const to = from + titlesPerPage

    setPaginationStats({...paginationStats, from: from, to:to})
  };

  return (
    <div className="page-wrapper">
      <div className="result-box">
        <h1> Getting {titles.nResults} Search Result...</h1>
        <Cards titles={results} />
      </div>
      <Box
        justifyContent={"center"}
        alignItems={"center"}
        display={"flex"}
        sx={{ margin: "10px 0" }}
      >
        <Pagination
          count={Math.ceil(titles.nResults / titlesPerPage)}
          shape="rounded"
          size="large"
          onChange={pageChangeHandler}
        />
      </Box>
    </div>
  );
}

export default Search;
