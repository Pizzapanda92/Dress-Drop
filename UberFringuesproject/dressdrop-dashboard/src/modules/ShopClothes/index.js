import { useEffect, useState } from "react";
import axios from "axios";
import {
  Card,
  List,
  Image,
  Typography,
  Spin,
  message,
  Button,
  Divider,
} from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

const { Title } = Typography;

const ShopClothes = () => {
  const [groupedClothes, setGroupedClothes] = useState({});
  const [shopNames, setShopNames] = useState({});
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchClothes = async () => {
    try {
      const res = await axios.get("http://localhost:5000/clothes");
      const data = res.data;

      const grouped = {};
      const shopsToFetch = new Set();

      for (let item of data) {
        const shopId = item.shopId;
        if (!grouped[shopId]) grouped[shopId] = [];
        grouped[shopId].push(item);
        shopsToFetch.add(shopId);
      }

      setGroupedClothes(grouped);

      const shopResponses = await Promise.all(
        Array.from(shopsToFetch).map((id) =>
          axios.get(`http://localhost:5000/shops/${id}`).catch(() => null)
        )
      );

      const names = {};
      for (let res of shopResponses) {
        if (res?.data?._id && res.data.name) {
          names[res.data._id] = res.data.name;
        }
      }
      setShopNames(names);
    } catch (err) {
      console.error("Erreur lors du fetch :", err);
      message.error("Impossible de récupérer les vêtements.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/clothes/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      message.success("Vêtement supprimé !");
      fetchClothes();
    } catch (err) {
      message.error("Erreur suppression !");
    }
  };

  useEffect(() => {
    fetchClothes();
  }, []);

  if (loading) return <Spin tip="Chargement..." style={{ margin: 50 }} />;

  return (
    <div style={{ padding: "20px" }}>
      <Title level={2}>Vêtements par boutique</Title>

      {Object.entries(groupedClothes).map(([shopId, items]) => (
        <div key={shopId} style={{ marginBottom: 40 }}>
          <Divider orientation="left">
            Boutique : <strong>{shopNames[shopId] || shopId}</strong>
          </Divider>

          <List
            grid={{ gutter: 16, column: 3 }}
            dataSource={items}
            renderItem={(item) => (
              <List.Item>
                <Card
                  hoverable
                  cover={
                    <Image
                      src={
                        item.images[0]?.startsWith("http")
                          ? item.images[0]
                          : `http://localhost:5000${item.images[0]}`
                      }
                      alt={item.name}
                      fallback="/images/no-image.png"
                      style={{ height: 180, objectFit: "cover" }}
                    />
                  }
                  actions={[
                    <Button
                      type="link"
                      icon={<EditOutlined />}
                      onClick={() => navigate(`/clothes/edit/${item._id}`)}
                    >
                      Modifier
                    </Button>,
                    <Button
                      danger
                      icon={<DeleteOutlined />}
                      onClick={() => handleDelete(item._id)}
                    >
                      Supprimer
                    </Button>,
                  ]}
                >
                  <Title level={5}>{item.name}</Title>
                  <p>{item.price} €</p>
                  <p>
                    <strong>Tailles:</strong> {item.sizes.join(", ")}
                  </p>
                  <p>
                    <strong>Couleurs:</strong> {item.colors.join(", ")}
                  </p>
                </Card>
              </List.Item>
            )}
          />
        </div>
      ))}
    </div>
  );
};

export default ShopClothes;
