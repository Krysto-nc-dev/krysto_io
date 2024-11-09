import React from "react";
import AdminSidebar from "../global/AdminSidebar";

const AdminLayout = ({ children }) => {
  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div className="w-64">
        <AdminSidebar />
      </div>

      {/* Main Content Area */}
      <div className="flex-1 p-4 overflow-auto">{children}</div>
    </div>
  );
};

export default AdminLayout;
