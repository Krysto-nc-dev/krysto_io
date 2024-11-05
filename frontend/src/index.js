import React from "react";
import ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store";

import App from "./App";

import HomeScreen from "./screens/site/HomeScreen.jsx";
import PrivateRoutes from "./components/utils/PrivateRoutes.jsx";
import AdminRoutes from "./components/utils/AdminRoutes.jsx";
import UserRoutes from "./components/utils/UserRoutes.jsx";
import LoginScreen from "./screens/site/LoginScreen.jsx";
import AdminDashboard from "./screens/admin/AdminDashboard.jsx";
import AdminUsersScreen from "./screens/admin/AdminUsersScreen.jsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      {/* Public Routes */}
      <Route index={true} path="/" element={<HomeScreen />} />
      <Route path="/connexion" element={<LoginScreen />} />

      {/* Private Routes */}
      <Route path="/" element={<PrivateRoutes />}>
        {/* Routes spécifiques aux utilisateurs privés */}
      </Route>

      {/* Admin Routes */}
      <Route path="/" element={<AdminRoutes />}>
        {/* Routes spécifiques aux administrateurs */}
      <Route path="/admin-dashboard" element={<AdminDashboard/>} />
      <Route path="/admin-users" element={<AdminUsersScreen/>} />
      </Route>

      {/* User Routes */}
      <Route path="/" element={<UserRoutes />}>
        {/* Routes spécifiques aux utilisateurs réguliers */}
      </Route>

      {/* Route générique pour gérer toutes les autres routes non définies */}
      {/* <Route path="*" element={<NotFoundScreen />} /> */}
    </Route>
  )
);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
