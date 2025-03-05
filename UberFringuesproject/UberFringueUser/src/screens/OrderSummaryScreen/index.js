import React, { useContext, useState } from "react";
import { View, Text, StyleSheet, Pressable, Alert, ActivityIndicator } from "react-native";
import { CartContext } from "../../context/CartContext";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";
import { API_URL } from "@env";

const OrderSummaryScreen = () => {
  const { cart, clearCart } = useContext(CartContext);
  const { user } = useContext(AuthContext);
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("Visa");
  const [estimatedTime, setEstimatedTime] = useState(null);

  if (!user || !user._id) {
    return <Text style={styles.errorText}>⚠️ Erreur : Utilisateur non connecté.</Text>;
  }

  const userId = user._id;
  const shopId = cart.length > 0 ? cart[0].shopId : null;

  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);
  };

  const handlePlaceOrder = async () => {
    if (!shopId) {
      Alert.alert("Erreur", "Impossible de passer la commande, aucun magasin détecté.");
      return;
    }

    setLoading(true);
    try {
      const orderData = {
        userId,
        shopId,
        items: cart.map((item) => ({
          productId: item.productId || item.id, // ✅ Correction ici pour s'assurer d'envoyer "productId"
          quantity: item.quantity,
          price: item.price,
        })),
        totalPrice: parseFloat(getTotalPrice()),
        deliveryFee: 5, // Peut être dynamique
        tip: 0,
      };

      console.log("📤 Envoi de la commande :", JSON.stringify(orderData, null, 2));

      // ✅ Vérification de l'URL API
      const response = await axios.post(`${API_URL}/orders/create`, orderData);
      console.log("✅ Réponse API :", response.data);

      if (response.data.order?.estimatedTime) {
        setEstimatedTime(response.data.order.estimatedTime);
      } else {
        console.warn("⛔ Aucune estimation du temps reçue !");
      }

      Alert.alert(
        "Commande Validée",
        `Livraison estimée dans ${response.data.order.estimatedTime || "inconnu"} min`,
        [{ text: "OK", onPress: () => navigation.navigate("Home") }]
      );

      clearCart();
    } catch (error) {
      console.error("❌ Erreur lors de la commande :", error.response?.data || error.message);
      Alert.alert("Erreur", "Impossible de passer la commande. Vérifiez votre connexion.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🛍️ Récapitulatif de la commande</Text>

      {cart.map((item, index) => (
        <View key={`${item.productId || item.id}-${index}`} style={styles.item}>
          <Text>{item.name} ({item.size}, {item.color})</Text>
          <Text>{item.quantity} x ${item.price}</Text>
        </View>
      ))}

      <Text style={styles.total}>💰 Total: ${getTotalPrice()}</Text>

      <Text style={styles.subtitle}>💳 Mode de paiement</Text>
      <Pressable style={styles.paymentOption} onPress={() => setPaymentMethod("Visa")}>
        <Text>💳 Visa (•••• 4497)</Text>
      </Pressable>
      <Pressable style={styles.paymentOption} onPress={() => setPaymentMethod("PayPal")}>
        <Text>💰 PayPal</Text>
      </Pressable>

      {estimatedTime !== null && (
        <Text style={styles.estimate}>⏳ Estimation : {estimatedTime} min</Text>
      )}

      <Pressable style={styles.orderButton} onPress={handlePlaceOrder} disabled={loading}>
        {loading ? <ActivityIndicator color="white" /> : <Text style={styles.orderButtonText}>✅ Commander et Payer</Text>}
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#fff" },
  title: { fontSize: 22, fontWeight: "bold", marginBottom: 10 },
  item: { flexDirection: "row", justifyContent: "space-between", marginVertical: 5 },
  total: { fontSize: 18, fontWeight: "bold", marginTop: 15 },
  subtitle: { fontSize: 18, fontWeight: "bold", marginTop: 20 },
  paymentOption: { padding: 10, backgroundColor: "#f5f5f5", marginTop: 5, borderRadius: 5 },
  estimate: { fontSize: 18, fontWeight: "bold", marginTop: 10, color: "green" },
  orderButton: { backgroundColor: "black", padding: 15, borderRadius: 5, marginTop: 20, alignItems: "center" },
  orderButtonText: { color: "white", fontSize: 18, fontWeight: "bold" },
  errorText: { color: "red", fontSize: 16, textAlign: "center", marginTop: 20 },
});

export default OrderSummaryScreen;
