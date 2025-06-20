import { Home, Search, Bookmark, User } from "lucide-react"; // Optional: Replace with your icon set
import { Link, useLocation } from "react-router-dom"; // If you're using React Router

export default function BottomNav() {
  const location = useLocation();

  const navItems = [
    { label: "Home", icon: <Home size={20} />, path: "/Home" },
    { label: "Search", icon: <Search size={20} />, path: "/search" },
    { label: "Library", icon: <Bookmark size={20} />, path: "/library" },
    { label: "Profile", icon: <User size={20} />, path: "/profile" },
  ];

  return (
    <footer className="absolute w-full bottom-0 bg-input text-white py-3 px-6 flex justify-between items-center shadow-inner z-50">
      {navItems.map((item) => (
        <Link
          key={item.label}
          to={item.path}
          className={`flex flex-col items-center text-xs ${
            location.pathname === item.path ? "text-red-500" : "text-white"
          }`}
        >
          {item.icon}
          <span className="mt-1">{item.label}</span>
        </Link>
      ))}
    </footer>
  );
}
