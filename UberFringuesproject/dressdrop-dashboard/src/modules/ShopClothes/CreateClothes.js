import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Form,
  Input,
  InputNumber,
  Checkbox,
  Button,
  Typography,
  Upload,
  message,
} from "antd";
import { UploadOutlined } from "@ant-design/icons";
import axios from "axios";

const { Title } = Typography;
const sizesList = ["XS", "S", "M", "L", "XL", "XXL"];
const colorsList = ["Noir", "Blanc", "Rouge", "Bleu", "Beige"];

const CreateClothes = () => {
  const { id: shopId } = useParams(); // 👈 récupère le shopId depuis l'URL
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [images, setImages] = useState([]);
  const [uploading, setUploading] = useState(false);

  const handleUpload = async ({ file }) => {
    const formData = new FormData();
    formData.append("image", file);

    try {
      setUploading(true);
      const res = await axios.post("http://localhost:5000/clothes/upload-clothes-image", formData);
      setImages((prev) => [...prev, res.data.imageUrl]);
      message.success("Image uploadée !");
    } catch (err) {
      console.error("Erreur upload :", err);
      message.error("Erreur lors de l'upload");
    } finally {
      setUploading(false);
    }
  };

  const onFinish = async (values) => {
    const token = localStorage.getItem("token");

    try {
      const payload = {
        ...values,
        shopId,
        images,
      };

      await axios.post("http://localhost:5000/clothes/add", payload, {
        headers: { Authorization: `Bearer ${token}` },
      });

      message.success("Vêtement ajouté !");
      navigate("/shop-clothes");
    } catch (err) {
      console.error(err);
      message.error("Erreur lors de l'ajout");
    }
  };

  return (
    <div style={{ maxWidth: 600, margin: "0 auto", paddingTop: 20 }}>
      <Title level={3}>Ajouter un vêtement</Title>
      <Form form={form} layout="vertical" onFinish={onFinish}>
        <Form.Item label="Nom" name="name" rules={[{ required: true }]}>
          <Input />
        </Form.Item>

        <Form.Item label="Description" name="description">
          <Input.TextArea rows={3} />
        </Form.Item>

        <Form.Item label="Prix (€)" name="price" rules={[{ required: true }]}>
          <InputNumber style={{ width: "100%" }} />
        </Form.Item>

        <Form.Item label="Tailles" name="sizes">
          <Checkbox.Group options={sizesList} />
        </Form.Item>

        <Form.Item label="Couleurs" name="colors">
          <Checkbox.Group options={colorsList} />
        </Form.Item>

        <Form.Item label="Images">
          <Upload customRequest={handleUpload} showUploadList={false}>
            <Button icon={<UploadOutlined />} loading={uploading}>
              Upload Image
            </Button>
          </Upload>
          <div style={{ marginTop: 10 }}>
            {images.map((img, idx) => (
              <img key={idx} src={img} alt="uploaded" style={{ width: 80, marginRight: 8, borderRadius: 4 }} />
            ))}
          </div>
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" block>
            Ajouter
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default CreateClothes;

