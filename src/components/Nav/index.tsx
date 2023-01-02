import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { APP_ROUTES } from '../../utilis/constants'
import Leaderboard from '../Leaderboard/Index'
import Profile from '../Profile'
import './Nav.css'

type Title = JSX.IntrinsicElements['h4']

export default function Nav() {
  const navigate = useNavigate()
  const [open, setOpen] = useState(false)
  const [isLoggedOut, setisLoggedOut] = useState(false)
  const [showProfile, setShowProfile] = useState(false)
  const [title, setTitle] = useState<Title[]>([])

  const onClick = () => {
    setOpen(!open)
  }

  const logout = () => {
    localStorage.removeItem('token')
    setisLoggedOut(true)
  }

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
    if (isLoggedOut) {
      navigate(APP_ROUTES.HOME)
    }
  }, [isLoggedOut])

  return (
    <nav className='game__nav'>
      {showProfile && <Profile setShowProfile={setShowProfile} />}
      {open && <Leaderboard onClick={onClick} />}
      <div className='logo__container'>
        <h4 className='game__logo'>
          <>{title}</>
        </h4>
      </div>
      <div className='links__container'>
        <button className='nav__btn green' onClick={() => setShowProfile(true)}>
          Profile
        </button> 
        <button className='nav__btn blush' onClick={onClick}>
          Leaderboard
        </button>
        <button className='nav__btn cyan' onClick={logout}>
          Logout
        </button>
      </div>
    </nav>
  )
}
