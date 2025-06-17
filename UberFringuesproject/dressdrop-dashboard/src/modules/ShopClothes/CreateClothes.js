import { useState, useEffect } from "react";
import {
  Form,
  Input,
  InputNumber,
  Checkbox,
  Button,
  Typography,
  Upload,
  message,
  Select,
  Spin,
} from "antd";
import { UploadOutlined } from "@ant-design/icons";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const { Title } = Typography;
const { Option } = Select;

const sizesList = ["XS", "S", "M", "L", "XL", "XXL"];
const colorsList = ["Noir", "Blanc", "Rouge", "Bleu", "Beige"];

const CreateClothes = () => {
  const [form] = Form.useForm();
  const [shops, setShops] = useState([]);
  const [selectedShop, setSelectedShop] = useState(null);
  const [images, setImages] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [loadingShops, setLoadingShops] = useState(true);
  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchShops = async () => {
      try {
        const res = await axios.get("http://localhost:5000/shops/mine", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setShops(res.data);
      } catch (err) {
        console.error(err);
        message.error("Erreur lors du chargement des boutiques");
      } finally {
        setLoadingShops(false);
      }
    };

    fetchShops();
  }, [token]);

  const handleUpload = async ({ file }) => {
    const formData = new FormData();
    formData.append("image", file);

    try {
      setUploading(true);
      const res = await axios.post(
        "http://localhost:5000/clothes/upload-clothes-image",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      // On garde l'image en chemin RELATIF pour cohérence avec ShopClothes
      const imageUrl = res.data.imageUrl;
      setImages((prev) => [...prev, imageUrl]);
      message.success("Image uploadée !");
    } catch (err) {
      console.error("Erreur upload :", err);
      message.error("Erreur lors de l'upload");
    } finally {
      setUploading(false);
    }
  };

  const onFinish = async (values) => {
    if (!selectedShop) {
      return message.warning("Veuillez sélectionner une boutique.");
    }

    try {
      const payload = {
        ...values,
        shopId: selectedShop,
        images,
      };

      await axios.post("http://localhost:5000/clothes/add", payload, {
        headers: { Authorization: `Bearer ${token}` },
      });

      message.success("Vêtement ajouté !");
      form.resetFields();
      setImages([]);
      setSelectedShop(null);

      navigate("/shop-clothes");
    } catch (err) {
      console.error(err);
      message.error("Erreur lors de l'ajout");
    }
  };

  return (
    <div style={{ maxWidth: 600, margin: "0 auto", paddingTop: 20 }}>
      <Title level={3}>Ajouter un vêtement</Title>

      {loadingShops ? (
        <Spin />
      ) : (
        <>
          <Select
            placeholder="Sélectionner une boutique"
            value={selectedShop}
            onChange={(value) => setSelectedShop(value)}
            style={{ width: "100%", marginBottom: 20 }}
          >
            {shops.map((shop) => (
              <Option key={shop._id} value={shop._id}>
                {shop.name}
              </Option>
            ))}
          </Select>

          <Form form={form} layout="vertical" onFinish={onFinish}>
            <Form.Item
              label="Nom"
              name="name"
              rules={[{ required: true, message: "Nom requis" }]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Description"
              name="description"
              rules={[{ required: true, message: "Description requise" }]}
            >
              <Input.TextArea rows={3} />
            </Form.Item>

            <Form.Item
              label="Prix (€)"
              name="price"
              rules={[{ required: true, message: "Prix requis" }]}
            >
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
                  <img
                    key={idx}
                    src={`http://localhost:5000${img}`}
                    alt="uploaded"
                    style={{ width: 80, marginRight: 8, borderRadius: 4 }}
                  />
                ))}
              </div>
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit" block>
                Ajouter
              </Button>
            </Form.Item>
          </Form>
        </>
      )}
    </div>
  );
};

export default CreateClothes;
