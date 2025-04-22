import { useEffect, useState } from "react";
import { Card, Row, Col, Typography, Spin, message, Empty } from "antd";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const { Title } = Typography;

const MyShops = () => {
  const [shops, setShops] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchShops = async () => {
    try {
      const res = await axios.get("http://localhost:5000/shops");
      const userId = localStorage.getItem("userId");

      // Filtrer uniquement les boutiques créées par l'utilisateur connecté
      const userShops = res.data.filter((shop) => shop.ownerId === userId);

      setShops(userShops);
    } catch (error) {
      console.error("Erreur de chargement des boutiques :", error);
      message.error("Impossible de charger les boutiques");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchShops();
  }, []);

  if (loading) return <Spin style={{ marginTop: 50 }} />;

  return (
    <div>
      <Title level={2}>My Shops</Title>

      {shops.length === 0 ? (
        <Empty description="No shops found." style={{ marginTop: 50 }} />
      ) : (
        <Row gutter={[16, 16]}>
          {shops.map((shop) => (
            <Col xs={24} sm={12} md={8} lg={6} key={shop._id}>
              <Card
                hoverable
                cover={
                  <img
                    alt={shop.name}
                    src={shop.image}
                    style={{ height: 200, objectFit: "cover" }}
                  />
                }
                onClick={() => navigate(`/shops/${shop._id}`)}
              >
                <Card.Meta title={shop.name} description={shop.description} />
              </Card>
            </Col>
          ))}
        </Row>
      )}
    </div>
  );
};

export default MyShops;
