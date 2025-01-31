import { View, Text, FlatList, Image, StyleSheet} from 'react-native';
import OrderListeItem from '../../components/OrderListeItem';
import orders from "../../../assets/data/boutiques_orders.json";


const OrdersScreen  = () => {
  return (
    <View style={styles.page}>
        <FlatList 
        data={orders} 
        renderItem={({ item }) => <OrderListeItem order={item}/>}
        />
    </View>
  );
};

export default OrdersScreen;

const styles = StyleSheet.create({
    page: {
      flex: 1,
      width: '100%',
      paddingTop: 50,
    },
  });
  
