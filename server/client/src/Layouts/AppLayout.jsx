import Navbar from "../components/Navbar"
import { Outlet } from "react-router-dom"

export default function AppLayout() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <div className="flex-1 min-h-screen bg-gradient-to-br from-[#dfeff0] via-[#e9edf7] to-[#f3e8f9]">
        <main className="p-6">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
