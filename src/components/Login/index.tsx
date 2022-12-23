import { useState } from 'react'

export default function Login() {
  const [username, setUsername] = useState('')

  return (
    <div>
      <form>
        <label htmlFor='username'>Username:</label>
        <input
          type='text'
          id='username'
          onChange={(e) => setUsername(e.target.value)}
          value={username}
          autoComplete='off'
          required
        />
      </form>
    </div>
  )
}
