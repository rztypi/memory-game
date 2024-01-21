import Game from "./components/Game.jsx";
import ThemeSwitch from "./components/ThemeSwitch.jsx";
import { initDataTheme } from "./theme.js";
import "./styles/App.css";

if (typeof window !== "undefined") {
  initDataTheme();
}

const App = () => {
  return (
    <>
      <header className="header">
        <div className="header__container">
          <h1 className="header__title">
            <i className="bi bi-sd-card-fill"></i> Mem
            <span className="header__title-span header__title-span--o">o</span>
            <span className="header__title-span header__title-span--e">e</span>
            <span className="header__title-span header__title-span--ry-Game">
              ry Game
            </span>
          </h1>
          <ThemeSwitch className="header__theme-switch"></ThemeSwitch>
        </div>
      </header>
      <main className="main">
        <div className="main__container">
          <Game></Game>
        </div>
      </main>
      <footer className="footer">
        <a href="https://github.com/rztypi" className="gh-link">
          <i className="bi bi-github"></i> rztypi
        </a>
      </footer>
    </>
  );
};

export default App;
