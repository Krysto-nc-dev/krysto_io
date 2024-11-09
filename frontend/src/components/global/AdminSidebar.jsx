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
        {/* Main content */}
        <div className="p-4">{children}</div>
      </div>
    </div>
  );
};

export default AdminSidebar;
