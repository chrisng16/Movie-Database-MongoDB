import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import { useState } from "react";
import Search from "./pages/Search";

const App = () => {
  const [titles, setTitles] = useState({});
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home setTitles={setTitles} />}>
          <Route path="search" element={<Search titles = {titles} />}></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
