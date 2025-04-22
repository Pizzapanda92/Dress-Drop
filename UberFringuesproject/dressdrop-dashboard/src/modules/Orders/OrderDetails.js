import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Card, Spin, Typography, List, message } from "antd";
import axios from "axios";

const { Title, Paragraph } = Typography;

const OrderDetails = () => {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/order/${id}`);
        setOrder(res.data);
      } catch (err) {
        console.error("❌ Erreur :", err);
        message.error("Impossible de récupérer la commande.");
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
  }, [id]);

  if (loading) return <Spin />;
  if (!order) return <p>Aucune commande trouvée.</p>;

  return (
    <Card title={`Commande #${order._id}`} style={{ margin: 20 }}>
      <Paragraph>
        <strong>Status:</strong> {order.status}
      </Paragraph>
      <Paragraph>
        <strong>Date:</strong> {new Date(order.createdAt).toLocaleDateString()}
      </Paragraph>
      <Paragraph>
        <strong>Total:</strong> {order.totalPrice} €
      </Paragraph>

      <Title level={4}>Articles :</Title>
      <List
        dataSource={order.items}
        renderItem={(item) => {
          const product = item.productId;
          const imageUrl = product?.images?.[0]?.startsWith("/uploads")
            ? `http://localhost:5000${product.images[0]}`
            : product?.images?.[0];

          return (
            <List.Item style={{ padding: 16 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                <img
                  src={imageUrl}
                  alt={product?.name}
                  style={{
                    width: 80,
                    height: 80,
                    objectFit: "cover",
                    borderRadius: 4,
                    backgroundColor: "#f0f0f0",
                  }}
                />
                <div>
                  <strong>{product?.name}</strong>
                  <div>{item.quantity} pcs à {product?.price} € chacun</div>
                </div>
              </div>
            </List.Item>
          );
        }}
      />
    </Card>
  );
};

export default OrderDetails;
