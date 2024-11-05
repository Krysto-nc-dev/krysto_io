import { Outlet, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import PrivateLayout from "../layouts/PrivateLayout";

const PrivateRoutes = () => {
  const { userInfo } = useSelector((state) => state.auth);

  return userInfo ? (
    <PrivateLayout>
      <Outlet />
    </PrivateLayout>
  ) : (
    <Navigate to="/login" replace />
  );
};

export default PrivateRoutes;
