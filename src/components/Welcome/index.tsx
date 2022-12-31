import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { APP_ROUTES } from '../../utilis/constants'
import './Welcome.css'

type Title = JSX.IntrinsicElements['span']

export default function Welcome() {
  const [title, setTitle] = useState<Title[]>([])

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

  return (
    <div className='welcome'>
      <div className='title__container'>
        <>{title}</>
      </div>
      <div className='text__container'>
        <Link className='welcome__text' to={APP_ROUTES.LOGIN}>
          Click here to enter
        </Link>
      </div>
    </div>
  )
}
