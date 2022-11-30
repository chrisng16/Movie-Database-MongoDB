import React, { useState, useEffect } from "react";
import Cards from "../components/Cards";
import "../styles/Card.css";
import "../styles/style.css";
import "../styles/Pagination.css";
import { Box, Pagination } from "@mui/material";

function Search({ titles }) {
  const [titlesPerPage, setTitlesPerPage] = useState(10);
  const [results, setResults] = useState([]);

  const [paginationStats, setPaginationStats] = useState({
    from: 0,
    to: titlesPerPage,
    currentPage: 1,
    nResults: 0,
  });

  useEffect(() => {
    const currentTitles = Object.entries(titles)[0][1].slice(paginationStats.from, paginationStats.to);
    setResults(currentTitles);
  }, [paginationStats.from, paginationStats.to, titles]);

  const pageChangeHandler = (e, page) => {
    const from = (Number(page) - 1) * titlesPerPage;
    const to = Number(from) + Number(titlesPerPage);
    setPaginationStats({
      ...paginationStats,
      from: from,
      to: to,
      currentPage: page,
    });
  };

  const titlesPerPageHandler = (e) => {
    const temp = e.target.value;
    const from = (paginationStats.currentPage - 1) * temp;
    const to = Number(from) + Number(temp);
    setTitlesPerPage(temp);
    setPaginationStats({ ...paginationStats, from: from, to: to });
  };

  return (
    <div className="page-wrapper">
      <div className="result-box">
        <h1> Getting {titles.nResults} Search Result...</h1>
        <div className="query-options">
          <label>Titles per Page: </label>
          <select
            className="sort-by-button"
            name="titles-per-page"
            onChange={titlesPerPageHandler}
          >
            <option value="10" selected="10">
              10
            </option>
            <option value="25">25</option>
            <option value="50">50</option>
          </select>
        </div>
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
