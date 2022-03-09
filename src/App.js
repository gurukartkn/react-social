import React, { useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import Login from "./components/Login";
import Home from "./container/Home";
import { ThemeProvider } from "./components/themeContext";

const App = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const User =
      localStorage.getItem("user") !== "undefined"
        ? JSON.parse(localStorage.getItem("user"))
        : localStorage.clear();

    if (!User) navigate("/login");
  }, []);

  return (
    <ThemeProvider>
      <Routes>
        <Route path="login" element={<Login />} />
        <Route path="/*" element={<Home />} />
      </Routes>
    </ThemeProvider>
  );
};

export default App;
