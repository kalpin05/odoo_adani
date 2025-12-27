import { NavLink } from "react-router-dom"

export default function Navbar() {
  return (
    <nav className="w-60 border-r p-4 space-y-3">
      <NavLink to="/">Dashboard</NavLink>
      <NavLink to="/maintenance">Maintenance</NavLink>
      <NavLink to="/equipment">Equipment</NavLink>
      <NavLink to="/work-centers">Work Centers</NavLink>
      <NavLink to="/teams">Teams</NavLink>
      <NavLink to="/calendar">Calendar</NavLink>
    </nav>
  )
}
