import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Form,
  Input,
  InputNumber,
  Checkbox,
  Button,
  message,
  Typography,
  Spin,
} from "antd";
import axios from "axios";

const { Title } = Typography;
const sizesList = ["XS", "S", "M", "L", "XL", "XXL"];
const colorsList = ["Noir", "Blanc", "Rouge", "Bleu", "Beige"];

const EditClothes = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(true);
  const [initialData, setInitialData] = useState(null);

  useEffect(() => {
    const fetchClothes = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/clothes/item/${id}`);
        setInitialData(res.data);
        form.setFieldsValue(res.data);
      } catch (err) {
        console.error(err);
        message.error("Erreur lors du chargement du vêtement");
      } finally {
        setLoading(false);
      }
    };
    fetchClothes();
  }, [id, form]);

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
  
    const formData = new FormData();
    formData.append("image", file);
  
    try {
      const res = await axios.post(
        "http://localhost:5000/clothes/upload-clothes-image",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
  
      // 🔥 Vérifie que le backend renvoie bien `imageUrl`
      const newImageUrl = res.data.imageUrl;
  
      setInitialData((prev) => ({
        ...prev,
        images: [newImageUrl],
      }));
  
      // Facultatif : si tu veux aussi remplir le champ form (utile si le form l'utilise)
      form.setFieldsValue({ images: [newImageUrl] });
  
      message.success("Image mise à jour !");
    } catch (err) {
      console.error(err);
      message.error("Échec de l’upload de l’image");
    }
  };

  const onFinish = async (values) => {
    try {
      const finalData = {
        ...values,
        images: initialData.images,
      };

      await axios.put(`http://localhost:5000/clothes/${id}`, finalData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      message.success("Vêtement mis à jour !");
      navigate("/shop-clothes");
    } catch (err) {
      console.error(err);
      message.error("Erreur lors de la mise à jour");
    }
  };

  if (loading) return <Spin style={{ margin: 50 }} />;
  if (!initialData) return <p>Vêtement introuvable.</p>;

  return (
    <div style={{ maxWidth: 600, margin: "0 auto" }}>
      <Title level={3}>Modifier le vêtement</Title>
      <Form layout="vertical" form={form} onFinish={onFinish}>
        <Form.Item label="Nom" name="name" rules={[{ required: true }]}> 
          <Input />
        </Form.Item>

        <Form.Item label="Description" name="description">
          <Input.TextArea rows={4} />
        </Form.Item>

        <Form.Item label="Prix (€)" name="price" rules={[{ required: true }]}> 
          <InputNumber min={0} style={{ width: "100%" }} />
        </Form.Item>

        <Form.Item label="Tailles disponibles" name="sizes">
          <Checkbox.Group options={sizesList} />
        </Form.Item>

        <Form.Item label="Couleurs disponibles" name="colors">
          <Checkbox.Group options={colorsList} />
        </Form.Item>

        <Form.Item label="Image actuelle">
          <img
            src={
              initialData.images?.[0]?.startsWith("/uploads")
                ? `http://localhost:5000${initialData.images[0]}`
                : initialData.images?.[0]
            }
            alt="Aperçu"
            style={{ width: 100, borderRadius: 6 }}
          />
        </Form.Item>

        <Form.Item label="Changer l'image">
          <input type="file" accept="image/*" onChange={handleImageChange} />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            Sauvegarder les modifications
          </Button>
          <Button style={{ marginLeft: 12 }} onClick={() => navigate(-1)}>
            Annuler
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default EditClothes;
