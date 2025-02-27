import DetailedOrder from "../../modules/DetailedOrder";
import Orders from "../../modules/Orders";
import Shopdresing from "../../modules/Shopdresing";
import CreateShopItem from "../../modules/CreateShopItem";
import OrderHistory from "../../modules/OrderHistory";
import Settings from "../../modules/Settings";
import { Routes, Route } from "react-router-dom";

const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<Orders />} />
            <Route path="/orders/:id" element={<DetailedOrder />} />
            <Route path="/dresing" element={<Shopdresing />} />
            <Route path="dresing/create" element={<CreateShopItem />} />
            <Route path="order-history" element={<OrderHistory />} />
            <Route path="settings" element={<Settings />} />
          </Routes>
    );
};

export default AppRoutes;