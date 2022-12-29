
import { API_ROUTES } from './constants'

export function storeTokenInLocalStorage(token: string) {
  localStorage.setItem('token', JSON.stringify(token))
}

export function getTokenFromLocalStorage() {
  const token = localStorage.getItem('token')

  if (token) {
    const parsedToken = JSON.parse(token)
    return parsedToken
  }
}

export async function getUserProfile() {
  try {
    const token = getTokenFromLocalStorage()
    if (!token) {
      return null
    }

    const response = await fetch(API_ROUTES.GET_PROFILE, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })

    if (!response.ok) {
      const error = await response.json()
      throw new Error(error)
    }

    const data = await response.json()
    return data
  } catch (err) {
    console.error('An error occured during signing up: ', err)
  }
}
