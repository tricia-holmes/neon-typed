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
        throw new Error(response)
      }

      const data: any = await response.json()

      console.log('WHAT AM I', data.token)

      storeTokenInLocalStorage(data.token)
      navigate(APP_ROUTES.GAME)
    } catch (err) {
      console.error('Some error occured during signing in', err)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className='login__background'>
      <form className='login__form' onSubmit={(e) => handleLoginSubmit(e)}>
        <div className='headers__container'>
          <h1>Login</h1>
          <h1>Signup</h1>
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
        <button className='login_btn'>Login</button>
        {isLoading ? <p>Loading...</p> : null}
      </form>
    </div>
  )
}
