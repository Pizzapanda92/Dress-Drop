import React, { useContext, useState } from "react";
import { View, Text, FlatList, StyleSheet, Pressable, Alert, ActivityIndicator, Image } from "react-native";
import { CartContext } from "../../context/CartContext";
import { useNavigation } from "@react-navigation/native";
import { API_URL } from "@env";
import { FontAwesome, MaterialCommunityIcons } from "@expo/vector-icons";

const BasketScreen = () => {
  const { cart, removeFromCart, placeOrder } = useContext(CartContext);
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);

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
      const orderResponse = await placeOrder();
      setLoading(false);
      Alert.alert(
        "Commande réussie",
        `Votre commande est en cours de préparation. Temps estimé: ${orderResponse.order.estimatedTime} min.`,
        [{ text: "OK", onPress: () => navigation.navigate("LoadingScreen") }]
      );
    } catch (error) {
      setLoading(false);
      Alert.alert("Erreur", "Impossible de passer la commande.");
    }
  };

  const handlePayment = () => {
    Alert.alert("Paiement", "Vous serez redirigé vers la page de paiement.");
  };

  const getTotalPrice = () => {
    return cart.reduce((total, item) => {
      const price = item.productId?.price ?? 0;
      const quantity = item.quantity ?? 1;
      return total + price * quantity;
    }, 0).toFixed(2);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <FontAwesome name="shopping-cart" size={30} color="black" />
        <Text style={styles.title}> Mon Panier</Text>
      </View>

      {Array.isArray(cart) && cart.length === 0 ? (
        <Text style={styles.emptyCartText}>Votre panier est vide.</Text>
      ) : (
        <>
          <FlatList
            data={cart}
            keyExtractor={(item, index) => `${item.productId?._id || item._id}-${index}`}
            renderItem={({ item }) => (
              <View style={styles.itemContainer}>
                <View>
                  <Text style={styles.itemText}>{item.productId?.name || "Produit inconnu"}</Text>
                  <Text style={styles.itemPrice}>
                    ${item.productId?.price ? item.productId.price.toFixed(2) : "0.00"} x {item.quantity ?? 1}
                  </Text>
                  {item.productId?.images?.length > 0 && (
                    <Image
                      source={{ uri: `${API_URL}${item.productId.images[0]}` }}
                      style={styles.productImage}
                    />
                  )}
                </View>
                <Pressable onPress={() => handleRemoveItem(item)}>
                  <MaterialCommunityIcons name="trash-can" size={24} color="red" />
                </Pressable>
              </View>
            )}
          />
          <View style={styles.totalContainer}>
            <Pressable
              style={styles.paymentButton}
              onPress={() => navigation.navigate("Payment", { totalAmount: getTotalPrice() })}
            >
              <FontAwesome name="cc-stripe" size={24} color="white" />
              <Text style={styles.paymentButtonText}>Payer avec Stripe</Text>
            </Pressable>

            <Text style={styles.totalText}>
              <FontAwesome name="cc-stripe" size={20} color="#000" /> Total : ${getTotalPrice()}
            </Text>
          </View>
          <Pressable style={styles.orderButton} onPress={handlePlaceOrder} disabled={loading}>
            {loading ? (
              <ActivityIndicator color="white" />
            ) : (
              <View style={styles.iconTextContainer}>
                <MaterialCommunityIcons name="cash-register" size={20} color="white" />
                <Text style={styles.orderButtonText}> Passer la commande</Text>
              </View>
            )}
          </Pressable>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#fff" },

  header: { flexDirection: "row", alignItems: "center", marginBottom: 20, justifyContent: "center" },
  title: { fontSize: 24, fontWeight: "bold", marginLeft: 10 },

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
  productImage: { width: 50, height: 50, borderRadius: 8, marginTop: 5 },

  totalContainer: {
    flexDirection: "column",
    alignItems: "center",
    marginTop: 20,
    padding: 10,
    borderRadius: 10,
    backgroundColor: "#f5f5f5",
  },
  totalText: { fontSize: 20, fontWeight: "bold", marginTop: 10 },

  paymentButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#6772E5",
    padding: 12,
    borderRadius: 8,
    marginTop: 10,
  },
  paymentButtonText: { color: "white", fontSize: 16, fontWeight: "bold", marginLeft: 10 },

  orderButton: {
    backgroundColor: "#DAA520",
    padding: 12,
    borderRadius: 8,
    marginTop: 20,
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 3,
  },
  iconTextContainer: { flexDirection: "row", alignItems: "center" },
  orderButtonText: { color: "white", fontSize: 18, fontWeight: "bold", marginLeft: 10 },
});

export default BasketScreen;

