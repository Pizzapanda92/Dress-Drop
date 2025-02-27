import { Card, Table, Button } from 'antd';
import dishes from '../../assets/data/dishes.json';
import { Link } from 'react-router-dom';

const Shopdresing = () => {
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
            title: "Action",
            key: "action",
            render: () => (
                <Button type="primary">Acheter</Button>
            )
        },
    ];

    const renderNewItemButton = () => {
        return (
            <Link to={'/create-item'}>
                <Button type="primary">New Item</Button>
            </Link>
        );
    };

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