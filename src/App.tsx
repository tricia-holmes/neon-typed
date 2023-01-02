import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from 'react-router-dom'
import './App.css'
import Game from './components/Game'
import Login from './components/Login'
import Signup from './components/Signup'
import Welcome from './components/Welcome'
import { APP_ROUTES } from './utilis/constants'

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Welcome />} />
        <Route path={APP_ROUTES.SIGN_UP} element={<Signup />} />
        <Route path={APP_ROUTES.LOGIN} element={<Login />} />
        <Route path={APP_ROUTES.GAME} element={<Game />} />
        <Route path='*' element={<Navigate to='/' replace />} />
      </Routes>
    </Router>
  )
}
export default App
