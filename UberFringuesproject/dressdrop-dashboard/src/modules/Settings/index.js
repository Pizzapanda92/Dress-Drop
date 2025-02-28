import { Form, Input, Card, Button, message } from "antd";
import { useState } from "react";

const Settings = () => {
  const [name, setName] = useState(""); 
  const [address, setAddress] = useState(""); 

  const onSubmit = () => {
    // Ici, tu pourras sauvegarder les infos dans une base de données plus tard
    message.success("Boutique mise à jour !");
    console.log("Boutique:", { name, address });
  };

  return (
    <Card title="Boutique Details" style={{ margin: 20 }}>
      <Form layout="vertical" wrapperCol={{ span: 8 }} onFinish={onSubmit}>
        <Form.Item label="Boutique Name" required>
          <Input
            placeholder="Enter boutique name here"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </Form.Item>

        <Form.Item label="Boutique Address" required>
          <Input
            placeholder="Enter boutique address here"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
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

export default Settings;
