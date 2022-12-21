import { useState, useEffect } from 'react'
import './App.css'
import Prompt from './components/Prompt'
import Input from './components/Input'
import { wordsData } from './wordsData'
import Modal from './components/Modal/Modal'

type PromptWords = {
  word: string
  isCorrect: null | boolean
}

function App() {
  const STARTING__TIME = 30
  const [timeRemaining, setTimeRemaining] = useState(STARTING__TIME)
  const [isTimeRunning, setIsTimeRunning] = useState(false)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [promptWords, setPromptWords] = useState<PromptWords[]>([])
  const [hasResults, setHasResults] = useState(false)

  useEffect(() => {
    const wordObjs = wordsData.map((word) => {
      return { word, isCorrect: null }
    })

    setPromptWords(wordObjs)
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
      {hasResults && <Modal promptWords={promptWords} reset={reset} />}
      <h1>Countdown: {timeRemaining}</h1>
      <Prompt words={promptWords} currentIndex={currentIndex} />
      <Input
        checkWord={checkWord}
        hasResults={hasResults}
        handleCountdown={handleCountdown}
      />
    </div>
  )
}
export default App
