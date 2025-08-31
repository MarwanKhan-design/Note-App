import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import Signup from './pages/Signup'
import CreateNotes from './pages/CreateNotes'
import PrivateRoute from './components/PrivateRoute'
import Navbar from './components/Navbar'
import PublicRoute from './components/PublicRoute'
import { useAuthStore } from './store/authStore'
import { useEffect } from 'react'

function App() {
  const { checkToken, token } = useAuthStore()

  useEffect(() => {
    checkToken()
  }, [checkToken, token])

  return (
    <>
      <Navbar />
      <Routes>
        <Route path='/' element={<PrivateRoute><Home /></PrivateRoute>} />
        <Route path='/create/note' element={<PrivateRoute><CreateNotes /></PrivateRoute>} />
        <Route path='/login' element={<PublicRoute> <Login /></PublicRoute>} />
        <Route path='/signup' element={<PublicRoute> <Signup /></PublicRoute>} />
      </Routes>
    </>
  )
}

export default App
