type ScorePrompts = {
  index: number
  wpm: number
  username: string
  timestamp: string
}

export default function Score({ index, wpm, username, timestamp }: ScorePrompts) {
  return (
    <tr>
      <td>{index}</td>
      <td>{wpm}</td>
      <td>{username}</td>
      <td>{timestamp}</td>
    </tr>
  )
}
