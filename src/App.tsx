import { useState, useEffect } from "react";
import "./App.css";
import Prompt from "./components/Prompt/Prompt";
import { Input } from "./components/Input/Input";
import { wordsData } from "./wordsData";

function App() {
  const [timeRemaining, setTimeRemaining] = useState(5);
  const [isTimeRunning, setIsTimeRunning] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [promptWords, setPromptWords] = useState(
    Array<{ word: string; isCorrect: undefined | boolean; index: number }>
  );

  const runCountdown = () => {
    let interval = setInterval(() => {
      if (isTimeRunning && timeRemaining > 0) {
        setTimeRemaining((time: number) => time - 1);
      }

      if (timeRemaining === 0) {
        setIsTimeRunning(false);
        setTimeRemaining(5);
        setCurrentIndex(0);
        setPromptWords(
          promptWords.map((word) => {
            return { ...word, isCorrect: undefined };
          })
        );
      }

      return clearInterval(interval);
    }, 1000);
  };

  useEffect(() => {
    const wordObjs = wordsData.map((word, index) => {
      return { word, isCorrect: undefined, index };
    });

    setPromptWords(wordObjs);
  }, []);

  useEffect(() => {
    runCountdown();
  }, [isTimeRunning, timeRemaining]);

  return (
    <div className="App">
      <h1>Countdown: {timeRemaining}</h1>
      <Prompt words={promptWords} currentIndex={currentIndex} />
      <Input
        promptWords={promptWords}
        setPromptWords={setPromptWords}
        currentIndex={currentIndex}
        setCurrentIndex={setCurrentIndex}
        isTimeRunning={isTimeRunning}
        timeRemaining={timeRemaining}
        setIsTimeRunning={setIsTimeRunning}
        setTimeRemaining={setTimeRemaining}
      />
    </div>
  );
}
export default App;
