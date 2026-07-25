import { BrowserRouter, Route, Routes } from 'react-router-dom'
import AppLayout from './components/layout/AppLayout'
import { ThemeProvider } from './context/ThemeContext'
import Dashboard from './pages/Dashboard'
import CheckIn from './pages/CheckIn'
import GuestList from './pages/GuestList'
import CheckOut from './pages/CheckOut'
import RoomAvailability from './pages/RoomAvailability'
import { RoomManagement } from './pages/Rooms'
import { Billing, Reports, Settings } from './pages/MiscPages'

export default function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<AppLayout />}>
            <Route path="/" element={<Dashboard />} />
            <Route path="/check-in" element={<CheckIn />} />
            <Route path="/guests" element={<GuestList />} />
            <Route path="/check-out" element={<CheckOut />} />
            <Route path="/rooms/availability" element={<RoomAvailability />} />
            <Route path="/rooms/management" element={<RoomManagement />} />
            <Route path="/billing" element={<Billing />} />
            <Route path="/reports" element={<Reports />} />
            <Route path="/settings" element={<Settings />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  )
}
