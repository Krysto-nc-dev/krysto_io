import React from "react";

import PrivateSidebar from "../global/PrivateSidebar";

const PrivateLayout = ({ children }) => {
  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div className="w-64">
        <PrivateSidebar />
      </div>

      {/* Main Content Area */}
      <div className="flex-1 p-4 overflow-auto">{children}</div>
    </div>
  );
};

export default PrivateLayout;
