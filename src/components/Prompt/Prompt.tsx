import "./Prompt.css";
import Word from "../Word/Word";

type PromptProps = {
  words: Array<{ word: string; isCorrect: undefined | boolean; index: number }>;
  currentIndex: number
};

export default function Prompt({ words, currentIndex }: PromptProps) {
  const newWords = words.map((item) => (
    <Word
    key={item.index}
    word={item.word}
    isCorrect={item.isCorrect}
    index={item.index}
    currentIndex={currentIndex}
    />
  ));
  return <div className="game__prompt">{newWords}</div>;
}