import { useState } from 'react'
import Leaderboard from '../Leaderboard/Index'
import './Button.css'

export default function Button() {
  const [open, setOpen] = useState(false)

const onClick = () => {
  setOpen(!open)
}

  return (
    <div className='btn__container'>
      <button onClick={onClick} >Leaderboard</button>
      {open && <Leaderboard onClick={onClick}/>}
    </div>
  )
}
