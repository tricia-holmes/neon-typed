import { useCallback, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { getTokenFromLocalStorage } from '../../utilis/common'
import { API_ROUTES, APP_ROUTES } from '../../utilis/constants'
import './Modal.css'
import brokenHeart from '../../assets/images/broken_heart.jpg'
import smile from '../../assets/images/smile.jpg'
import star from '../../assets/images/star.jpg'
import clock from '../../assets/images/clock.jpg'

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
  const calculate = Math.round((correct / (correct + incorrect)) * 100)
  const accuracy = calculate ? calculate : 0

  const postResults = useCallback(async () => {
    const token = getTokenFromLocalStorage()
    if (!token) {
      navigate(APP_ROUTES.LOGIN)
      return
    }

    await fetch(API_ROUTES.POST_TEST, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ wpm: WPM, accuracy: accuracy }),
    })
  }, [])

  useEffect(() => {
    postResults().catch(console.error)
  }, [])

  useEffect(() => {
    const timer = setTimeout(() => {
      let interval = 1000
      let resultDisplays = document.querySelectorAll('.results__num')

      resultDisplays.forEach((result) => {
        let startValue = 0
        let amount = result.getAttribute('data-val')
        let endValue = Number(amount)
        let duration = Math.floor(interval / endValue)

        if (endValue === 0) {
          return
        }

        let counter = setInterval(() => {
          startValue += 1

          result.textContent = startValue.toString()

          if (endValue === 0) {
            clearInterval(counter)
          }

          if (startValue === endValue) {
            clearInterval(counter)
          }
        }, duration)
      })
    }, 200)

    return () => {
      clearTimeout(timer)
    }
  }, [])

  return (
    <div className='results__modal'>
      <div className='results__headers'>
        <h1>Your Results</h1>
        <button onClick={reset}>Close</button>
      </div>
      <div className='results__background'>
        <div className='results__wrapper'>
          <div className='results__container'>
            <img src={clock} alt='neon clock icon' />
            <span className='results__num' data-val={WPM}>
              0
            </span>
            <span className='results__text purple__text'>WPM</span>
          </div>

          <div className='results__container'>
            <img src={star} alt='neon star icon' />
            <span className='results__num' data-val={accuracy}>
              0
            </span>
            <span className='results__text yellow__text'>ACCURACY</span>
          </div>

          <div className='results__container'>
            <img src={smile} alt='neon smiley face icon' />
            <span className='results__num' data-val={correct}>
              0
            </span>
            <span className='results__text green__text'>CORRECT</span>
          </div>

          <div className='results__container'>
            <img src={brokenHeart} alt='neon broken heart icon' />
            <span className='results__num' data-val={incorrect}>
              0
            </span>
            <span className='results__text red__text'>INCORRECT</span>
          </div>
        </div>
      </div>
    </div>
  )
}
