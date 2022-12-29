import { useState, useEffect } from 'react'
import { APP_ROUTES } from '../utilis/constants'
import { getUserProfile } from '../utilis/common'
import { useNavigate } from 'react-router-dom'


 export default function useUser() {
  const navigate = useNavigate()
  const [user, setUser] = useState(null)

  useEffect(() => {
    async function getUser() {
      const user = await getUserProfile()

      if (!user) {
        navigate(APP_ROUTES.LOGIN)
        return
      }

      setUser(user.username)
    }

    getUser()
  }, [])

  return { user }
}


