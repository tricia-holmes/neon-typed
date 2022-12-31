import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { APP_ROUTES } from '../../utilis/constants'
import './Welcome.css'

type Title = JSX.IntrinsicElements['span']

export default function Welcome() {
  const TYPING_SPEED = 150
  const ERASING_SPEED = 50
  const [title, setTitle] = useState<Title[]>([])
  const taglines = ['A typing test game', 'Click here to enter']
  const [typingSpeed, setTypingSpeed] = useState(TYPING_SPEED)
  const [text, setText] = useState('')
  const [isErasing, setIsErasing] = useState(false)
  const [loop, setLoop] = useState(0)
  const i = loop % taglines.length
  const fullText = taglines[i]

  useEffect(() => {
    const styledTitle = 'Neon Typed'
      .split('')
      .map((letter: string, index: number) => {
        const color = `hsla(${Math.random() * 360}, 100%, 68%, 1)`
        const animation = `flicker ${Math.random() * 4}s linear both`

        return (
          <span
            key={`span ${index}`}
            className='welcome__title'
            style={{ color: `${color}`, animation: `${animation}` }}
          >
            {letter}
          </span>
        )
      })

    setTitle(styledTitle)
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      handleTyping()
    }, typingSpeed)

    return () => clearInterval(interval)
  }, [text, isErasing])

  const handleTyping = () => {
    setText(
      isErasing
        ? fullText.substring(0, text.length - 1)
        : fullText.substring(0, text.length + 1)
    )
    setTypingSpeed(isErasing ? ERASING_SPEED : TYPING_SPEED)

    if (!isErasing && text === fullText) {
      setTimeout(() => {
        setIsErasing(true)
      }, 500)
    } else if (isErasing && text === '') {
      setIsErasing(false)
      setLoop(loop + 1)
    }
  }
  
  return (
    <div className='welcome'>
      <div className='title__container'>
        <>{title}</>
      </div>
      <div className='text__container'>
        <Link className='welcome__text' to={APP_ROUTES.LOGIN}>
          <span>{text}</span>
          <span className='cursor' />
        </Link>
      </div>
    </div>
  )
}
