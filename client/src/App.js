import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import { useState } from "react";
import Search from "./pages/Search";
import Index from "./pages/Index";

const App = () => {
  const [titles, setTitles] = useState({});
  // const [currentPage, setCurrentPage] = useState(1);
  // const [titlesPerPage, setTitlesPerPage] = useState(10);

  // const indexOfLastTitle = currentPage * titlesPerPage;
  // const indexOfFirstTitle = indexOfLastTitle - titlesPerPage;
  // const currentTitles = titles.slice(indexOfFirstTitle, indexOfLastTitle);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home setTitles={setTitles} />}>
          <Route path="index" element={<Index />} />
          <Route
            path="search"
            element={<Search titles={currentTitles} />}
          ></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
