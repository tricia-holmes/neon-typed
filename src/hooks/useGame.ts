import { useState, ChangeEvent, KeyboardEvent, useRef } from "react";

function useGame() {
  const STARTING__TIME = 5;
  const [inputText, setInputText] = useState("");
  const [timeRemaining, setTimeRemaining] = useState(STARTING__TIME);
  const [isTimeRunning, setIsTimeRunning] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [promptWords, setPromptWords] = useState(
    Array<{ word: string; isCorrect: undefined | boolean; index: number }>
  );

  const startGame = () => {
    setCurrentIndex(0);
    setIsTimeRunning(true);
    setTimeRemaining(STARTING__TIME);
    setInputText("");

    setPromptWords(
      promptWords.map((word) => {
        return { ...word, isCorrect: undefined };
      })
    );
  };

  const endGame = () => {
    setIsTimeRunning(false);
    setTimeRemaining(STARTING__TIME);
    setInputText("");
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
    setTimeRemaining,
    handleChange,
    handleInput,
    endGame,
  };
}

export default useGame;
