type ScorePrompts = {
  index: number
  wpm: number
  username: string
}

export default function Score({ index, wpm, username }: ScorePrompts) {
  return (
    <tr>
      <td>{index}</td>
      <td>{wpm}</td>
      <td>{username}</td>
    </tr>
  )
}
