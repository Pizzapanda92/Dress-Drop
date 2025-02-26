import { Card, Descriptions, Divider, List, Button } from 'antd';
import dishes from '../src/assets/data/dishes.json';

const DetailedOrder = () => {
    return (
        <Card title={'order Title'} style={{ margin: 20}}>
      <Descriptions bordered column= {{lg: 1, md: 1, sm: 1}}>
        <Descriptions.Item label="Customer">
            fabio dej
        </Descriptions.Item>
        <Descriptions.Item label="Customer Address">
          101 avenue cher moi 
        </Descriptions.Item>
      </Descriptions>
      <Divider />
      <List 
        dataSource={dishes}
        renderItem={(dishItem) => (
          <List.Item>
            <div style={{fontWeight: 'bold'}}>{dishItem.name} x{dishItem.quantity}</div>
            <div>{dishItem.price}</div>
          </List.Item>
        )}
      />
      <Divider />
      <div style={styles.totalSumContainer}> 
        <h2> Total: </h2>
        <h2 style={styles.totalPrice}> 142€50 </h2>
      </div>
      <Divider />
      <div style={styles.buttonsContainer}>
        <Button block types="danger" size="large" style={styles.button}>
          Decline Order
        </Button>
        <Button block types="primary" size="large" style={styles.button}>
          Accept Order
        </Button>
      </div>
      <Button block types="primary" size="large">
          Colis is ready
        </Button>
    </Card>
    )
};

const styles = {
    totalSumContainer: {
      flexDirection: 'row',
      display: 'flex',
    },
  
    totalPrice: {
      marginLeft: 'auto',
      fontWeight: 'bold',
    },
    buttonsContainer: {
      display: 'flex',
      paddingBottom: 30
    },
  
    button: {
      marginRight: 20,
      marginLeft: 20,
    }
  };

export default DetailedOrder;