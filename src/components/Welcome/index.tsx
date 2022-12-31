import { useEffect, useState } from 'react'
import './Welcome.css'

type Title = JSX.IntrinsicElements[keyof JSX.IntrinsicElements]

export default function Welcome() {
  const [title, setTitle] = useState<Title[]>([])

  useEffect(() => {
    const styledTitle = 'Neon Typed'
      .split('')
      .map((letter: string, index: number) => {
        const color = `hsla(${Math.random() * 360}, 100%, 68%, 1)`
        const animation = `flicker ${Math.random() * 4}s linear both`
        console.log(color)
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
    <>
      <div className='title__container'>
        <>{title}</>
      </div>
      <div className='text__container'>
        <p
          className='welcome__text'
          onClick={() => {
            console.log('click!')
          }}
        >
          Click here to enter
        </p>
      </div>
    </>
  )
}
