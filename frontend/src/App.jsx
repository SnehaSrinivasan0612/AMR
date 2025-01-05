import Navbar from './components/Navbar.jsx'
import { Routes, Route, BrowserRouter } from 'react-router-dom'
import Bill from './pages/Bill.jsx'
import Help from './pages/Help.jsx'
import History from './pages/History.jsx'
import Dashboard from './pages/Dashboard.jsx'
import Login from './pages/Login.jsx'
function App() {
  
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/history" element={<History />} />
          <Route path="/bill" element={<Bill />} />
          <Route path="/help" element={<Help />} />
          <Route path="/" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
