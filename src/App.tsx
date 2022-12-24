import { useState, useEffect, useCallback } from 'react'
import './App.css'
import Login from './components/Login'
import Game from './components/Game/Game'

type PromptWords = {
  word: string
  isCorrect: null | boolean
}

function App() {
  const STARTING__TIME = 10
  const [token, setToken] = useState(false)
  const [timeRemaining, setTimeRemaining] = useState(STARTING__TIME)
  const [isTimeRunning, setIsTimeRunning] = useState(false)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [promptWords, setPromptWords] = useState<PromptWords[]>([])
  const [hasResults, setHasResults] = useState(false)

  const fetchData = useCallback(async () => {
    const response = await fetch('http://localhost:8000/words')
    const wordsData = await response.json()
    const wordObjs = wordsData.map((word: string) => {
      return { word, isCorrect: null }
    })

    setPromptWords(wordObjs)
  }, [])

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

  return (
    <div className='App'>
      {!token && <Login setToken={setToken}/>}
      {token && (
        <Game
          timeRemaining={timeRemaining}
          promptWords={promptWords}
          currentIndex={currentIndex}
          checkWord={checkWord}
          hasResults={hasResults}
          handleCountdown={handleCountdown}
          reset={reset}
        />
      )}
    </div>
  )
}
export default App
