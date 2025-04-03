import Navbar from './components/Navbar.jsx'
import { Routes, Route, BrowserRouter } from 'react-router-dom'
import Bill from './pages/Bill.jsx'
import Help from './pages/Help.jsx'
import History from './pages/History.jsx'
import Dashboard from './pages/Dashboard.jsx'
import Login from './pages/Login.jsx'
import Home from './pages/Home.jsx'
import AdminLogin from './pages/AdminLogin.jsx'
import AdminDashboard from './pages/AdminDashboard.jsx'
import Help_Dashboard from './components/Help_Dashboard.jsx'
import Help_faqs from './components/Help_faqs.jsx'
import Help_troubleshoot from './components/Help_troubleshoot.jsx'
import Help_Analytics from './components/Help_Analytics.jsx'
import Help_manage from './components/Help_manage.jsx'
import Profile from './pages/Profile.jsx'

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/history" element={<History />} />
          <Route path="/bill" element={<Bill />} />
          <Route path="/help" element={<Help />} />
          <Route path="/help/dashboard" element={<Help_Dashboard />} />
          <Route path="/help/faqs" element={<Help_faqs />} />
          <Route path="/help/troubleshoot" element={<Help_troubleshoot />} />
          <Route path="/help/analytics" element={<Help_Analytics />} />
          <Route path="/help/bills" element={<Help_manage />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
