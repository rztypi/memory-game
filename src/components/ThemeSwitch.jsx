import { useEffect } from "react";
import { setStoredTheme, getActiveTheme, setDataTheme } from "../theme";
import "../styles/ThemeSwitch.css";

const ThemeSwitch = ({ className = "", id = "theme-switch" }) => {
  const setBtnIcon = (theme) => {
    const icon = document.querySelector(`#${id}`).querySelector("i");
    if (theme === "light") {
      icon.classList.remove("bi-moon-fill");
      icon.classList.add("bi-sun");
    } else {
      icon.classList.remove("bi-sun");
      icon.classList.add("bi-moon-fill");
    }
  };

  useEffect(() => {
    setBtnIcon(getActiveTheme());
  });

  const handleThemeBtnClick = () => {
    const theme = getActiveTheme() === "light" ? "dark" : "light";
    setStoredTheme(theme);
    setDataTheme(theme);
    setBtnIcon(theme);
  };

  return (
    <button
      className={"theme-switch " + className}
      id={id}
      onClick={handleThemeBtnClick}
      type="button"
    >
      <i className="bi bi-sun"></i>
    </button>
  );
};

export default ThemeSwitch;
