const API_URL = 'http://localhost:8000'

export const API_ROUTES = {
  SIGN_UP: `${API_URL}/signup`,
  LOGIN: `${API_URL}/login`,
  GET_WORDS: `${API_URL}/words`,
  GET_PROFILE: `${API_URL}/profile`,
  GET_HIGHSCORES: `${API_URL}/typing-tests/highscores`,
  POST_TEST: `${API_URL}/typing-tests`,
}

export const APP_ROUTES = {
  WELCOME: '/welcome',
  SIGN_UP: '/signup',
  LOGIN: '/login',
  GAME: '/game',
}
