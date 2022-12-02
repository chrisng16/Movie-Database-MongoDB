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
  const [loggedInStatus, setLoggedInStatus] = useState(false);
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home setTitles={setTitles} loggedInStatus={loggedInStatus} />}>
          <Route path="index" element={<Index />} />
          <Route path="search" element={<Search titles={titles} />} />
          <Route path="login" element={<Login setLoggedIn={setLoggedInStatus}/>} />
          <Route path="register" element={<Register />} />
        </Route>
        <Route path="title/:tconst" element={<Title />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
