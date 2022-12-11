import { useState, KeyboardEvent, ChangeEvent, useEffect } from "react";
import "./App.css";
import Button from "./components/Button/Button";
import Prompt from "./components/Prompt/Prompt";
import Input from "./components/Input/Input";

function App() {
  const [text, setText] = useState(""); // TODO: game input hook
  const [currentIndex, setCurrentIndex] = useState(0);
  const [correctWords, setCorrectWords] = useState(0);
  const [wrongWords, setWrongWords] = useState(0);
  const [words, setWords] = useState(
    Array<{ word: string; isCorrect: undefined | boolean; index: number }>
  );

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

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    // TODO: game input hook
    setText(e.currentTarget.value.trim());
  };

  const handleInput = (e: KeyboardEvent<HTMLInputElement>) => {
    // TODO: game input hook
    if (e.key === " " || e.key === "Space") {
      checkWord();
      setText("");
    }
  };

  const checkWord = () => {
    if (words[currentIndex].word === text) {
      updateCorrectWord();
    } else {
      updateIncorrectWord();
    }

    setCurrentIndex((currentIndex) => currentIndex + 1);
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

  return (
    <div className="App">
      <Prompt words={words} currentIndex={currentIndex} />
      <Input
        className="game__input"
        onChange={handleChange}
        onKeyDown={handleInput}
        value={text}
      />

      <Button className="game__btn" content="See the top scores!" />
    </div>
  );
}

export default App;
