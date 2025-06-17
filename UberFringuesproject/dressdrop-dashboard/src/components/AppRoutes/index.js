import { Routes, Route, Navigate } from "react-router-dom"
import { useAuth } from "../../contexts/AuthContext";

import AppLayout from "../../layouts/AppLayout";
import AuthLayout from "../../layouts/AuthLayout";

import Login from "../../modules/Login";
import MyShops from "../../modules/MyShops";
import CreateShop from "../../modules/MyShops/CreateShop";
import ShopDetails from "../../modules/MyShops/ShopDetails";
import EditShop from "../../modules/MyShops/EditShop";
import ShopsList from "../../modules/Orders/ShopsList";
import OrderHistoryByShop from "../../modules/Orders/index";
import OrderDetails from "../../modules/Orders/OrderDetails";
import ShopClothes from "../../modules/ShopClothes";
import CreateClothes from "../../modules/ShopClothes/CreateClothes";
import EditClothes from "../../modules/ShopClothes/EditClothes";
import AllDeliveries from "../../modules/Deliveries/AllDeliveries";
import RevenueChart from "../../modules/Dashboard/RevenueChart"

const AppRoutes = () => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) return null;

  return (
    <Routes>
      {!isAuthenticated ? (
        // Routes publiques
        <Route element={<AuthLayout />}>
          <Route path="*" element={<Login />} />
        </Route>
      ) : (
        // Routes privées
        <Route element={<AppLayout />}>
           <Route path="/" element={<Navigate to="/orders" />} />
          <Route path="/orders" element={<ShopsList />} />
          <Route path="/orders/shop/:shopId" element={<OrderHistoryByShop />} />
          <Route path="/shops" element={<MyShops />} />
          <Route path="/shops/create" element={<CreateShop />} />
          <Route path="/shops/:id" element={<ShopDetails />} /> 
          <Route path="/shops/:id/edit" element={<EditShop />} />
          <Route path="/orders/:id" element={<OrderDetails />} />
          <Route path="/shop-clothes" element={<ShopClothes />} />
          <Route path="/shops/:shopId/clothes/create" element={<CreateClothes />} />
          <Route path="/clothes/edit/:id" element={<EditClothes />} />
          <Route path="/deliveries" element={<AllDeliveries />} />
          <Route path="/dashboard" element={<RevenueChart />} />
        </Route>
      )}
    </Routes>
  );
};

export default AppRoutes;
