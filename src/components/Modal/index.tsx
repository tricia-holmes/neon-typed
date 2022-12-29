import './Modal.css'

type ModalPrompts = {
  promptWords: Array<{
    word: string
    isCorrect: null | boolean
  }>
  reset: () => void
  
}

export default function Modal({
  promptWords,
  reset
}: ModalPrompts) {
  const WPM = promptWords.filter((word) => word.isCorrect).length * 2
  const correct = promptWords.filter((word) => word.isCorrect).length
  const incorrect = promptWords.filter(
    (word) => word.isCorrect === false
  ).length
  const accuracy = ((correct / (correct + incorrect)) * 100)
  
  return (
    <div className='modal'>
      <div className='modal__container'>
        <button onClick={reset}>Close</button>
        <h1>Your Results</h1>
        <p>WPM: {WPM}</p>
        <p>CORRECT: {correct}</p>
        <p>INCORRECT: {incorrect}</p>
        <p>Accuracy: {accuracy ? accuracy.toFixed(2) : 0}%</p>
      </div>
    </div>
  )
}
