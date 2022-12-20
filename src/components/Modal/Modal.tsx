import { useEffect, useState } from 'react'
import './Modal.css'

type ModalPrompts = {
  promptWords: Array<{
    word: string
    isCorrect: undefined | boolean
    index: number
  }>
  setPromptWords: (
    value: Array<{
      word: string
      isCorrect: undefined | boolean
      index: number
    }>
  ) => void
  setHasResults: (value: boolean) => void
}

export default function Modal({
  promptWords,
  setPromptWords,
  setHasResults,
}: ModalPrompts) {
  const [WPM, setWPM] = useState(
    promptWords.filter((word) => word.isCorrect).length * 12
  )
  const [correct, setCorrect] = useState(
    promptWords.filter((word) => word.isCorrect).length
  )
  const [incorrect, setIncorrect] = useState(
    promptWords.filter((word) => word.isCorrect === false).length
  )
  const [accuracy, setAccuracy] = useState(
    ((correct / (correct + incorrect)) * 100).toFixed(2)
  )

  useEffect(() => {
    // setWPM(promptWords.filter((word) => word.isCorrect).length * 12)
    // setCorrect(promptWords.filter((word) => word.isCorrect).length)
    // setIncorrect(promptWords.filter((word) => word.isCorrect === false).length)
    // setAccuracy((correct / (correct + incorrect)) * 100)
  }, [])

  const handleClick = () => {
    setPromptWords(
      promptWords.map((word) => {
        return { ...word, isCorrect: undefined }
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
