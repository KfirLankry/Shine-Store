import React, { useState } from "react";
import "../css/darkMode.css";

function DarkModeToggle() {
  const getTheme = () => {
    return JSON.parse(localStorage.getItem("DarkMode")) || false;
  };

  const [darkMode, setDarkMode] = useState(getTheme());

  React.useEffect(() => {
    localStorage.setItem("DarkMode", JSON.stringify(darkMode));
    // apply the dark theme by adding a dark class to the body element
    if (localStorage.getItem("DarkMode") == "true") {
      document.body.classList.add("dark");
      localStorage.setItem("DarkMode", darkMode);
    } else {
      document.body.classList.remove("dark");
      localStorage.setItem("DarkMode", darkMode);
    }
  }, [darkMode]);

  return (
    <>
      <label className="vm__checkbox my-2">
        <input
          type="checkbox"
          id="switch"
          onChange={() => setDarkMode(!darkMode)}
          checked={darkMode ? 1 : 0}
        />
        <div className="slider"></div>
      </label>
    </>
  );
}

export default DarkModeToggle;
