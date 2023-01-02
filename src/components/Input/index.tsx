import '../../../node_modules/augmented-ui/augmented-ui.min.css'
import { useState, KeyboardEvent, ChangeEvent, useEffect, useRef } from 'react'
import './Input.css'

type InputProps = {
  checkWord: (value: string) => void
  handleCountdown: () => void
  hasResults: boolean
}

export default function Input({
  checkWord,
  hasResults,
  handleCountdown,
}: InputProps) {
  const [inputText, setInputText] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus()
    }

    setInputText('')
  }, [hasResults])

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    handleCountdown()
    setInputText(e.currentTarget.value.trim())
  }

  const handleInput = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === ' ' || e.key === 'Space') {
      checkWord(inputText)
      setInputText('')
    }
  }

  return (
    <div className='input__border'>
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
