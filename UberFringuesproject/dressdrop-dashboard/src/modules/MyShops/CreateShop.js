import { useState } from "react";
import {
  Form,
  Input,
  Button,
  Card,
  Typography,
  Upload,
  message
} from "antd";
import { UploadOutlined } from "@ant-design/icons";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const { Title } = Typography;

const CreateShop = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const [selectedImage, setSelectedImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const onFinish = async (values) => {
    const token = localStorage.getItem("token");

    try {
      setLoading(true);

      // Création de la boutique (sans image)
      const res = await axios.post("http://localhost:5000/shops/shop", values, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const shopId = res.data._id || res.data.shop?._id;

      // S’il y a une image, on l’upload ensuite
      if (selectedImage && shopId) {
        const formData = new FormData();
        formData.append("image", selectedImage);
        formData.append("shopId", shopId);

        await axios.post("http://localhost:5000/shops/upload-shop-image", formData, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        });
      }

      message.success("Boutique créée avec succès !");
      navigate("/shops");
    } catch (error) {
      console.error("Erreur lors de la création :", error);
      message.error(
        error.response?.data?.message || "Erreur lors de la création."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: 600, margin: "0 auto", padding: "50px 20px" }}>
      <Card>
        <Title level={3} style={{ textAlign: "center" }}>
          Créer une boutique
        </Title>

        <Form layout="vertical" form={form} onFinish={onFinish}>
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
            <Upload
              beforeUpload={(file) => {
                setSelectedImage(file);
                return false; // empêche l'upload automatique
              }}
              showUploadList={selectedImage ? [{ name: selectedImage.name }] : false}
              maxCount={1}
            >
              <Button icon={<UploadOutlined />}>Choisir une image</Button>
            </Upload>
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              loading={loading}
              block
            >
              Créer ma boutique
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default CreateShop;
