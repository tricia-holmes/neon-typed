import './Word.css'

type WordPrompts = {
  word: string
  isCorrect: null | boolean
  isCurrent: boolean
}

const style = (isCurrent: boolean, isCorrect: null | boolean) => {
  if (isCurrent) {
    return 'highlighted word'
  } else if (isCorrect === null) {
    return 'default word'
  } else if (isCorrect) {
    return 'correct word'
  } else {
    return 'incorrect word'
  }
}

export default function Word({ word, isCurrent, isCorrect }: WordPrompts) {
  return <p className={style(isCurrent, isCorrect)}>{word}</p>
}
