// import React, { useState } from "react";
// import { Link } from "react-router-dom";
// import { useDispatch } from "react-redux";
// import { logout } from "../../slices/authSlice"; // Assurez-vous que le chemin d'import est correct

// const PrivateSidebar = ({ children }) => {
//   const dispatch = useDispatch();
//   const [isOpen, setIsOpen] = useState(false);

//   // Fonction de déconnexion
//   const handleLogout = () => {
//     dispatch(logout());
//   };

//   return (
//     <div className="flex h-screen">
//       {/* Sidebar */}
//       <div
//         className={`fixed top-0 left-0 h-full w-64 bg-gray-800 text-white transform ${
//           isOpen ? "translate-x-0" : "-translate-x-full"
//         } transition-transform duration-200 ease-in-out md:relative md:translate-x-0`}
//       >
//         <div className="p-4 font-bold text-xl">Private dashboard</div>
//         <ul className="mt-4 space-y-2">
//           <li>
//             <Link
//               to="/private-dashboard"
//               className="block px-4 py-2 hover:bg-gray-700"
//             >
//               Dashboard
//             </Link>
//           </li>
//           <li>
//             <Link
//               to="/private-plastic-colors"
//               className="block px-4 py-2 hover:bg-gray-700"
//             >
//               Couleurs plastique
//             </Link>
//           </li>
//           <li>
//             <Link
//               to="/private-plastic-types"
//               className="block px-4 py-2 hover:bg-gray-700"
//             >
//               Types plastique
//             </Link>
//           </li>
//           <li>
//             <Link
//               to="/private-tiers"
//               className="block px-4 py-2 hover:bg-gray-700"
//             >
//               Tiers
//             </Link>
//           </li>
//           <li>
//             <Link
//               to="/private-entrepots"
//               className="block px-4 py-2 hover:bg-gray-700"
//             >
//               Entrepots
//             </Link>
//           </li>
//         </ul>
//         <button
//           onClick={handleLogout}
//           className="w-full px-4 py-2 mt-4 text-left hover:bg-gray-700"
//         >
//           Déconnexion
//         </button>
//       </div>

//       {/* Content area */}
//       <div className="flex-1 flex flex-col">
//         {/* Main content */}
//         <div className="p-4">{children}</div>
//       </div>
//     </div>
//   );
// };

// export default PrivateSidebar;

import { AlignJustify, X } from "lucide-react";
import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { DASHBOARD_PRIVATE_SIDEBAR_LINKS } from "../utils/Navigation";
import logo from "../../assets/logo.png";

const PrivateSidebar = () => {
  const location = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // State to manage sidebar open/close

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <aside
      className={`bg-gray-700 p-3 text-textColor h-full absolute top-0 left-0 transition-all duration-300 ease-in-out z-50 ${
        isSidebarOpen ? "w-55" : "w-15"
      }`}
    >
      <div className="flex items-center justify-between gap-2 px-1 ">
        {/* Menu icon to toggle sidebar */}
        <button
          onClick={toggleSidebar}
          className="text-secondaryColor focus:outline-none"
        >
          {isSidebarOpen ? (
            <X className="text-red-600" size="25" />
          ) : (
            <AlignJustify size="22" />
          )}
        </button>
      </div>
      {!isSidebarOpen && (
        <div className="mt-3">
          {DASHBOARD_PRIVATE_SIDEBAR_LINKS.map((link) => (
            <Link
              to={link.href}
              key={link.key}
              className={`flex items-center text-center gap-2 mb-[0.7px] px-1 py-1 rounded-lg text-[14px] ${
                location.pathname === link.href
                  ? "bg-lightColor text-white"
                  : "text-primaryColor font-bold"
              } hover:bg-secondaryColor hover:text-backgroundColor`}
            >
              <span>{link.icon}</span>
            </Link>
          ))}
        </div>
      )}
      {isSidebarOpen && (
        <div className="flex-1 mt-3">
          {DASHBOARD_PRIVATE_SIDEBAR_LINKS.map((link) => (
            <Link
              to={link.href}
              key={link.key}
              className={`flex items-center gap-2 mb-[0.7px] px-1 py-1 rounded-lg text-[10px] ${
                location.pathname === link.href
                  ? "bg-lightColor text-white"
                  : "text-primaryColor font-bold"
              } hover:bg-secondaryColor hover:text-backgroundColor`}
            >
              {link.icon}
              <span>{link.label}</span>
            </Link>
          ))}
        </div>
      )}
    </aside>
  );
};

export default PrivateSidebar;
