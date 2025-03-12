import { View, Text, Image, FlatList } from "react-native";
import { useRoute } from "@react-navigation/native";
import styles from "./styles";

const OrderDetailsScreen = () => {
  const route = useRoute();
  const order = route.params?.order;
  return (
    <View style={styles.page}>
      <Image source={{ uri: order.shopId.image }} style={styles.image} />
      <View style={styles.container}>
        <Text style={styles.title}>{order.shopId.name}</Text>
        <Text style={styles.subtitle}>Statut : {order.status} • Livraison dans {order.estimatedTime} min</Text>
        <Text style={styles.menuTitle}>Vos articles commandés</Text>
      </View>

      <FlatList
        data={order.items}
        keyExtractor={(item) => item.productId._id}
        renderItem={({ item }) => (
          <View style={styles.productContainer}>
            <Image source={{ uri: item.productId.image }} style={styles.productImage} />
            <View>
              <Text>{item.productId.name}</Text>
              <Text>${item.price} x {item.quantity}</Text>
            </View>
          </View>
        )}
      />
    </View>
  );
};

export default OrderDetailsScreen;

