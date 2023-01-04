import { useCallback, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { getTokenFromLocalStorage } from '../../utilis/common'
import { API_ROUTES, APP_ROUTES } from '../../utilis/constants'
import './Modal.css'

type ModalPrompts = {
  promptWords: Array<{
    word: string
    isCorrect: null | boolean
  }>
  reset: () => void
}

export default function Modal({ promptWords, reset }: ModalPrompts) {
  const navigate = useNavigate()
  const WPM = promptWords.filter((word) => word.isCorrect).length * 2
  const correct = promptWords.filter((word) => word.isCorrect).length
  const incorrect = promptWords.filter(
    (word) => word.isCorrect === false
  ).length
  const calculate = Math.round(((correct / (correct + incorrect)) * 100))
  const accuracy = calculate ? calculate : 0

  const postResults = useCallback(async () => {
    const token = getTokenFromLocalStorage()  
    if (!token) {
      navigate(APP_ROUTES.LOGIN)
      return
    }

    const response = await fetch(API_ROUTES.POST_TEST, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ wpm: WPM, accuracy: accuracy }),
    })
    const data = await response.json()
  }, [])

  useEffect(() => {
    postResults().catch(console.error)
  }, [])

  return (
    <div className='modal'>
      <div className='modal__container'>
        <button onClick={reset}>Close</button>
        <h1>Your Results</h1>
        <p>WPM: {WPM}</p>
        <p>CORRECT: {correct}</p>
        <p>INCORRECT: {incorrect}</p>
        <p>Accuracy: {accuracy}%</p>
      </div>
    </div>
  )
}
