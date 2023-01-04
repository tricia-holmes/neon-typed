import { useCallback, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { getTokenFromLocalStorage } from '../../utilis/common'
import { API_ROUTES, APP_ROUTES } from '../../utilis/constants'
import './Leaderboard.css'
import Score from '../Score'

type LeaderboardProps = {
  onClick: () => void
}

export default function Leaderboard({ onClick }: LeaderboardProps) {
  const navigate = useNavigate()
  const [scores, setScores] = useState([])

  const fetchHighscores = useCallback(async () => {
    const token = getTokenFromLocalStorage()
    if (!token) {
      navigate(APP_ROUTES.LOGIN)
      return
    }

    const response = await fetch(API_ROUTES.GET_HIGHSCORES, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    const data = await response.json()

    const newScores = data.map((score: any, index: number) => {
      const date = new Date(score.createdAt)
      const timestamp = `${date.toLocaleDateString(
        'en-US'
      )} ${date.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
      })}`

      return (
        <Score
          key={`score ${index}`}
          index={index + 1}
          wpm={score.wpm}
          username={score.username}
          timestamp={timestamp}
        />
      )
    })

    setScores(newScores)
  }, [])

  useEffect(() => {
    fetchHighscores().catch(console.error)
  }, [])

  return (
    <div className='leaderboard__modal'>
      <div className='leaderboard__container leaderboard__bg'>
        <div className='leaderboard__headers'>
          <div className='leaderboard__text'>LEADERBOARD</div>
          <button className='leaderboard__btn' onClick={onClick}>
            X
          </button>
        </div>
        <table>
          <tbody>
            <tr>
              <th>RANK</th>
              <th>WPM</th>
              <th>NAME</th>
              <th>TIMESTAMP</th>
            </tr>
            {scores}
          </tbody>
        </table>
        <div className='leaderboard__blur'></div>
      </div>
    </div>
  )
}
