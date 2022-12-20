import { useEffect, useState } from 'react'
import './Modal.css'

type ModalPrompts = {
  promptWords: Array<{
    word: string
    isCorrect: undefined | boolean
    index: number
  }>
}

export default function Modal({ promptWords }: ModalPrompts) {
  const [WPM, setWPM] = useState(0)
  const [correct, setCorrect] = useState(0)
  const [incorrect, setIncorrect] = useState(0)
 
  useEffect(() => {
    setWPM(promptWords.filter(word => word.isCorrect).length * 12)
    setCorrect(promptWords.filter(word => word.isCorrect).length)
    setIncorrect(promptWords.filter(word => word.isCorrect === false).length)
  }, [])

  return (
    <div className='modal'>
      <div className='modal__container'>
        <h1>Your Results</h1>
        <p>WPM: {WPM}</p>
        <p>CORRECT: {correct}</p>
        <p>INCORRECT: {incorrect}</p>
      </div>
    </div>
  )
}
