import './Modal.css'

type ModalPrompts = {
  promptWords: Array<{
    word: string
    isCorrect: null | boolean
  }>
  setPromptWords: (
    value: Array<{
      word: string
      isCorrect: null | boolean
    }>
  ) => void
  setHasResults: (value: boolean) => void
}

export default function Modal({
  promptWords,
  setPromptWords,
  setHasResults,
}: ModalPrompts) {
  const WPM = promptWords.filter((word) => word.isCorrect).length * 2
  const correct = promptWords.filter((word) => word.isCorrect).length
  const incorrect = promptWords.filter(
    (word) => word.isCorrect === false
  ).length
  const accuracy = ((correct / (correct + incorrect)) * 100).toFixed(2)

  const handleClick = () => {
    setPromptWords(
      promptWords.map((word) => {
        return { ...word, isCorrect: null }
      })
    )
    setHasResults(false)
  }

  return (
    <div className='modal'>
      <div className='modal__container'>
        <button onClick={handleClick}>Close</button>
        <h1>Your Results</h1>
        <p>WPM: {WPM}</p>
        <p>CORRECT: {correct}</p>
        <p>INCORRECT: {incorrect}</p>
        <p>Accuracy: {accuracy}%</p>
      </div>
    </div>
  )
}
