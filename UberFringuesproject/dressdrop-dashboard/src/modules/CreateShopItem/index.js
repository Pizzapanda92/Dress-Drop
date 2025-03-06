import { Form, Input, Button, Card, InputNumber, message } from "antd";
import { useNavigate } from "react-router-dom";
import { useBoutiqueContext } from "../../contexts/BoutiqueContext"; // 🔹 Import du contexte

const { TextArea } = Input;

const CreateClothingItem = () => {
  const navigate = useNavigate();
  const { addClothingItem } = useBoutiqueContext(); // 🔹 Récupère la fonction pour ajouter un vêtement

  const onFinish = ({ name, description, price, quantity }) => {
    const newItem = {
      id: Date.now().toString(), // 🔹 Génère un ID unique
      name,
      description,
      price,
      quantity,
    };

    addClothingItem(newItem); // 🔹 Ajoute l’article au contexte

    message.success("Clothing item was created successfully");

    navigate("/dresing"); // 🔹 Redirige vers la liste des vêtements
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <Card title="New Clothes Item" style={{ margin: 20 }}>
      <Form
        layout="vertical"
        wrapperCol={{ span: 8 }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        <Form.Item
          label="Clothes Name"
          name="name"
          rules={[{ required: true, message: "Please enter a name" }]}
        >
          <Input placeholder="Enter clothes name" />
        </Form.Item>

        <Form.Item
          label="Clothes Description"
          name="description"
          rules={[{ required: true, message: "Please enter a description" }]}
        >
          <TextArea rows={4} placeholder="Enter clothes description" />
        </Form.Item>

        <Form.Item
          label="Price (€)"
          name="price"
          rules={[{ required: true, message: "Please enter a price" }]}
        >
          <InputNumber min={0} placeholder="Enter price in €" />
        </Form.Item>

        <Form.Item
          label="Quantity"
          name="quantity"
          rules={[{ required: true, message: "Please enter a quantity" }]}
        >
          <InputNumber min={1} placeholder="Enter quantity" />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
};

export default CreateClothingItem;
