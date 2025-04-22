import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Card, Typography, Button, Spin, message } from "antd";
import axios from "axios";

const { Title, Paragraph } = Typography;

const ShopDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [shop, setShop] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchShop = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/shops/${id}`);
        setShop(res.data);
      } catch (err) {
        console.error("Erreur de récupération :", err);
        message.error("Impossible de charger la boutique");
      } finally {
        setLoading(false);
      }
    };

    fetchShop();
  }, [id]);

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:5000/shops/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      message.success("Boutique supprimée !");
      navigate("/shops");
    } catch (err) {
      console.error("Suppression échouée :", err);
      message.error("Erreur lors de la suppression");
    }
  };

  const handleEdit = () => {
    navigate(`/shops/${id}/edit`);
  };

  if (loading) return <Spin style={{ display: "flex", justifyContent: "center", marginTop: 100 }} />;

  if (!shop) return <p>Boutique introuvable.</p>;

  return (
    <Card
      style={{ maxWidth: 700, margin: "auto", marginTop: 30 }}
      cover={
        <img
          src={shop.image}
          alt={shop.name}
          style={{ maxHeight: 300, objectFit: "cover", borderRadius: 8 }}
        />
      }
    >
      <Title level={2}>{shop.name}</Title>
      <Paragraph>{shop.description}</Paragraph>
      <Paragraph strong>
        Adresse : {shop.ShopAddress?.street}, {shop.ShopAddress?.city},{" "}
        {shop.ShopAddress?.postalCode}, {shop.ShopAddress?.country}
      </Paragraph>

      <div style={{ marginTop: 20, display: "flex", gap: 10 }}>
        <Button type="default" onClick={handleEdit}>
          Modifier la boutique
        </Button>
        <Button type="primary" danger onClick={handleDelete}>
          Supprimer la boutique
        </Button>
      </div>
    </Card>
  );
};

export default ShopDetails;
