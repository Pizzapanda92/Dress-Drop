import { Card, Table, Button, Popconfirm } from 'antd';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import dishesData from '../../assets/data/dishes.json'; // À remplacer plus tard par une base de données

const Shopdresing = () => {
    const [dishes, setDishes] = useState(dishesData);

    // Fonction pour supprimer un vêtement
    const deleteItem = (item) => {
        setDishes(dishes.filter((d) => d.id !== item.id));
    };

    const tableColumns = [
        {
            title: "Dressing",
            dataIndex: "name",
            key: "name",
        },
        {
            title: "Price",
            dataIndex: "price",
            key: "price",
            render: (price) => `${price} €`
        },
        {
            title: "Actions",
            key: "actions",
            render: (_, item) => (
                <>
                    <Button type="primary" style={{ marginRight: 10 }}>Acheter</Button>
                    <Popconfirm
                        placement="topLeft"
                        title="Êtes-vous sûr de vouloir supprimer cet article ?"
                        onConfirm={() => deleteItem(item)}
                        okText="Oui"
                        cancelText="Non"
                    >
                        <Button danger>Supprimer</Button>
                    </Popconfirm>
                </>
            )
        },
    ];

    // Bouton pour créer un nouvel article
    const renderNewItemButton = () => (
        <Link to={'/create-item'}>
            <Button type="primary">New Item</Button>
        </Link>
    );

    return (
        <Card 
            title="Dressing"
            style={{ margin: 20 }} 
            extra={renderNewItemButton()}
        >
            <Table dataSource={dishes} columns={tableColumns} rowKey="id" />
        </Card>
    );
};

export default Shopdresing;
