import { useState, ChangeEvent, KeyboardEvent } from "react";

function useGame() {
  const STARTING__TIME = 5;
  const [inputText, setInputText] = useState("");
  const [timeRemaining, setTimeRemaining] = useState(STARTING__TIME);
  const [isTimeRunning, setIsTimeRunning] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [promptWords, setPromptWords] = useState(
    Array<{ word: string; isCorrect: undefined | boolean; index: number }>
  );

  const resetPrompt = () => {
    setCurrentIndex(0);
    setInputText("");
    setPromptWords(
      promptWords.map((word) => {
        return { ...word, isCorrect: undefined };
      })
    );
  };

  const startGame = () => {
    resetPrompt();
    setIsTimeRunning(true);
    setTimeRemaining(STARTING__TIME);
  };

  const endGame = () => {
    resetPrompt();
    setIsTimeRunning(false);
    setTimeRemaining(STARTING__TIME);
  };

  const runCountdown = () => {
    let interval = setInterval(() => {
      if (isTimeRunning && timeRemaining > 0) {
        setTimeRemaining((time: number) => time - 1);
      }

      if (timeRemaining === 0) {
        endGame();
      }

      return clearInterval(interval);
    }, 1000);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (!isTimeRunning) {
      startGame();
    }

    setInputText(e.currentTarget.value.trim());
  };

  const updateCorrectWord = () => {
    const newWordsList = promptWords.map((word) => {
      if (word.index === currentIndex) {
        return { ...word, isCorrect: true };
      }
      return word;
    });
    setPromptWords(newWordsList);
  };

  const updateIncorrectWord = () => {
    const newWordsList = promptWords.map((word) => {
      if (word.index === currentIndex) {
        return { ...word, isCorrect: false };
      }
      return word;
    });
    setPromptWords(newWordsList);
  };

  const checkWord = () => {
    if (promptWords[currentIndex].word === inputText) {
      updateCorrectWord();
    } else {
      updateIncorrectWord();
    }
    setCurrentIndex((currentIndex) => currentIndex + 1);
  };

  const handleInput = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === " " || e.key === "Space") {
      checkWord();
      setInputText("");
    }
  };
  return {
    inputText,
    isTimeRunning,
    timeRemaining,
    promptWords,
    currentIndex,
    setPromptWords,
    runCountdown,
    handleChange,
    handleInput,
  };
}

export default useGame;
