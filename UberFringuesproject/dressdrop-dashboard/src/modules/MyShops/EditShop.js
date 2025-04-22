import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Form,
  Input,
  Button,
  Card,
  message,
  Spin,
  Typography,
} from "antd";
import axios from "axios";

const { Title } = Typography;

const EditShop = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(true);
  const [imageFile, setImageFile] = useState(null);
  const [currentImage, setCurrentImage] = useState(null);

  useEffect(() => {
    const fetchShop = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/shops/${id}`);
        const shop = res.data;

        form.setFieldsValue({
          name: shop.name,
          description: shop.description,
          street: shop.ShopAddress?.street,
          city: shop.ShopAddress?.city,
          postalCode: shop.ShopAddress?.postalCode,
          country: shop.ShopAddress?.country,
        });

        setCurrentImage(shop.image);
      } catch (err) {
        message.error("Erreur lors du chargement de la boutique");
      } finally {
        setLoading(false);
      }
    };

    fetchShop();
  }, [id, form]);

  const onFinish = async (values) => {
    try {
      const payload = {
        name: values.name,
        description: values.description,
        ShopAddress: {
          street: values.street,
          city: values.city,
          postalCode: values.postalCode,
          country: values.country,
        },
      };

      await axios.put(`http://localhost:5000/shops/${id}`, payload, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (imageFile) {
        const formData = new FormData();
        formData.append("image", imageFile);
        formData.append("shopId", id);

        await axios.post("http://localhost:5000/upload-shop-image", formData, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "multipart/form-data",
          },
        });
      }

      message.success("Boutique mise à jour !");
      navigate(`/shops/${id}`);
    } catch (err) {
      message.error("Erreur lors de la mise à jour");
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      setCurrentImage(URL.createObjectURL(file));
    }
  };

  if (loading) return <Spin style={{ margin: 50 }} />;

  return (
    <Card title="Modifier la Boutique" style={{ maxWidth: 600, margin: "auto" }}>
      <Form form={form} layout="vertical" onFinish={onFinish}>
        <Form.Item label="Nom" name="name" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item label="Description" name="description" rules={[{ required: true }]}>
          <Input.TextArea rows={3} />
        </Form.Item>
        <Form.Item label="Rue" name="street" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item label="Ville" name="city" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item label="Code Postal" name="postalCode" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item label="Pays" name="country" rules={[{ required: true }]}>
          <Input />
        </Form.Item>

        <Form.Item label="Image actuelle">
          {currentImage && (
            <img
              src={currentImage}
              alt="Boutique"
              style={{ width: 200, borderRadius: 8, marginBottom: 10 }}
            />
          )}
          <input type="file" accept="image/*" onChange={handleImageChange} />
        </Form.Item>

        <Button type="primary" htmlType="submit" block>
          Enregistrer les modifications
        </Button>
      </Form>
    </Card>
  );
};

export default EditShop;
