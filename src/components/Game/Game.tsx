import Button from '../Button'
import Prompt from '../Prompt'
import Input from '../Input'
import Modal from '../Modal'

type GameProps = {
  timeRemaining: number
  promptWords: Array<{ word: string; isCorrect: null | boolean }>
  currentIndex: number
  checkWord: (value: string) => void
  hasResults: boolean
  handleCountdown: () => void
  reset: () => void
}

export default function Game({
  timeRemaining,
  promptWords,
  currentIndex,
  checkWord,
  hasResults,
  handleCountdown,
  reset,
}: GameProps) {
  return (
    <div>
      <Button />
      <h1>Countdown: {timeRemaining}</h1>
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
