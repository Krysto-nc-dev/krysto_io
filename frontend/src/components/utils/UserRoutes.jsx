import { Outlet, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import UserLayout from "../layouts/UserLayout";

const UserRoutes = () => {
  const { userInfo } = useSelector((state) => state.auth);

  return userInfo && !userInfo.isAdmin ? (
    <UserLayout>
      <Outlet />
    </UserLayout>
  ) : (
    <Navigate to="/" replace />
  );
};

export default UserRoutes;
