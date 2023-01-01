import { useState, SyntheticEvent, useEffect } from 'react'
import './Signup.css'
import { API_ROUTES, APP_ROUTES } from '../../utilis/constants'
import { Link, useNavigate } from 'react-router-dom'
import { getTokenFromLocalStorage } from '../../utilis/common'

export default function Signup() {
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

  const handleSignupSubmit = async (e: SyntheticEvent) => {
    e.preventDefault()
    try {
      setIsLoading(false)
      const response: any = await fetch(API_ROUTES.SIGN_UP, {
        method: 'POST',
        body: JSON.stringify({ username, password }),
        headers: {
          'Content-Type': 'application/json',
        },
      })

      if (!response.ok) {
        const error = await response.json()
        console.log('RESPONSE', error)
        throw new Error(error.message)
      }

      const data: any = await response.json()

      console.log('WHAT AM I', data)

      navigate(APP_ROUTES.LOGIN)
    } catch (err: any) {
      console.error('An error occured during signing up: ', err)
      setError(err.message)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className='signup__background'>
      <div className='yellow'>
        <form className='signup__form' onSubmit={(e) => handleSignupSubmit(e)}>
          <div className='headers__container'>
            <h1>Sign Up</h1>
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
          {error ? <p className='signup__error'>{error}</p> : null}
          <button className='signup_btn'>Submit</button>
          {isLoading ? <p className='loading'>Loading...</p> : null}
          <p className='signup__question'>
            Already have an account?
            <Link to={APP_ROUTES.LOGIN} className='signup__link'>
              {' '}
              Login here!
            </Link>
          </p>
        </form>
      </div>
      <div className='purple'></div>
      <h1 className='signup__left-title'>
        <Link to='/'>Neon</Link>
      </h1>
      <h1 className='signup__right-title'><Link to='/'>Typed</Link></h1>
    </div>
  )
}
