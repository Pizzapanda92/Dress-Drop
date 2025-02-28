import { useState, useEffect } from "react";
import { Card, Table, Tag } from "antd";
import { useNavigate } from "react-router-dom";
import ordersHistory from "../../assets/data/orders-history.json"; 

const statusToColor = {
  DELIVERED: "green",
  SHIPPED: "blue",
  PROCESSING: "orange",
  CANCELED: "red",
};

const OrderHistory = () => {
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Simuler la récupération des commandes depuis un fichier JSON
    setOrders(ordersHistory);
  }, []);

  const renderOrderStatus = (status) => {
    return <Tag color={statusToColor[status] || "gray"}>{status}</Tag>;
  };

  const tableColumns = [
    {
      title: "Order ID",
      dataIndex: "orderID",
      key: "orderID",
    },
    {
      title: "Created at",
      dataIndex: "createdAt",
      key: "createdAt",
    },
    {
      title: "Delivery Address",
      dataIndex: "deliveryAddress",
      key: "deliveryAddress",
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      render: (price) => `${price} €`,
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: renderOrderStatus,
    },
  ];

  return (
    <Card title={"Order History"} style={{ margin: 20 }}>
      <Table
        dataSource={orders}
        columns={tableColumns}
        rowKey="orderID"
        onRow={(orderItem) => ({
          onClick: () => navigate(`/orders/${orderItem.orderID}`),
        })}
      />
    </Card>
  );
};

export default OrderHistory;
