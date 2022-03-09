import React, { useContext } from "react";
import { ThemeContext } from "./themeContext";
import { BsFillCloudSunFill } from "react-icons/bs";

export const Toggle = () => {
  const { theme, setTheme } = useContext(ThemeContext);

  function isDark() {
    return theme === "dark";
  }

  function toggleTheme(e) {
    setTheme(e.target.checked ? "dark" : "light");
  }

  return (
    <label>
      <input
        type="checkbox"
        checked={isDark()}
        onChange={(e) => toggleTheme(e)}
      />
    </label>
  );
};
