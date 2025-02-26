import orders from '../../assets/data/orders.json';
import { Card, Table, Tag } from 'antd';

const Orders = () => {
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
            render: (price) => '${price} $'
        },

    ];
    return (
        <Card titles ={'Orders'} style={{margin: 20 }}>
            <Table 
            dataSource={orders}
            columns={tableColumns}
            />
        </Card>
    )
};

export default Orders;