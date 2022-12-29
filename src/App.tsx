import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from 'react-router-dom'
import './App.css'
import Game from './components/Game/Game'
import Login from './components/Login'
import SignUp from './components/SignUp'
import { APP_ROUTES } from './utilis/constants'

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Navigate to={APP_ROUTES.LOGIN} />} />
        <Route path={APP_ROUTES.SIGN_UP} element={<SignUp />} />
        <Route path={APP_ROUTES.LOGIN} element={<Login />} />
        <Route path={APP_ROUTES.GAME} element={<Game />} />
      </Routes>
    </Router>
  )
}
export default App
