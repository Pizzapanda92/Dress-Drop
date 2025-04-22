import { useEffect, useState } from "react";
import {
  Card,
  Typography,
  Tag,
  Select,
  Spin,
  Row,
  Col,
  Divider,
  message,
} from "antd";
import axios from "axios";

const { Title, Paragraph } = Typography;
const { Option } = Select;

const statusColors = {
  pending: "orange",
  "in-progress": "blue",
  delivered: "green",
  failed: "red",
};

const AllDeliveries = () => {
  const [deliveries, setDeliveries] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterStatus, setFilterStatus] = useState("all");

  const fetchDeliveries = async () => {
    try {
      const res = await axios.get("http://localhost:5000/deliveries"); // <-- assure-toi que cette route existe (sinon on la fait !)
      setDeliveries(res.data);
      setFiltered(res.data);
    } catch (err) {
      message.error("Erreur lors du chargement des livraisons");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDeliveries();
  }, []);

  const handleFilter = (value) => {
    setFilterStatus(value);
    if (value === "all") {
      setFiltered(deliveries);
    } else {
      setFiltered(deliveries.filter((d) => d.status === value));
    }
  };

  if (loading) return <Spin style={{ margin: 50 }} />;

  return (
    <div style={{ padding: 20 }}>
      <Title level={2}>Suivi des livraisons</Title>

      <Divider />
      <Select value={filterStatus} onChange={handleFilter} style={{ width: 200 }}>
        <Option value="all">Toutes</Option>
        <Option value="pending">En attente</Option>
        <Option value="in-progress">En cours</Option>
        <Option value="delivered">Livrées</Option>
        <Option value="failed">Échouées</Option>
      </Select>

      <Row gutter={[16, 16]} style={{ marginTop: 20 }}>
        {filtered.map((delivery) => (
          <Col span={8} key={delivery._id}>
            <Card
              title={`Commande: ${delivery.orderId}`}
              extra={<Tag color={statusColors[delivery.status]}>{delivery.status}</Tag>}
            >
              <Paragraph>
                <strong>Distance estimée:</strong> {delivery.estimatedDeliveryTime?.distanceInKm.toFixed(2)} km
              </Paragraph>
              <Paragraph>
                <strong>Temps estimé:</strong> {Math.round(delivery.estimatedDeliveryTime?.timeInMinutes)} min
              </Paragraph>

              <Paragraph>
                <strong>Adresse Boutique:</strong> {delivery.shopAddress?.street}, {delivery.shopAddress?.city}
              </Paragraph>
              <Paragraph>
                <strong>Adresse Client:</strong> {delivery.userAddress?.street}, {delivery.userAddress?.city}
              </Paragraph>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default AllDeliveries;
