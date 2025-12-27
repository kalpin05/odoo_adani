import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"

import Auth from "./pages/Auth"
import Dashboard from "./pages/Dashboard"
import MaintenanceBoard from "./pages/MaintenanceBoard"
import MaintenanceForm from "./pages/MaintenanceForm"
import MaintainanceReports from "./pages/MaintainanceReports.jsx"
import EquipmentList from "./pages/EquipmentList"
import WorkCenters from "./pages/WorkCenters"
import Teams from "./pages/Teams"
import Calendar from "./pages/Calendar"
import AppLayout from "./Layouts/AppLayout.jsx"

export default function App() {
  const isAuthenticated = true // fake for hackathon

  return (
    <BrowserRouter>
      <Routes>
        {/* Public */}
        <Route path="/login" element={<Auth />} />

        {/* Protected */}
        {isAuthenticated ? (
          <Route element={<AppLayout />}>
            <Route path="/" element={<Dashboard />} />
            <Route path="/maintenance" element={<MaintenanceBoard />} />
            <Route path="/maintenance/new" element={<MaintenanceForm />} />
            <Route path="/reporting" element={<MaintainanceReports />} />
            <Route path="/equipment" element={<EquipmentList />} />
            <Route path="/work-centers" element={<WorkCenters />} />
            <Route path="/teams" element={<Teams />} />
            <Route path="/calendar" element={<Calendar />} />
          </Route>
        ) : (
          <Route path="*" element={<Navigate to="/login" />} />
        )}
      </Routes>
    </BrowserRouter>
  )
}
