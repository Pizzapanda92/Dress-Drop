import { useEffect, useState } from "react";
import { Card, List, message, Button } from "antd";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ShopsList = () => {
  const [shops, setShops] = useState([]);
  const navigate = useNavigate();
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    const fetchShops = async () => {
      try {
        const res = await axios.get("http://localhost:5000/shops");
        const userShops = res.data.filter((shop) => shop.ownerId === userId);
        setShops(userShops);
      } catch (error) {
        message.error("Erreur lors du chargement des boutiques.");
      }
    };

    fetchShops();
  }, [userId]);

  return (
    <Card title="Mes Boutiques">
      <List
        grid={{ gutter: 16, column: 2 }}
        dataSource={shops}
        renderItem={(shop) => (
          <List.Item>
            <Card
              title={shop.name}
              cover={<img alt={shop.name} src={shop.image} style={{ height: 150, objectFit: "cover" }} />}
              actions={[
                <Button type="primary" onClick={() => navigate(`/orders/shop/${shop._id}`)}>
                  Voir les commandes
                </Button>,
              ]}
            >
              {shop.description}
            </Card>
          </List.Item>
        )}
      />
    </Card>
  );
};

export default ShopsList;
