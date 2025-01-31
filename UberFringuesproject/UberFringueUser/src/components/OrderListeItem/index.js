import { View, Text, Image, StyleSheet } from 'react-native';

const OrderListeItem = ({ order }) => {
  return (
    <View>
      <View style={styles.view1}>
        <Image 
          source={{ uri: order.boutique.image }} 
          style={styles.image}
        />
        <View>
          <Text style={styles.boutiquename}>{order.boutique.name}</Text>
          <Text style={styles.price}>3 articles &#8226; 55.50€</Text>
          <Text>2 days ago &#8226; {order.status} </Text>
        </View>
      </View>
      <View style={styles.separator} />
    </View>
  );
}

export default OrderListeItem;

const styles = StyleSheet.create({

  image: {
    width: 75,
    height: 75,
    marginRight: 6,
    borderRadius: 5,
  },
  view1: {
    flexDirection: "row",
    alignItems: 'center',
    padding: 10,
    backgroundColor: "#fff",
  },
  boutiquename: {
    fontWeight: "600",
    fontSize: 16,
  },
  price: {
    marginVertical: 5,
    color: "#666",
  },
  separator: {
    height: 1,
    backgroundColor: "#ddd",
    width: "100%",
    alignSelf: "center",
  },
});
