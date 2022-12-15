import { useEffect } from "react";
import "./App.css";
import useGame from "./hooks/useGame";
import Button from "./components/Button/Button";
import Prompt from "./components/Prompt/Prompt";
import { Input } from "./components/Input/Input";
import {wordsData} from "./wordsData"

function App() {
  const {
    setWords,
    isTimeRunning,
    timeRemaining,
    setTimeRemaining,
    words,
    currentIndex,
    handleChange,
    handleInput,
    text,
    startGame,
    endGame,
    inputRef,
  } = useGame();

  useEffect(() => {
    const wordObjs = wordsData.map((word, index) => {
      return { word, isCorrect: undefined, index };
    });

    setWords(wordObjs);
  }, []);

  useEffect(() => {
    if (isTimeRunning && timeRemaining > 0) {
      setTimeout(() => {
        setTimeRemaining((time: number) => time - 1);
      }, 1000);
    }

    if (timeRemaining === 0) {
      endGame();
    }
  }, [isTimeRunning, timeRemaining]);

  return (
    <div className="App">
      <h1>Countdown: {timeRemaining}</h1>
      <Prompt words={words} currentIndex={currentIndex} />
      <Input
        className="game__input"
        ref={inputRef}
        disabled={!isTimeRunning}
        onChange={handleChange}
        onKeyDown={handleInput}
        value={text}
      />

      <Button
        className="game__btn"
        content="Start Game"
        onClick={startGame}
        disabled={isTimeRunning}
      />
    </div>
  );
}

export default App;
