import { useState, KeyboardEvent, ChangeEvent, useEffect, useRef } from 'react'
import { wordsData } from '../../wordsData'
import './Input.css'

type InputProps = {
  isTimeRunning: boolean
  timeRemaining: number
  currentIndex: number
  hasResults: boolean
  promptWords: Array<{
    word: string
    isCorrect: null | boolean
  }>
  setIsTimeRunning: (value: boolean) => void
  setTimeRemaining: (value: number) => void
  setCurrentIndex: (value: any) => void
  setPromptWords: (
    value: Array<{
      word: string
      isCorrect: null | boolean
    }>
  ) => void
}

export default function Input({
  promptWords,
  currentIndex,
  hasResults,
  setCurrentIndex,
  setPromptWords,
  isTimeRunning,
  timeRemaining,
  setIsTimeRunning,
  setTimeRemaining,
}: InputProps) {
  const [inputText, setInputText] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus()
    }
  }, [hasResults])

  useEffect(() => {
    if (timeRemaining === 0) {
      setTimeout(() => {
        setInputText('')
      }, 1000)
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

  const checkWord = () => {
    updateWord(promptWords[currentIndex].word === inputText)
    setCurrentIndex((currentIndex: number) => currentIndex + 1)
  }

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (!isTimeRunning) {
      setIsTimeRunning(true)
      setInputText('')
    }

    setInputText(e.currentTarget.value.trim())
  }

  const handleInput = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === ' ' || e.key === 'Space') {
      checkWord()
      setInputText('')
    }
  }

  return (
    <div>
      <input
        type='text'
        name='text'
        ref={inputRef}
        className='game__input'
        onChange={handleChange}
        onKeyDown={handleInput}
        value={inputText}
        disabled={hasResults}
        autoComplete='off'
      />
    </div>
  )
}
