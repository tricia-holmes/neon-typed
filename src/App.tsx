import { useEffect } from "react";
import "./App.css";
import useGame from "./hooks/useGame";
import Prompt from "./components/Prompt/Prompt";
import { Input } from "./components/Input/Input";
import { wordsData } from "./wordsData";

function App() {
  const {
    inputText,
    isTimeRunning,
    timeRemaining,
    promptWords,
    currentIndex,
    setPromptWords,
    runCountdown,
    handleChange,
    handleInput,
  } = useGame();

  useEffect(() => {
    const wordObjs = wordsData.map((word, index) => {
      return { word, isCorrect: undefined, index };
    });

    setPromptWords(wordObjs);
  }, []);

  useEffect(() => {
    runCountdown()
  }, [isTimeRunning, timeRemaining]);

  return (
    <div className="App">
      <h1>Countdown: {timeRemaining}</h1>
      <Prompt words={promptWords} currentIndex={currentIndex} />
      <Input
        className="game__input"
        onChange={handleChange}
        onKeyDown={handleInput}
        value={inputText}
      />
    </div>
  );
}

export default App;
