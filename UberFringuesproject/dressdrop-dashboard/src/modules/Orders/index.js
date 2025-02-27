import orders from '../../assets/data/orders.json';
import { Card, Table, Tag } from 'antd';
import { useNavigate } from 'react-router-dom';

const Orders = () => {
    const navigate = useNavigate();
    const renderOrderStatus = (orderStatus) => {
        if (orderStatus === 'Accepted') {
            return <Tag color={'green'}>{orderStatus}</Tag>
        }
        if (orderStatus === 'Pending') {
            return <Tag color={'orange'}>{orderStatus}</Tag>
        }
        if (orderStatus === 'Declin') {
            return <Tag color={'red'}>{orderStatus}</Tag>
        }
    };

    const tableColumns = [
        {
            title: 'Order ID',
            dataIndex: 'orderID',
            key: 'orderID'
        },
        {
            title: 'Delivery Address',
            dataIndex: 'deliveryAddress',
            key: 'deliveryAddress'
        },
        {
            title: 'Price',
            dataIndex: 'price',
            key: 'price',
            render: (price) => `${price} €`
        },
        {
            title:'Status',
            dataIndex:'status',
            key: 'status',
            render: renderOrderStatus
        }

    ];
    return (
        <Card title={'Orders'} style={{ margin: 20 }}>
            <Table 
                dataSource={orders}
                columns={tableColumns}
                rowKey="orderID"
                onRow={(orderItem) => ({
                    onClick: () => navigate(`orders/${orderItem.orderID}`)
                })}
            />
        </Card>
    );
};

export default Orders;