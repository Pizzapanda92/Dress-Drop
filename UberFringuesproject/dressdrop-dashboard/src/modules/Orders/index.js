import { useState, useEffect } from "react";
import axios from "axios";
import { Card, Table, Tag, message } from "antd";
import { useNavigate, useParams } from "react-router-dom";

const statusToColor = {
  DELIVERED: "green",
  SHIPPED: "blue",
  PROCESSING: "orange",
  CANCELED: "red",
};

const OrderHistoryByShop = () => {
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();
  const { shopId } = useParams();

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/order/shop/${shopId}`);
        setOrders(response.data);
      } catch (error) {
        console.error("Erreur lors du fetch des commandes :", error);
        message.error("Impossible de récupérer les commandes.");
      }
    };

    fetchOrders();
  }, [shopId]);

  const renderOrderStatus = (status) => {
    return <Tag color={statusToColor[status] || "gray"}>{status}</Tag>;
  };

  const tableColumns = [
    {
      title: "Commande",
      dataIndex: "_id",
      key: "_id",
    },
    {
      title: "Date",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (date) => new Date(date).toLocaleDateString(),
    },
    {
      title: "Client",
      dataIndex: ["userId", "pseudo"],
      key: "client",
    },
    {
      title: "Prix total",
      dataIndex: "totalPrice",
      key: "price",
      render: (price) => `${price} €`,
    },
    {
      title: "Statut",
      dataIndex: "status",
      key: "status",
      render: renderOrderStatus,
    },
  ];

  return (
    <Card title="Commandes de la boutique" style={{ margin: 20 }}>
      <Table
        dataSource={orders}
        columns={tableColumns}
        rowKey="_id"
        onRow={(orderItem) => ({
          onClick: () => navigate(`/orders/${orderItem._id}`),
        })}
      />
    </Card>
  );
};

export default OrderHistoryByShop;
