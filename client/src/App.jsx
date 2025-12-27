import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"

import Login from "./pages/Login"
import Signup from "./pages/Signup"
import Dashboard from "./pages/Dashboard"
import MaintainanceReports from "./pages/MaintainanceReports.jsx"
import EquipmentList from "./pages/Equipment"
import WorkCenters from "./pages/WorkCenters"
import Teams from "./pages/Teams"
import Calendar from "./pages/Calendar"
import AppLayout from "./Layouts/AppLayout.jsx"
import ForgotPassword from "./pages/ForgotPassword.jsx"

function AuthGuard({ children }) {
  const token = localStorage.getItem("token")
  return token ? children : <Navigate to="/login" state={{ from: location }} replace />
}

export default function App() {
  const token = localStorage.getItem("token")
  const isAuthenticated = !!token

  return (
    <BrowserRouter>
      <Routes>
        {/* Public */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />

        {/* Protected */}
        {isAuthenticated ? (
          <Route element={<AppLayout />}>
            <Route path="/" element={<Dashboard />} />
            <Route path="/reporting" element={<MaintainanceReports />} />
            <Route path="/equipment" element={<EquipmentList />} />
            <Route path="/work-centers" element={<WorkCenters />} />
            <Route path="/teams" element={<Teams />} />
            <Route path="/calendar" element={<Calendar />} />
          </Route>
        ) : (
          <Route path="*" element={<Navigate to="/login" replace />} />
        )}
      </Routes>
    </BrowserRouter>
  )
}