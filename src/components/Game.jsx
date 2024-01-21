import { useState, useRef, useEffect } from "react";
import { shuffle, capitalize } from "../utils.js";
import { fetchAndSetData } from "../api.js";
import { playEndGameAnimation, playResetAnimation } from "../dom.js";
import "../styles/Game.css";

const Card = ({ obj, onClick }) => {
  return (
    <div className="card" onClick={onClick}>
      <img src={obj.url} alt={obj.name} className="card__img" />
    </div>
  );
};

const Game = () => {
  const cardCount = {
    easy: 5,
    medium: 10,
    hard: 20,
  };

  const [apiData, setApiData] = useState(null);

  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);

  const [difficulty, setDifficulty] = useState("easy");
  const indices = useRef([...new Array(cardCount[difficulty]).keys()]);

  const selectedCards = useRef([]);

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;
    fetchAndSetData(setApiData, signal);

    return () => {
      controller.abort();
    };
  }, []);

  if (apiData === null) {
    return;
  }

  const resetGame = () => {
    playResetAnimation();
    shuffle(apiData);
    setApiData([...apiData]);
    setScore(0);
    selectedCards.current = [];
  };

  const endGame = (result) => {
    playEndGameAnimation(`${result}-animation`);
    resetGame();
  };

  const playGame = (value) => {
    setScore(score + 1);
    setBestScore(Math.max(score + 1, bestScore));
    selectedCards.current.push(value);
  };

  const handleCardClick = (value) => {
    if (selectedCards.current.includes(value)) {
      endGame("lose");
    } else {
      playGame(value);
      if (score + 1 === cardCount[difficulty]) {
        endGame("win");
      }
    }
  };

  const handleDiffBtnClick = (value) => {
    if (value === difficulty) {
      return;
    }
    setDifficulty(value);
    indices.current = [...new Array(cardCount[value]).keys()];
    resetGame();
  };

  shuffle(indices.current);

  return (
    <div className="game">
      <div className="game__header">
        <div className="game__scores">
          <p className="game__score">Score: {score}</p>
          <p className="game__best-score">Best Score: {bestScore}</p>
        </div>
        <div className="game__btns">
          <div className="game__difficulty-btns">
            {Object.keys(cardCount).map((difficultyOption) => (
              <button
                className="game__difficulty-btn"
                key={difficultyOption}
                onClick={() => handleDiffBtnClick(difficultyOption)}
                type="button"
              >
                {capitalize(difficultyOption)}
              </button>
            ))}
          </div>
          <button
            className="game__reset-btn"
            onClick={() => resetGame()}
            type="button"
          >
            <i className="bi bi-arrow-clockwise"></i> Reset
          </button>
        </div>
      </div>
      <div className="card-grid">
        {indices.current.map((index) => (
          <Card
            key={apiData[index].id}
            obj={apiData[index]}
            onClick={() => handleCardClick(index)}
          ></Card>
        ))}
      </div>
    </div>
  );
};

export default Game;
