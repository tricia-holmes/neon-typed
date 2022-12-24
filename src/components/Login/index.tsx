import { useState, SyntheticEvent } from 'react'
import './Login.css'

type LoginProps = {
  setToken: (value: boolean) => void
}

export default function Login({ setToken }: LoginProps) {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault()
    setToken(true)
  }

  return (
    <div className='login__background'>
      <form className='login__form' onSubmit={(e) => handleSubmit(e)}>
        <h1>Login Form</h1>
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
        <p>
          Need an account?
          <br />
          <a href='#'> Sign Up</a>
        </p>
      </form>
    </div>
  )
}
