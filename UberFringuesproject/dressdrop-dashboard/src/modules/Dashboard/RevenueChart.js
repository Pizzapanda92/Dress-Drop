import { useEffect, useState } from "react";
import { Select, Card, Spin, Typography, message } from "antd";
import { Bar } from "react-chartjs-2";
import axios from "axios";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const { Title: AntTitle } = Typography;
const { Option } = Select;

const RevenueChart = () => {
  const [shops, setShops] = useState([]);
  const [selectedShop, setSelectedShop] = useState(null);
  const [revenues, setRevenues] = useState([]);
  const [loading, setLoading] = useState(false);

  const token = localStorage.getItem("token");

  const fetchShops = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/shops/mine`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setShops(res.data);
    } catch (err) {
      message.error("Erreur lors du chargement des boutiques");
    }
  };

  const fetchRevenue = async (shopId) => {
    setLoading(true);
    try {
      const res = await axios.get(`http://localhost:5000/order/revenues?shopId=${shopId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setRevenues(res.data.revenuePerMonth || []);
    } catch (err) {
      message.error("Erreur lors du chargement du chiffre d'affaires");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchShops();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onShopChange = (shopId) => {
    setSelectedShop(shopId);
    fetchRevenue(shopId);
  };

  const chartData = {
    labels: revenues.map((r) => r.month),
    datasets: [
      {
        label: "Revenu (€)",
        data: revenues.map((r) => r.totalRevenue),
        backgroundColor: "rgba(75, 192, 192, 0.6)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: { position: "top" },
      title: { display: true, text: "Chiffre d'affaires mensuel" },
    },
  };

  return (
    <Card style={{ margin: 20 }}>
      <AntTitle level={3}>Tableau de bord : Revenus</AntTitle>

      <Select
        style={{ width: 300, marginBottom: 20 }}
        placeholder="Sélectionner une boutique"
        onChange={onShopChange}
        value={selectedShop}
      >
        {shops.map((shop) => (
          <Option key={shop._id} value={shop._id}>
            {shop.name}
          </Option>
        ))}
      </Select>

      {loading ? (
        <Spin style={{ margin: 50 }} />
      ) : (
        selectedShop && <Bar data={chartData} options={chartOptions} />
      )}
    </Card>
  );
};

export default RevenueChart;
