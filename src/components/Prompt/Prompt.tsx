import "./Prompt.css";
import Word from "../Word/Word";

type PromptProps = {
  words: Array<{ word: string; isCorrect: null | boolean}>;
  currentIndex: number
};

export default function Prompt({ words, currentIndex }: PromptProps) {
  const newWords = words.map((item, index) => (
    <Word
    key={`word ${index}`}
    word={item.word}
    isCorrect={item.isCorrect}
    isCurrent={currentIndex === index}
    />
  ));
  return <div className="game__prompt">{newWords}</div>;
}