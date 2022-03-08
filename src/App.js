import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Home from "./container/Home";
import { ThemeProvider } from "./components/themeContext";

const App = () => {
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
