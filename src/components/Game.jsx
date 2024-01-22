import { useState, useRef, useEffect } from "react";
import { shuffle, capitalize } from "../utils.js";
import { fetchCardData, fetchGifData } from "../api.js";
import { playEndGameAnimation, playResetAnimation } from "../dom.js";
import "../styles/Game.css";

const EndDialog = ({
  isOpen,
  result,
  difficulty,
  score,
  bestScore,
  onClose,
}) => {
  const [gifData, setGifData] = useState(null);

  useEffect(() => {
    if (isOpen) {
      getDialog().showModal();

      return () => {
        getDialog().close();
      };
    }
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) {
      const controller = new AbortController();
      const signal = controller.signal;
      const apiTag = result === "win" ? "celebrate" : "sad";
      fetchGifData(apiTag, signal).then((data) => {
        if (data) {
          setGifData(data);
        }
      });

      return () => {
        controller.abort();
      };
    }
  }, [isOpen, result]);

  const getDialog = () => {
    return document.querySelector(".dialog");
  };

  const dialogData = {
    win: {
      title: "Way to go!",
      desc: {
        easy: "Time to step up the challenge!",
        medium: "GG!",
        hard: "You're a wizard!",
      },
    },
    lose: {
      title: "Aww...",
      desc: {
        easy: "Really?",
        medium: "Good try.",
        hard: "We can't have everything.",
      },
    },
  };

  const closeDialog = (event) => {
    if (
      event.type === "keydown" &&
      event.key !== "Enter" &&
      event.key !== "Spacebar" &&
      event.key !== " "
    ) {
      return;
    }
    setGifData(null);
    getDialog().close();
    onClose();
  };

  return (
    <dialog className="dialog" onClick={closeDialog} onKeyDown={closeDialog}>
      {isOpen && (
        <>
          {gifData !== null && (
            <img
              className="dialog__img"
              src={gifData.images.fixed_width.webp}
              alt={gifData.title}
            />
          )}
          <h1 className="dialog__title">{dialogData[result].title}</h1>
          <p className="dialog__desc">{dialogData[result].desc[difficulty]}</p>
          <p className="dialog__score">Score: {score}</p>
          <p className="dialog__score">Best Score: {bestScore}</p>
          <div className="dialog__footer">Press anywhere to continue.</div>
        </>
      )}
    </dialog>
  );
};

const Card = ({ obj, value, selectCard }) => {
  const handleClick = (event) => {
    if (
      event.type === "keydown" &&
      event.key !== "Enter" &&
      event.key !== "Spacebar" &&
      event.key !== " "
    ) {
      return;
    }
    event.currentTarget.blur();
    selectCard(value);
  };

  return (
    <div
      className="card"
      onClick={handleClick}
      onKeyDown={handleClick}
      tabIndex="0"
    >
      <img src={obj.url} alt={obj.name} className="card__img" />
      <div className="card__name">{obj.name}</div>
    </div>
  );
};

const Game = () => {
  const cardCount = {
    easy: 6,
    medium: 12,
    hard: 18,
  };

  const [apiData, setApiData] = useState(null);

  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);

  const [difficulty, setDifficulty] = useState("easy");

  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const latestGameResult = useRef("win");
  const indices = useRef([...new Array(cardCount[difficulty]).keys()]);
  const selectedCards = useRef([]);

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;
    fetchCardData(signal).then((data) => {
      if (data) {
        setApiData(data.memes);
      }
    });

    return () => {
      controller.abort();
    };
  }, []);

  const changeCards = () => {
    shuffle(apiData);
    setApiData([...apiData]);
  };

  const handleDialogClose = () => {
    setIsDialogOpen(false);
    resetGame();
  };

  const resetGame = () => {
    playResetAnimation();
    changeCards();
    setScore(0);
    selectedCards.current = [];
  };

  const endGame = (result) => {
    playEndGameAnimation(result);
    setIsDialogOpen(true);
    latestGameResult.current = result;
  };

  const playGame = (value) => {
    setScore(score + 1);
    setBestScore(Math.max(score + 1, bestScore));
    selectedCards.current.push(value);
  };

  const selectCard = (value) => {
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

  if (!isDialogOpen) {
    shuffle(indices.current);
  }

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
      {apiData !== null && (
        <div className="card-grid">
          {indices.current.map((index) => (
            <Card
              key={apiData[index].id}
              value={index}
              obj={apiData[index]}
              selectCard={selectCard}
            ></Card>
          ))}
        </div>
      )}
      <EndDialog
        isOpen={isDialogOpen}
        result={latestGameResult.current}
        onClose={handleDialogClose}
        difficulty={difficulty}
        score={score}
        bestScore={bestScore}
      ></EndDialog>
    </div>
  );
};

export default Game;
