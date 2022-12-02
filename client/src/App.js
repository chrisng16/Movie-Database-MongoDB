import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import { useState } from "react";
import Search from "./pages/Search";
import Index from "./pages/Index";
import Title from "./pages/Title";
import Login from "./pages/Login";
import Register from "./pages/Register";

const App = () => {
  const [titles, setTitles] = useState([]);
  const [loggedIn, setLoggedIn] = useState(false);
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home setTitles={setTitles} />}>
          <Route path="index" element={<Index />} />
          <Route
            path="search"
            element={<Search titles={titles} />} ></Route>
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
        </Route>
        <Route path="title/:tconst" element={<Title />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
