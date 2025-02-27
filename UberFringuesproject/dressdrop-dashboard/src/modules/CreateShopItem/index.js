import { Form, Input, Button, Card, InputNumber } from "antd";

const { TextArea } = Input;

const CreateClothingItem = () => {
  const onFinish = (values) => {
    console.log("Success:", values);
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
