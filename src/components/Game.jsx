import { useState, useRef, useEffect } from "react";
import { shuffle } from "../utils.js";
import { fetchAndSetData } from "../api.js";
import "../styles/Game.css";

const Card = ({ obj, onClick }) => {
  return (
    <div className="card" onClick={onClick}>
      <img src={obj.url} alt={obj.name} className="card__img" />
    </div>
  );
};

const Game = () => {
  const [apiData, setApiData] = useState(null);
  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);
  const indices = useRef([...new Array(10).keys()]);
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
    selectedCards.current = [];
    setScore(0);
  };

  const handleClickCard = (value) => {
    if (selectedCards.current.includes(value)) {
      resetGame();
    } else {
      selectedCards.current.push(value);
      const newScore = score + 1;
      setScore(newScore);
      if (newScore > bestScore) {
        setBestScore(newScore);
      }
    }
  };

  shuffle(indices.current);

  return (
    <div className="game">
      <p className="game__score">Score: {score}</p>
      <p className="game__best-score">Best Score: {bestScore}</p>
      <div className="card-grid">
        {indices.current.map((index) => (
          <Card
            key={apiData[index].id}
            obj={apiData[index]}
            onClick={() => handleClickCard(index)}
          ></Card>
        ))}
      </div>
    </div>
  );
};

export default Game;
