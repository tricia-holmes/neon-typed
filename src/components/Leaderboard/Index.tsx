import { useState } from 'react'
import './Leaderboard.css'

type LeaderboardProps = {
  onClick: () => void
}

export default function Leaderboard({ onClick }: LeaderboardProps) {
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
            <tr>
              <td>1</td>
              <td>150</td>
              <td>Tommy</td>
            </tr>
            <tr>
              <td>2</td>
              <td>130</td>
              <td>Tinky</td>
            </tr>
            <tr>
              <td>3</td>
              <td>123</td>
              <td>Spicy</td>
            </tr>
            <tr>
              <td>4</td>
              <td>123</td>
              <td>Spicy</td>
            </tr>
            <tr>
              <td>5</td>
              <td>123</td>
              <td>Spicy</td>
            </tr>
            <tr>
              <td>6</td>
              <td>123</td>
              <td>Spicy</td>
            </tr>
            <tr>
              <td>7</td>
              <td>123</td>
              <td>Spicy</td>
            </tr>
            <tr>
              <td>8</td>
              <td>123</td>
              <td>Spicy</td>
            </tr>
            <tr>
              <td>9</td>
              <td>123</td>
              <td>Spicy</td>
            </tr>
            <tr>
              <td>10</td>
              <td>123</td>
              <td>Spicy</td>
            </tr>
          </tbody>
        </table>
        <button className='leaderboard__btn' onClick={onClick}>
          Close
        </button>
      </div>
    </div>
  )
}
