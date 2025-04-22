import { useState } from "react";
import { Form, Input, Button, Card, Typography, message } from "antd";
import axios from "axios";

const { Title } = Typography;

const CreateShop = () => {
  const [loading, setLoading] = useState(false);
  const [imageFile, setImageFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);

  const onFinish = async (values) => {
    setLoading(true);
    const token = localStorage.getItem("token");

    try {
      // Étape 1 : créer la boutique
      const shopRes = await axios.post("http://localhost:5000/shops/shop", values, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const shopId = shopRes.data._id || shopRes.data.shop?._id;

      // Étape 2 : upload de l'image si sélectionnée
      if (imageFile && shopId) {
        const formData = new FormData();
        formData.append("image", imageFile);
        formData.append("shopId", shopId);

        await axios.post("http://localhost:5000/upload-shop-image", formData, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        });
      }

      message.success("Boutique créée avec succès !");
    } catch (error) {
      console.error("Erreur lors de la création :", error);
      message.error(error.response?.data?.message || "Erreur lors de la création.");
    } finally {
      setLoading(false);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  return (
    <div style={{ maxWidth: 600, margin: "0 auto", padding: "50px 20px" }}>
      <Card>
        <Title level={3} style={{ textAlign: "center" }}>
          Créer une boutique
        </Title>

        <Form layout="vertical" onFinish={onFinish}>
          <Form.Item
            label="Nom de la boutique"
            name="name"
            rules={[{ required: true, message: "Veuillez entrer le nom" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Description"
            name="description"
            rules={[{ required: true, message: "Veuillez entrer une description" }]}
          >
            <Input.TextArea rows={3} />
          </Form.Item>

          <Form.Item label="Adresse">
            <Form.Item
              name={["ShopAddress", "street"]}
              rules={[{ required: true, message: "Rue obligatoire" }]}
              style={{ marginBottom: 8 }}
            >
              <Input placeholder="Rue" />
            </Form.Item>
            <Form.Item
              name={["ShopAddress", "city"]}
              rules={[{ required: true, message: "Ville obligatoire" }]}
              style={{ marginBottom: 8 }}
            >
              <Input placeholder="Ville" />
            </Form.Item>
            <Form.Item
              name={["ShopAddress", "postalCode"]}
              rules={[{ required: true, message: "Code postal obligatoire" }]}
              style={{ marginBottom: 8 }}
            >
              <Input placeholder="Code postal" />
            </Form.Item>
            <Form.Item
              name={["ShopAddress", "country"]}
              rules={[{ required: true, message: "Pays obligatoire" }]}
              style={{ marginBottom: 8 }}
            >
              <Input placeholder="Pays" />
            </Form.Item>
          </Form.Item>

          <Form.Item label="Image de la boutique">
            <input type="file" accept="image/*" onChange={handleImageChange} />
            {previewUrl && (
              <img
                src={previewUrl}
                alt="Aperçu"
                style={{ marginTop: 10, width: 200, borderRadius: 8 }}
              />
            )}
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" loading={loading} block>
              Créer ma boutique
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default CreateShop;
