import { useCallback, useEffect, useState } from 'react'
import useUser from '../../hooks/useUser'
import { getTokenFromLocalStorage } from '../../utilis/common'
import { API_ROUTES } from '../../utilis/constants'
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
      const date = new Date(test.createdAt)
      const timestamp = `${date.toLocaleDateString(
        'en-US'
      )} ${date.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
      })}`

      return (
        <tr key={`test ${index}`}>
          <td>{test.wpm}</td>
          <td>{`${test.accuracy}%`}</td>
          <td>{timestamp}</td>
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
      <div className='profile__container'>
        <button onClick={() => setShowProfile(false)}>Back</button>
        <div className='profile__user'>
            <h1 className='profile__text'>Profile:</h1>
          <h1 className='profile__name'>
            {user}
          </h1>
        </div>
        <div className='history__container'>
        <h2 className='history__title'>History</h2>
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
        </div>
      </div>
    </div>
  )
}
