import { Outlet } from "react-router-dom"
import Navbar from "../components/Navbar.jsx"

export default function AppLayout() {
  return (
    <div className="flex">
      <Navbar />
      <main className="flex-1 p-4">
        <Outlet />
      </main>
    </div>
  )
}
