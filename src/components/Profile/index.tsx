import { useCallback, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import useUser from '../../hooks/useUser'
import { getTokenFromLocalStorage } from '../../utilis/common'
import { API_ROUTES, APP_ROUTES } from '../../utilis/constants'
import './Profile.css'

type ProfilePromots = {
  setShowProfile: (value: boolean) => void
}

export default function Profile({ setShowProfile }: ProfilePromots) {
  const [history, setHistory] = useState([])
  const { user } = useUser()

  const fetchHistory = useCallback(async () => {
    const token = getTokenFromLocalStorage()

    const response = await fetch(API_ROUTES.GET_HISTORY, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    const data = await response.json()

    const tests = data.map((test: any, index: number) => {
      return (
        <tr key={`test ${index}`}>
          <td>{test.wpm}</td>
          <td>{test.accuracy}</td>
          <td>{test.createdAt}</td>
        </tr>
      )
    })

    setHistory(tests)
  }, [])

  useEffect(() => {
    fetchHistory().catch(console.error)
  }, [])

  return (
    <div className='profile__modal'>
      <div className='profile__background'>
        <h1 className='profile__text'>Profile</h1>
        <p style={{ fontSize: '.9rem' }} className='profile__text'>
          {user}
        </p>
        <table>
          <tbody>
            <tr>
              <th>WPM</th>
              <th>ACCURACY</th>
              <th>TIMESTAMP</th>
            </tr>
            {history}
          </tbody>
        </table>
        <button onClick={() => setShowProfile(false)}>Close</button>
      </div>
    </div>
  )
}
