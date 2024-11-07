import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../../slices/authSlice"; // Assurez-vous que le chemin d'import est correct

const AdminSidebar = ({ children }) => {
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);

  // Fonction de déconnexion
  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-gray-800 text-white transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-200 ease-in-out md:relative md:translate-x-0`}
      >
        <div className="p-4 font-bold text-xl">Krysto Administration</div>
        <ul className="mt-4 space-y-2">
          <li>
            <Link
              to="/admin-dashboard"
              className="block px-4 py-2 hover:bg-gray-700"
            >
              Dashboard
            </Link>
          </li>
          <li>
            <Link
              to="/admin-users"
              className="block px-4 py-2 hover:bg-gray-700"
            >
              Utilisateurs
            </Link>
          </li>
        </ul>
        <button
          onClick={handleLogout}
          className="w-full px-4 py-2 mt-4 text-left hover:bg-gray-700"
        >
          Déconnexion
        </button>
      </div>

      {/* Content area */}
      <div className="flex-1 flex flex-col">
        {/* Navbar */}
        <div className="flex items-center justify-between bg-gray-100 p-4 shadow-md">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-gray-800 focus:outline-none md:hidden"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h7"
              />
            </svg>
          </button>
          <div className="text-xl font-bold">Krysto Administration</div>
          <div className="flex space-x-4">
            {/* Search and notifications icons can be added here if needed */}
          </div>
        </div>

        {/* Main content */}
        <div className="p-4">{children}</div>
      </div>
    </div>
  );
};

export default AdminSidebar;
