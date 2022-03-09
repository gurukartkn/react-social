import React, { useContext } from "react";
import { ThemeContext } from "./themeContext";
import { BsCloudSunFill, BsCloudMoonFill } from "react-icons/bs";

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
        className="appearance-none"
      />
      {theme === "dark" ? (
        <BsCloudMoonFill className="w-6 h-6 -translate-y-3.5 text-slate-100 shadow-lg" />
      ) : (
        <BsCloudSunFill className="w-6 h-6 -translate-y-3.5 text-amber-400 shadow-lg" />
      )}
    </label>
  );
};
