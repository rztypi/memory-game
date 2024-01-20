import Game from "./components/Game.jsx";
import "./styles/App.css";

const App = () => {
  return (
    <>
      <header className="header">
        <h1 className="header__title">
          <i className="bi bi-sd-card-fill"></i> Memory Card
        </h1>
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
