import { useState, ChangeEvent, KeyboardEvent } from "react";

function useGame() {
  const STARTING__TIME = 30;
  const [text, setText] = useState("");
  const [timeRemaining, setTimeRemaining] = useState(STARTING__TIME);
  const [isTimeRunning, setIsTimeRunning] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [words, setWords] = useState(
    Array<{ word: string; isCorrect: undefined | boolean; index: number }>
  );

  const startGame = () => {
    setIsTimeRunning(true);
    setTimeRemaining(STARTING__TIME);
    setText("");
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setText(e.currentTarget.value.trim());
  };

  const updateCorrectWord = () => {
    const newWordsList = words.map((word) => {
      if (word.index === currentIndex) {
        return { ...word, isCorrect: true };
      }
      return word;
    });
    setWords(newWordsList);
  };

  const updateIncorrectWord = () => {
    const newWordsList = words.map((word) => {
      if (word.index === currentIndex) {
        return { ...word, isCorrect: false };
      }
      return word;
    });
    setWords(newWordsList);
  };

  const checkWord = () => {
    if (words[currentIndex].word === text) {
      updateCorrectWord();
    } else {
      updateIncorrectWord();
    }
    setCurrentIndex((currentIndex) => currentIndex + 1);
  };

  const handleInput = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === " " || e.key === "Space") {
      checkWord();
      setText("");
    }
  };
  return {
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
  };
}

export default useGame;
