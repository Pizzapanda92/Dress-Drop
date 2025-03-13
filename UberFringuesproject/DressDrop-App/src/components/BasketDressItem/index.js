import React, { useContext } from "react";
import { View, Text, FlatList, StyleSheet, Pressable } from "react-native";
import { CartContext } from "../../context/CartContext";

const BasketScreen = () => {
  const { cart } = useContext(CartContext);

  return (
    <View style={styles.page}>
      <Text style={styles.title}>Mon Panier</Text>
      {cart.length === 0 ? (
        <Text style={styles.emptyText}>Votre panier est vide.</Text>
      ) : (
        <FlatList
          data={cart}
          renderItem={({ item }) => (
            <View style={styles.item}>
              <Text style={styles.name}>{item.name}</Text>
              <Text style={styles.price}>${item.totalPrice} ({item.quantity}x)</Text>
            </View>
          )}
          keyExtractor={(item, index) => index.toString()}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  page: { flex: 1, padding: 20, backgroundColor: "#fff" },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 20 },
  emptyText: { fontSize: 18, color: "gray", textAlign: "center", marginTop: 20 },
  item: { flexDirection: "row", justifyContent: "space-between", paddingVertical: 10, borderBottomWidth: 1, borderBottomColor: "#ddd" },
  name: { fontSize: 18 },
  price: { fontSize: 18, fontWeight: "bold" },
});

export default BasketScreen;