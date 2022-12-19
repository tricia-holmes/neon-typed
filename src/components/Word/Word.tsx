import "./Word.css";

type WordPrompts = {
  word: string;
  index: number;
  isCorrect: undefined | boolean;
  currentIndex: number;
};

const style = (
  index: number,
  currentIndex: number,
  isCorrect: undefined | boolean
) => {
  if (currentIndex === index) {
    return "highlighted word";
  } else if (isCorrect === undefined) {
    return "default word";
  } else if (isCorrect) {
    return "correct word";
  } else {
    return "incorrect word";
  }
};

export default function Word({
  word,
  index,
  currentIndex,
  isCorrect,
}: WordPrompts) {

  return (
    <p
      className={style(index, currentIndex, isCorrect)}
      key={index}
    >
      {word}
    </p>
  );
}
