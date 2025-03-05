import React, { useContext, useState } from "react";
import { View, Text, FlatList, StyleSheet, Pressable, Alert, ActivityIndicator } from "react-native";
import { CartContext } from "../../context/CartContext";
import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const BasketScreen = () => {
  const { cart, removeFromCart, clearCart, placeOrder } = useContext(CartContext);
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  const userId = "USER_ID_EXAMPLE"; // À remplacer par l'ID réel de l'utilisateur
  const shopId = cart.length > 0 ? cart[0].shopId : null;

  const handleRemoveItem = (item) => {
    Alert.alert(
      "Supprimer l'article",
      `Voulez-vous vraiment supprimer ${item.name} (${item.size}, ${item.color}) du panier ?`,
      [
        { text: "Annuler", style: "cancel" },
        { text: "Supprimer", onPress: () => removeFromCart(item), style: "destructive" },
      ]
    );
  };

  const handlePlaceOrder = async () => {
    if (cart.length === 0) {
      Alert.alert("Panier vide", "Ajoutez des articles avant de commander !");
      return;
    }

    setLoading(true);
    try {
      const orderResponse = await placeOrder(userId, shopId);
      setLoading(false);
      Alert.alert(
        "Commande réussie",
        `Votre commande est en cours de préparation. Temps estimé: ${orderResponse.order.estimatedTime} min.`,
        [{ text: "OK", onPress: () => navigation.navigate("OrderConfirmation") }]
      );
    } catch (error) {
      setLoading(false);
      Alert.alert("Erreur", "Impossible de passer la commande.");
    }
  };

  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);
  };

  return (
<View style={styles.container}>
  <Text style={styles.title}>🛒 Mon Panier</Text>

  {cart.length === 0 ? (
    <Text style={styles.emptyCartText}>Votre panier est vide.</Text>
  ) : (
    <>
      <FlatList
        data={cart}
        keyExtractor={(item, index) => `${item.id}-${item.size}-${item.color}-${index}`}
        renderItem={({ item }) => (
          <View style={styles.itemContainer}>
            <View>
              <Text style={styles.itemText}>{item.name} ({item.size}, {item.color})</Text>
              <Text style={styles.itemPrice}>${item.price} x {item.quantity}</Text>
            </View>
            <Pressable onPress={() => handleRemoveItem(item)}>
              <AntDesign name="delete" size={24} color="red" />
            </Pressable>
          </View>
        )}
      />

      <Text style={styles.totalText}>💰 Total : ${getTotalPrice()}</Text>

      {/* ✅ Bouton pour aller au récapitulatif */}
      <Pressable style={styles.orderSummaryButton} onPress={() => navigation.navigate("OrderSummary")}>
        <Text style={styles.orderSummaryButtonText}>📋 Voir le récapitulatif</Text>
      </Pressable>

      {/* ✅ Bouton de validation finale */}
      <Pressable style={styles.orderButton} onPress={handlePlaceOrder} disabled={loading}>
        {loading ? (
          <ActivityIndicator color="white" />
        ) : (
          <Text style={styles.orderButtonText}>✅ Passer la commande</Text>
        )}
      </Pressable>
    </>
  )}
</View>

  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#fff" },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 20, textAlign: "center" },
  emptyCartText: { fontSize: 18, textAlign: "center", color: "gray", marginTop: 20 },
  itemContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  itemText: { fontSize: 16, fontWeight: "600" },
  itemPrice: { fontSize: 14, color: "gray" },
  totalText: { fontSize: 20, fontWeight: "bold", textAlign: "right", marginTop: 20 },
  orderButton: {
    backgroundColor: "green",
    padding: 12,
    borderRadius: 8,
    marginTop: 20,
    alignItems: "center",
  },
  orderButtonText: { color: "white", fontSize: 18, fontWeight: "bold" },
});

export default BasketScreen;
