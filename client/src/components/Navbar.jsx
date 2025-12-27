import { NavLink } from "react-router-dom";

const navItems = [
  { name: "Maintenance", path: "/maintenance" },
  { name: "Dashboard", path: "/" },
  { name: "Maintenance Calendar", path: "/calendar" },
  { name: "Equipment", path: "/equipment" },
  { name: "Reporting", path: "/reporting" }, 
  { name: "Teams", path: "/teams" },
];

export default function Navbar() {
  return (
    <header className="bg-[#f9fafb] border-b px-6">
      <nav className="flex items-center justify-center gap-10 h-14">
        {navItems.map((item) => (
          <NavLink
            key={item.name}
            to={item.path}
            end={item.path === "/"}
            className={({ isActive }) =>
              `
  text-sm font-medium transition-colors
  ${
    isActive
      ? "text-gray-800 border-b-2 border-teal-500 pb-0.5"
      : "text-gray-500 hover:text-gray-700"
  }
  `
            }
          >
            {item.name}
          </NavLink>
        ))}
      </nav>
    </header>
  );
}
