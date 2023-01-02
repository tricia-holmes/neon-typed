import { useState, useCallback, useEffect } from 'react'
import { getTokenFromLocalStorage } from '../../utilis/common'
import { API_ROUTES, APP_ROUTES } from '../../utilis/constants'
import { useNavigate } from 'react-router-dom'
import './Game.css'
import Button from '../Button'
import Prompt from '../Prompt'
import Input from '../Input'
import Modal from '../Modal'
import Profile from '../Profile'

type PromptWords = {
  word: string
  isCorrect: null | boolean
}

export default function Game() {
  const navigate = useNavigate()
  const STARTING__TIME = 30
  const [isLoggedOut, setisLoggedOut] = useState(false)
  const [timeRemaining, setTimeRemaining] = useState(STARTING__TIME)
  const [isTimeRunning, setIsTimeRunning] = useState(false)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [promptWords, setPromptWords] = useState<PromptWords[]>([])
  const [hasResults, setHasResults] = useState(false)
  const [showProfile, setShowProfile] = useState(false)

  const fetchData = useCallback(async () => {
    const token = getTokenFromLocalStorage()
    if (!token) {
      navigate(APP_ROUTES.LOGIN)
      return
    }

    const response = await fetch(API_ROUTES.GET_WORDS, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    const data = await response.json()

    const wordsData = data.words
    const wordObjs = wordsData.map((word: string) => {
      return { word, isCorrect: null }
    })

    setPromptWords(wordObjs)
  }, [])

  useEffect(() => {
    if (isLoggedOut) {
      navigate(APP_ROUTES.LOGIN)
    }
  }, [isLoggedOut])

  useEffect(() => {
    fetchData().catch(console.error) //need to add error handling
  }, [])

  useEffect(() => {
    let interval = 0

    if (isTimeRunning) {
      interval = setInterval(() => {
        setTimeRemaining((time: number) => time - 1)
      }, 1000)
    }

    return () => {
      clearInterval(interval)
    }
  }, [isTimeRunning])

  useEffect(() => {
    if (isTimeRunning && timeRemaining === 0) {
      setHasResults(true)
      setIsTimeRunning(false)
    }
  }, [timeRemaining])

  const updateWord = (isCorrect: boolean) => {
    const newPromptWords = [...promptWords]
    newPromptWords[currentIndex] = {
      ...newPromptWords[currentIndex],
      isCorrect,
    }
    setPromptWords(newPromptWords)
  }

  const checkWord = (inputText: string) => {
    updateWord(promptWords[currentIndex].word === inputText)
    setCurrentIndex((currentIndex: number) => currentIndex + 1)
  }

  const handleCountdown = () => {
    if (!isTimeRunning) {
      setIsTimeRunning(true)
    }
  }

  const reset = () => {
    fetchData()
    setTimeRemaining(STARTING__TIME)
    setCurrentIndex(0)
    setPromptWords(
      promptWords.map((word) => {
        return { ...word, isCorrect: null }
      })
    )
    setHasResults(false)
  }

  const logout = () => {
    localStorage.removeItem('token')
    setisLoggedOut(true)
  }

  return (
    <div className='game'>
      {showProfile && <Profile setShowProfile={setShowProfile} />}
      <button onClick={logout}>Logout</button>
      <button onClick={() => setShowProfile(true)}>Profile</button>
      <Button />
      <h1 className='game__countdown'>Countdown: <span className='game__time'>{timeRemaining}</span></h1>
      <Prompt words={promptWords} currentIndex={currentIndex} />
      <Input
        checkWord={checkWord}
        hasResults={hasResults}
        handleCountdown={handleCountdown}
      />
      {hasResults && <Modal promptWords={promptWords} reset={reset} />}
    </div>
  )
}
