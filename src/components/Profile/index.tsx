import { useCallback, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { getTokenFromLocalStorage } from '../../utilis/common'
import { API_ROUTES, APP_ROUTES } from '../../utilis/constants'
import './Profile.css'

type ProfilePromots = {
  setShowProfile: (value: boolean) => void
}

export default function Profile({ setShowProfile }: ProfilePromots) {
  const navigate = useNavigate()
  const [history, setHistory] = useState([])

  const fetchHistory = useCallback(async () => {
    const token = getTokenFromLocalStorage()
    if (!token) {
      navigate(APP_ROUTES.LOGIN)
      return
    }

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
