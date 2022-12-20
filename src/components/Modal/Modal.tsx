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
  const [WPM, setWPM] = useState(0)
  const [correct, setCorrect] = useState(0)
  const [incorrect, setIncorrect] = useState(0)

  useEffect(() => {
    setWPM(promptWords.filter((word) => word.isCorrect).length * 12)
    setCorrect(promptWords.filter((word) => word.isCorrect).length)
    setIncorrect(promptWords.filter((word) => word.isCorrect === false).length)
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
      </div>
    </div>
  )
}
