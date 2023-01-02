import { useState, SyntheticEvent, useEffect } from 'react'
import './Login.css'
import { API_ROUTES, APP_ROUTES } from '../../utilis/constants'
import { Link, useNavigate } from 'react-router-dom'
import {
  getTokenFromLocalStorage,
  storeTokenInLocalStorage,
} from '../../utilis/common'

export default function Login() {
  const navigate = useNavigate()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    const token = getTokenFromLocalStorage()
    if (token) {
      navigate(APP_ROUTES.GAME)
    }
  }, [])

  useEffect(() => {
    if (error) {
      setError('')
    }
  }, [username, password])

  const handleLoginSubmit = async (e: SyntheticEvent) => {
    e.preventDefault()
    try {
      setIsLoading(true)
      const response: any = await fetch(API_ROUTES.LOGIN, {
        method: 'POST',
        body: JSON.stringify({ username, password }),
        headers: {
          'Content-Type': 'application/json',
        },
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.message)
      }

      const data: any = await response.json()

      storeTokenInLocalStorage(data.token)
      navigate(APP_ROUTES.GAME)
    } catch (err: any) {
      setError(err.message)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className='login__background'>
      <div className='blue'>
        <form className='login__form' onSubmit={(e) => handleLoginSubmit(e)}>
          <div className='headers__container'>
            <h1 style={{ letterSpacing: '5px' }}>Login</h1>
          </div>
          <div className='input__container'>
            <input
              type='text'
              id='username'
              placeholder='username'
              onChange={(e) => setUsername(e.target.value)}
              value={username}
              autoComplete='off'
              required
            />
          </div>
          <div className='input__container'>
            <input
              type='password'
              id='password'
              placeholder='password'
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              autoComplete='off'
              required
            />
          </div>
          {error ? <p className='login__error'>{error}</p> : null}
          <button className='login_btn'>Submit</button>
          {isLoading ? <p className='login__loading'>Loading...</p> : null}
          <p className='login__question'>
            Don't have an account?
            <Link to={APP_ROUTES.SIGN_UP} className='login__link'>
              {' '}
              Sign up here!
            </Link>
          </p>
        </form>
      </div>
      <div className='pink'></div>
      <h1 className='left-title'>
        <Link to='/'>Neon Typed</Link>
      </h1>
      <h1 className='right-title'>
        <Link to='/'>Neon Typed</Link>
      </h1>
    </div>
  )
}
