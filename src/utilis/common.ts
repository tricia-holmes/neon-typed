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

export function getAuthUser() {
  const defaultResponse = {authenticated: false, user: null}

  try {
    const token = getTokenFromLocalStorage()

    if (!token) {
      return defaultResponse
    }

    const 
  }
}
