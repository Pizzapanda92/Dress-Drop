import { Card, Descriptions, Divider, List, Button, Tag, Spin } from "antd";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import ordersData from "../../assets/data/orders.json"; // Simulons une base de commandes

const statusToColor = {
  NEW: "green",
  PREPARING: "orange",
  READY_FOR_PICKUP: "red",
  SHIPPED: "blue",
  DELIVERED: "purple",
  CANCELED: "gray",
};

const DetailedOrder = () => {
  const { orderID } = useParams();
  const [order, setOrder] = useState(null);

  useEffect(() => {
    // Simulons la récupération d'une commande
    const foundOrder = ordersData.find((o) => o.id === orderID);
    setOrder(foundOrder);
  }, [orderID]);

  const updateOrderStatus = (newStatus) => {
    setOrder((prevOrder) => ({ ...prevOrder, status: newStatus }));
  };

  if (!order) {
    return <Spin size="large" />;
  }

  return (
    <Card title={`Order ${orderID}`} style={{ margin: 20 }}>
      <Tag color={statusToColor[order.status]}>{order.status}</Tag>

      <Descriptions bordered column={1}>
        <Descriptions.Item label="Customer">{order.customerName}</Descriptions.Item>
        <Descriptions.Item label="Customer Address">{order.customerAddress}</Descriptions.Item>
      </Descriptions>

      <Divider />

      <List
        dataSource={order.items}
        renderItem={(item) => (
          <List.Item>
            <div style={{ fontWeight: "bold" }}>
              {item.name} x{item.quantity}
            </div>
            <div>{item.price} €</div>
          </List.Item>
        )}
      />

      <Divider />

      <div style={styles.totalSumContainer}>
        <h2>Total:</h2>
        <h2 style={styles.totalPrice}>{order.total} €</h2>
      </div>

      <Divider />

      {order.status === "NEW" && (
        <div style={styles.buttonsContainer}>
          <Button block type="danger" size="large" style={styles.button} onClick={() => updateOrderStatus("CANCELED")}>
            Cancel Order
          </Button>
          <Button block type="primary" size="large" style={styles.button} onClick={() => updateOrderStatus("PREPARING")}>
            Start Preparing
          </Button>
        </div>
      )}

      {order.status === "PREPARING" && (
        <Button block type="primary" size="large" onClick={() => updateOrderStatus("READY_FOR_PICKUP")}>
          Mark as Ready
        </Button>
      )}

      {order.status === "READY_FOR_PICKUP" && (
        <Button block type="primary" size="large" onClick={() => updateOrderStatus("SHIPPED")}>
          Mark as Shipped
        </Button>
      )}

      {order.status === "SHIPPED" && (
        <Button block type="primary" size="large" onClick={() => updateOrderStatus("DELIVERED")}>
          Mark as Delivered
        </Button>
      )}
    </Card>
  );
};

const styles = {
  totalSumContainer: {
    flexDirection: "row",
    display: "flex",
  },
  totalPrice: {
    marginLeft: "auto",
    fontWeight: "bold",
  },
  buttonsContainer: {
    display: "flex",
    paddingBottom: 30,
  },
  button: {
    marginRight: 20,
    marginLeft: 20,
  },
};

export default DetailedOrder;
