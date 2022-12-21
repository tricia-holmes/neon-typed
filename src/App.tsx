import { useState, useEffect } from 'react'
import './App.css'
import Prompt from './components/Prompt/Prompt'
import Input from './components/Input/Input'
import { wordsData } from './wordsData'
import Modal from './components/Modal/Modal'

type PromptWords = {
  word: string,
  isCorrect: null | boolean
}

function App() {
  const [timeRemaining, setTimeRemaining] = useState(30)
  const [isTimeRunning, setIsTimeRunning] = useState(false)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [promptWords, setPromptWords] = useState<PromptWords[]>([])
  const [hasResults, setHasResults] = useState(false)

  const runCountdown = () => {
    let interval = setInterval(() => {
      if (isTimeRunning && timeRemaining > 0) {
        setTimeRemaining((time: number) => time - 1)
      }

      if (timeRemaining === 0) {
        setHasResults(true)
        setIsTimeRunning(false)
        setTimeRemaining(30)
        setCurrentIndex(0)
      }

      return clearInterval(interval)
    }, 1000)
  }

  useEffect(() => {
    const wordObjs = wordsData.map((word) => {
      return { word, isCorrect: null}
    })

    setPromptWords(wordObjs)
  }, [])

  useEffect(() => {
    runCountdown()
  }, [isTimeRunning, timeRemaining])

  return (
    <div className='App'>
      {hasResults && (
        <Modal
          promptWords={promptWords}
          setPromptWords={setPromptWords}
          setHasResults={setHasResults}
        />
      )}
      <h1>Countdown: {timeRemaining}</h1>
      <Prompt words={promptWords} currentIndex={currentIndex} />
      <Input
        promptWords={promptWords}
        setPromptWords={setPromptWords}
        currentIndex={currentIndex}
        setCurrentIndex={setCurrentIndex}
        isTimeRunning={isTimeRunning}
        timeRemaining={timeRemaining}
        setIsTimeRunning={setIsTimeRunning}
        setTimeRemaining={setTimeRemaining}
        hasResults={hasResults}
      />
    </div>
  )
}
export default App
