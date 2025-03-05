import { View, Text, Image, FlatList } from "react-native";
import BasketDressItem from "../../components/BasketDressItem";
import orders from "../../../assets/data/boutiques_orders.json";
import boutiques from "../../../assets/data/boutiques.json";
import styles from "./styles";
const order = orders[0];
const OrderDetailsHeader = () => {
  return (
    <View>
      <View style={styles.page}>
        <Image source={{ uri: order.boutique.image }} style={styles.image} />
        <View style={styles.container}>
          <Text style={styles.title}>{order.boutique.name}</Text>
          <Text style={styles.subtitle}>{order.status} &#8226; 2 days ago</Text>
          <Text style={styles.menuTitle}>Your orders</Text>
        </View>
      </View>
    </View>
  );
};
const OrderDetails = () => {
  return (
    <FlatList
      ListHeaderComponent={OrderDetailsHeader}
      data={boutiques[0].clothes} // ✅ Correction ici
      renderItem={({ item }) => <BasketDressItem basketDish={item} />}
    />
  );
};
export default OrderDetails;
