import { useState, useRef } from "react";
import { shuffle } from "../utils.js";
import "../styles/Game.css";

const cards = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

const Card = ({ onClick, children }) => {
  return (
    <div className="card" onClick={onClick}>
      card value: {children}
    </div>
  );
};

const Game = () => {
  shuffle(cards);

  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);
  const selectedCards = useRef([]);

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

  return (
    <div className="game">
      <div className="game__score">Score: {score}</div>
      <div className="game__best-score">Best Score: {bestScore}</div>
      <div className="card-grid">
        {cards.map((value) => (
          <Card key={value} onClick={() => handleClickCard(value)}>
            {value}
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Game;
