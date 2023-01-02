import '../../../node_modules/augmented-ui/augmented-ui.min.css'
import './Prompt.css'
import Word from '../Word'
import { useEffect } from 'react'

type PromptProps = {
  words: Array<{ word: string; isCorrect: null | boolean }>
  currentIndex: number
}

export default function Prompt({ words, currentIndex }: PromptProps) {
  const newWords = words.map((item, index) => (
    <Word
      key={`word ${index}`}
      word={item.word}
      isCorrect={item.isCorrect}
      isCurrent={currentIndex === index}
    />
  ))

  useEffect(() => {
    const currentWord = document.querySelector('.highlighted')
    currentWord && currentWord.scrollIntoView({ block: 'center' })
  }, [currentIndex])

  return (
    <div className='prompt__container'>
      <div className='glow__container'>
        <div className='augs' data-augmented-ui></div>
      </div>
      <section className='augs background' data-augmented-ui>
        <div className='dots'></div>
        <div className='words__container'>
          <div className='words'>{newWords}</div>
        </div>
      </section>
    </div>
  )
}
