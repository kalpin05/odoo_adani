import { NavLink } from "react-router-dom";

const navItems = [
  { name: "Dashboard", path: "/" },
  { name: "Equipment", path: "/equipment" },
  { name: "Work Centers", path: "/work-centers" },
  { name: "Teams", path: "/teams" },
  { name: "Calendar", path: "/calendar" },
  { name: "Reports", path: "/reporting" },
];

export default function Navbar() {
  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

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

        <button
          onClick={handleLogout}
          className="text-sm text-gray-500 hover:text-gray-700"
        >
          Logout
        </button>
      </nav>
    </header>
  );
}