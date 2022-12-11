import { useEffect } from "react";
import "./App.css";
import useGame from "./hooks/useGame";
import Button from "./components/Button/Button";
import Prompt from "./components/Prompt/Prompt";
import Input from "./components/Input/Input";

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
  } = useGame();

  useEffect(() => {
    const wordObjs = [
      "cake",
      "from",
      "a",
      "bakery",
      "is",
      "super",
      "yummy",
      "and",
      "nutrious",
      "cake",
      "from",
      "a",
      "bakery",
      "is",
      "super",
      "yummy",
      "and",
      "nutrious",
      "cake",
      "from",
      "a",
      "bakery",
      "is",
      "super",
      "yummy",
      "and",
      "nutrious",
      "cake",
      "from",
      "a",
      "bakery",
      "is",
      "super",
      "yummy",
      "and",
      "nutrious",
      "cake",
      "from",
      "a",
      "bakery",
      "is",
      "super",
      "yummy",
      "and",
      "nutrious",
      "cake",
      "from",
      "a",
      "bakery",
      "is",
      "super",
      "yummy",
      "and",
      "nutrious",
      "cake",
      "from",
      "a",
      "bakery",
      "is",
      "super",
      "yummy",
      "and",
      "nutrious",
      "cake",
      "from",
      "a",
      "bakery",
      "is",
      "super",
      "yummy",
      "and",
      "nutrious",
      "cake",
      "from",
      "a",
      "bakery",
      "is",
      "super",
      "yummy",
      "and",
      "nutrious",
      "cake",
      "from",
      "a",
      "bakery",
      "is",
      "super",
      "yummy",
      "and",
      "nutrious",
      "cake",
      "from",
      "a",
      "bakery",
      "is",
      "super",
      "yummy",
      "and",
      "nutrious",
      "cake",
      "from",
      "a",
      "bakery",
      "is",
      "super",
      "yummy",
      "and",
      "nutrious",
      "cake",
      "from",
      "a",
      "bakery",
      "is",
      "super",
      "yummy",
      "and",
      "nutrious",
      "cake",
      "from",
      "a",
      "bakery",
      "is",
      "super",
      "yummy",
      "and",
      "nutrious",
      "cake",
      "from",
      "a",
      "bakery",
      "is",
      "super",
      "yummy",
      "and",
      "nutrious",
      "cake",
      "from",
      "a",
      "bakery",
      "is",
      "super",
      "yummy",
      "and",
      "nutrious",
      "cake",
      "from",
      "a",
      "bakery",
      "is",
      "super",
      "yummy",
      "and",
      "nutrious",
      "cake",
      "from",
      "a",
      "bakery",
      "is",
      "super",
      "yummy",
      "and",
      "nutrious",
    ].map((word, index) => {
      return { word, isCorrect: undefined, index };
    });

    setWords(wordObjs);
  }, []);

  useEffect(() => {
    if (isTimeRunning && timeRemaining > 0) {
      setTimeout(() => {
        setTimeRemaining((time: number) => time - 1);
      }, 1000);
      console.log("HEY");
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
        onChange={handleChange}
        onKeyDown={handleInput}
        value={text}
      />

      <Button className="game__btn" content="Start Game" onClick={startGame} />
    </div>
  );
}

export default App;
