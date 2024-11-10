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
import PublicLayout from "./components/layouts/PublicLayout";
import InitiationsScreen from "./screens/site/InitiationsScreen.jsx";
import BoutiqueScreen from "./screens/site/BoutiqueScreen.jsx";
import NotFound from "./screens/NotFound.jsx";
import RegisterScreen from "./screens/site/RegisterScreen.jsx";
import ProductScreen from "./screens/site/ProductScreen.jsx";
import RecyclableProductsScreen from "./screens/site/RecyclableProductsScreen.jsx";
import AboutScreen from "./screens/site/AboutScreen.jsx";
import PrivateDashboard from "./screens/Private/PrivateDashboard.jsx";
import PrivatePlasticTypesScreen from "./screens/Private/PrivatePlasticTypesScreen.jsx";
import PrivatePlasticColorsScreen from "./screens/Private/PrivatePlasticColorsScreen.jsx";
import PrivateThirpartiesScreen from "./screens/Private/PrivateThirpartiesScreen.jsx";
import PrivateWarehousesScreen from "./screens/Private/PrivateWarehousesScreen.jsx";


const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route path="/connexion" element={<LoginScreen />} />
      <Route path="/register" element={<RegisterScreen />} />
   
      {/* Public Routes */}
      <Route path="/" element={<PublicLayout />}>
        <Route index={true} path="/" element={<HomeScreen />} />
        <Route path="/initiations" element={<InitiationsScreen />} />
        <Route path="/a-propos" element={<AboutScreen/>} />
        <Route path="/boutique" element={<BoutiqueScreen />} />
        <Route path='/product/:id' element={<ProductScreen/>} />
        <Route path='/produits-recyclables' element={<RecyclableProductsScreen/>} />
      </Route>

      {/* Private Routes */}
      <Route path="/" element={<PrivateRoutes />}>

        {/* Routes spécifiques aux utilisateurs privés */}
        <Route path="/private-dashboard" element={<PrivateDashboard />} />
        <Route path="/private-plastic-types" element={<PrivatePlasticTypesScreen/>} />
        <Route path="/private-plastic-colors" element={<PrivatePlasticColorsScreen/>} />
        <Route path="/private-tiers" element={<PrivateThirpartiesScreen/>} />
        <Route path="/private-entrepots" element={<PrivateWarehousesScreen/>} />
      </Route>

      {/* Admin Routes */}
      <Route path="/" element={<AdminRoutes />}>
        {/* Routes spécifiques aux administrateurs */}
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route path="/admin-users" element={<AdminUsersScreen />} />
      </Route>

      {/* User Routes */}
      <Route path="/" element={<UserRoutes />}>
        {/* Routes spécifiques aux utilisateurs réguliers */}
      </Route>

      {/* Route générique pour gérer toutes les autres routes non définies */}
      <Route path="*" element={<NotFound />} />
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
