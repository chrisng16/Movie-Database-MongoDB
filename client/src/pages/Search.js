import React from "react";
import Card from "../components/Card";
import "../styles/Card.css";
import "../styles/style.css";

function Search({ titles }) {

  const displayTitle = (titles) => {
    if (!titles.nResults) return null;
    return titles.titles.map((title, index) => (
      <div key={index}>
        <Card
          primaryTitle={title.primaryTitle}
          startYear={title.startYear}
          genres={title.genres}
          titleType={title.titleType}
        />
      </div>
    ));
  };

  return (
    <div className="page-wrapper">
      <div className="result-box">
        <h1> Getting {titles.nResults} Search Result</h1>
        <div id="card-view">
          {displayTitle(titles)}
        </div>
      </div>
    </div>
  );
}

export default Search;
