import { useState, SyntheticEvent, useEffect } from 'react'
import './SignUp.css'
import { API_ROUTES, APP_ROUTES } from '../../utilis/constants'
import { Link, useNavigate } from 'react-router-dom'
import { getTokenFromLocalStorage } from '../../utilis/common'

export default function SignUp() {
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

  const handleSignUpSubmit = async (e: SyntheticEvent) => {
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
      <form className='signup__form' onSubmit={(e) => handleSignUpSubmit(e)}>
        <div className='headers__container'>
          <h1>Login</h1>
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
        <button className='signup_btn'>Sign up</button>
        {isLoading ? <p>Loading...</p> : null}
        {error ? <p>{error}</p> : null}
      </form>
    </div>
  )
}