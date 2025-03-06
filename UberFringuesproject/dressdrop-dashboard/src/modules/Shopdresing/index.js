import { Card, Table, Button, Popconfirm } from "antd";
import { Link } from "react-router-dom";
import { useBoutiqueContext } from "../../contexts/BoutiqueContext"; // 🔹 Import du contexte

const Shopdresing = () => {
    const { clothingItems, setClothingItems } = useBoutiqueContext(); // 🔹 Récupère les vêtements depuis le contexte

    // Fonction pour supprimer un vêtement
    const deleteItem = (item) => {
        setClothingItems(clothingItems.filter((d) => d.id !== item.id));
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
            render: (price) => `${price} €`,
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
            ),
        },
    ];

    // Bouton pour créer un nouvel article
    const renderNewItemButton = () => (
        <Link to={'/dresing/create'}>
            <Button type="primary">New Item</Button>
        </Link>
    );

    return (
        <Card 
            title="Dressing"
            style={{ margin: 20 }} 
            extra={renderNewItemButton()}
        >
            <Table dataSource={clothingItems} columns={tableColumns} rowKey="id" />
        </Card>
    );
};

export default Shopdresing;

