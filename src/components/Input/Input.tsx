import { useState, KeyboardEvent, ChangeEvent, useEffect, useRef } from "react";
import "./Input.css";

type InputProps = {
  isTimeRunning: boolean;
  timeRemaining: number;
  currentIndex: number;
  promptWords: Array<{
    word: string;
    isCorrect: undefined | boolean;
    index: number;
  }>;
  setIsTimeRunning: (value: boolean) => void;
  setTimeRemaining: (value: number) => void;
  setCurrentIndex: (value: any) => void;
  setPromptWords: (
    value: Array<{
      word: string;
      isCorrect: undefined | boolean;
      index: number;
    }>
  ) => void;
};

export default function Input({
  promptWords,
  currentIndex,
  setCurrentIndex,
  setPromptWords,
  isTimeRunning,
  timeRemaining,
  setIsTimeRunning,
  setTimeRemaining,
}: InputProps) {
  const [inputText, setInputText] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  });

  useEffect(() => {
    if (timeRemaining === 0) {
      setTimeout(() => {
        setInputText("");
      }, 1000);
    }
  }, [timeRemaining]);

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
    setCurrentIndex((currentIndex: number) => currentIndex + 1);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (!isTimeRunning) {
      setIsTimeRunning(true);
      setTimeRemaining(5);
      setCurrentIndex(0);
      setInputText("");
      setPromptWords(
        promptWords.map((word) => {
          return { ...word, isCorrect: undefined };
        })
      );
    }

    setInputText(e.currentTarget.value.trim());
  };

  const handleInput = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === " " || e.key === "Space") {
      checkWord();
      setInputText("");
    }
  };

  return (
    <div>
      <input
        type="text"
        name="text"
        ref={inputRef}
        className="game__input"
        onChange={handleChange}
        onKeyDown={handleInput}
        value={inputText}
      />
    </div>
  );
}
