import React from "react";

import AdminSidebar from "../global/AdminSidebar";

const AdminLayout = ({ children }) => {
  return (
  <>
    <AdminSidebar />
 
   
      <div style={{ padding: "16px" }}>{children}</div>
  
 
  </>
  );
};

export default AdminLayout;
