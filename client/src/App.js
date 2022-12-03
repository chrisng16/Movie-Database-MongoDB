import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import { useState } from "react";
import Search from "./pages/Search";
import Index from "./pages/Index";
import Title from "./pages/Title";
import Login from "./pages/Login";
import Register from "./pages/Register";
import CastDetail from "./pages/CastDetail";
import AdminHome from "./pages/AdminHome";

const App = () => {
  const [titles, setTitles] = useState([]);
  const [loggedInStatus, setLoggedInStatus] = useState(false);
  const [user, setUser] = useState({});
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <Home
              setTitles={setTitles}
              setUser={setUser}
              loggedInStatus={loggedInStatus}
              setLoggedInStatus={setLoggedInStatus}
              user={user}
            />
          }
        >
          <Route path="index" element={<Index />} />
          <Route path="search" element={<Search titles={titles} />} />
          <Route
            path="login"
            element={
              <Login setLoggedInStatus={setLoggedInStatus} setUser={setUser} />
            }
          />
          <Route path="register" element={<Register />} />
          <Route path="cast/:nconst" element={<CastDetail />} />
          <Route path="title/:tconst" element={<Title />} />
          <Route path="admin" element={<AdminHome />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
