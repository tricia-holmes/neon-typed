import { useCallback, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { getTokenFromLocalStorage } from '../../utilis/common'
import { API_ROUTES, APP_ROUTES } from '../../utilis/constants'
import './Leaderboard.css'
import Score from '../Score'

type LeaderboardProps = {
  onClick: () => void
}

type Highscores = {
  username: string
  wpm: number
  createdAt: string
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
      return (
        <Score
          key={`score ${index}`}
          index={index + 1}
          wpm={score.wpm}
          username={score.username}
        />
      )
    })

    setScores(newScores)
    console.log(newScores)
  }, [])

  useEffect(() => {
    fetchHighscores().catch(console.error)
  }, [])

  return (
    <div className='leaderboard__modal'>
      <div className='leaderboard__background'>
        <div className='leaderboard__text'>LEADERBOARD</div>
        <table>
          <tbody>
            <tr>
              <th>RANK</th>
              <th>SCORE</th>
              <th>NAME</th>
            </tr>
            {scores}
          </tbody>
        </table>
        <button className='leaderboard__btn' onClick={onClick}>
          Close
        </button>
      </div>
    </div>
  )
}
