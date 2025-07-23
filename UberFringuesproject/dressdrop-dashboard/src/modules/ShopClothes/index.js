import { useEffect, useState } from "react";
import { Card, Typography, Row, Col, Button, message, Empty, Spin } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const { Title } = Typography;

const ShopClothes = () => {
  const [groupedClothes, setGroupedClothes] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMyShopsAndClothes = async () => {
      try {
        const token = localStorage.getItem("token");

        // Étape 1 : Récupérer mes boutiques
        const res = await axios.get("http://localhost:5000/shops/mine", {
          headers: { Authorization: `Bearer ${token}` },
        });

        const userShops = res.data;

        // Étape 2 : Pour chaque boutique, récupérer les vêtements
        const clothesData = await Promise.all(
          userShops.map(async (shop) => {
            try {
              const clothesRes = await axios.get(
                `http://localhost:5000/shops/${shop._id}/clothes`,
                {
                  headers: { Authorization: `Bearer ${token}` },
                }
              );
              return { shop, clothes: clothesRes.data };
            } catch {
              return { shop, clothes: [] };
            }
          })
        );

        setGroupedClothes(clothesData);
      } catch (err) {
        console.error("Erreur récupération vêtements :", err);
        message.error("Erreur lors du chargement des vêtements.");
      } finally {
        setLoading(false);
      }
    };

    fetchMyShopsAndClothes();
  }, []);

  const handleEdit = (id) => navigate(`/clothes/edit/${id}`);

  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`http://localhost:5000/clothes/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      message.success("Vêtement supprimé !");
      window.location.reload();
    } catch (err) {
      console.error("Erreur suppression :", err);
      message.error("Erreur lors de la suppression.");
    }
  };

  if (loading) return <Spin tip="Chargement..." />;

  if (groupedClothes.length === 0) {
    return <Empty description="Aucune boutique trouvée." />;
  }

  return (
    <div style={{ padding: 24 }}>
      <Title level={3}>Vêtements de mes boutiques</Title>
      {groupedClothes.map(({ shop, clothes }) => (
        <div key={shop._id} style={{ marginBottom: 40 }}>
          <Title level={5}>Boutique : {shop.name}</Title>

          {clothes.length === 0 ? (
            <Empty description="Aucun vêtement trouvé." />
          ) : (
            <Row gutter={[16, 16]}>
              {clothes.map((item) => (
                <Col span={8} key={item._id}>
                  <Card
                    hoverable
                    cover={
                      <img
                        alt={item.name}
                        src={
                          item.images?.[0]?.startsWith("/uploads")
                            ? `http://localhost:5000${item.images[0]}`
                            : item.images?.[0] || ""
                        }
                        style={{ height: 200, objectFit: "cover" }}
                      />
                    }
                    actions={[
                      <Button
                        type="link"
                        icon={<EditOutlined />}
                        onClick={() => handleEdit(item._id)}
                      >
                        Modifier
                      </Button>,
                      <Button
                        type="link"
                        danger
                        icon={<DeleteOutlined />}
                        onClick={() => handleDelete(item._id)}
                      >
                        Supprimer
                      </Button>,
                    ]}
                  >
                    <Card.Meta
                      title={`${item.name} - ${item.price} €`}
                      description={
                        <>
                          <p>
                            <strong>Tailles:</strong>{" "}
                            {item.sizes?.join(", ") || "N/A"}
                          </p>
                          <p>
                            <strong>Couleurs:</strong>{" "}
                            {item.colors?.join(", ") || "N/A"}
                          </p>
                        </>
                      }
                    />
                  </Card>
                </Col>
              ))}
            </Row>
          )}
        </div>
      ))}
    </div>
  );
};

export default ShopClothes;
