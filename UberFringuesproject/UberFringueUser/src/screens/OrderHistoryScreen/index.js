import React, { useEffect, useState, useContext } from "react";
import { View, Text, FlatList, StyleSheet, ActivityIndicator, Image } from "react-native";
import axios from "axios";
import { API_URL } from "@env";
import { AuthContext } from "../../context/AuthContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Feather } from "@expo/vector-icons";

const OrderHistoryScreen = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const userId = await AsyncStorage.getItem("userId");
        if (!userId) throw new Error("Utilisateur non trouvé !");

        console.log("Récupération des commandes pour userId :", userId);
        const response = await axios.get(`${API_URL}/order/user/${userId}`);

        if (!response.data) {
          throw new Error("Aucune commande trouvée !");
        }

        console.log("Commandes récupérées :", response.data);
        setOrders(response.data);
      } catch (error) {
        console.error("Erreur lors de la récupération des commandes :", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#000" />
      </View>
    );
  }

  if (!orders.length) {
    return <Text style={styles.noOrdersText}>Vous n'avez pas encore de commandes.</Text>;
  }

  return (
    <FlatList
      data={orders}
      keyExtractor={(item) => item._id}
      renderItem={({ item }) => (
        <View style={styles.orderContainer}>
          <Image
            source={{ uri: item.shopId?.image ? `${API_URL}${item.shopId.image}` : `${API_URL}/default-shop.jpg` }}
            style={styles.shopImage}
          />
          <View style={styles.detailsContainer}>
            <Text style={styles.shopName}>{item.shopId?.name || "Magasin inconnu"}</Text>
            <Text style={styles.orderStatus}>Statut : {item.status}</Text>
            <View style={styles.iconTextContainer}>
              <Feather name="package" size={14} color="#00aaff" />
              <Text style={styles.deliveryTime}> Livraison estimée : {item.estimatedTime || "-"} min</Text>
            </View>
            <Text style={styles.orderTotal}>Total : ${item.grandTotal.toFixed(2)}</Text>
          </View>
          <FlatList
            data={item.items}
            keyExtractor={(product) => product.productId._id}
            renderItem={({ item }) => (
              <View style={styles.productContainer}>
                <Image
                  source={{
                    uri: item.productId?.images?.length > 0
                      ? `${API_URL}${item.productId.images[0]}`
                      : `${API_URL}/default-product.jpg`
                  }}
                  style={styles.productImage}
                />
                <View>
                  <Text style={styles.productName}>{item.productId.name}</Text>
                  <Text style={styles.productPrice}>${item.price} x {item.quantity}</Text>
                </View>
              </View>
            )}
          />
        </View>
      )}
    />
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 10, backgroundColor: "#fff" },
  title: { fontSize: 20, fontWeight: "bold", marginBottom: 15, textAlign: "center" },
  noOrdersText: { fontSize: 16, textAlign: "center", color: "gray", marginTop: 10 },
  loadingContainer: { flex: 1, justifyContent: "center", alignItems: "center" },

  orderContainer: {
    backgroundColor: "#fff",
    marginBottom: 10,
    borderRadius: 8,
    padding: 10,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 1,
  },
  shopImage: {
    width: "100%",
    height: 100,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    resizeMode: "cover",
  },
  detailsContainer: { padding: 5 },
  shopName: { fontSize: 18, fontWeight: "bold", marginBottom: 2 },
  orderStatus: { fontSize: 14, color: "gray" },
  orderTotal: { fontSize: 14, fontWeight: "bold", marginTop: 3 },
  deliveryTime: { fontSize: 12, color: "#00aaff" },
  iconTextContainer: { flexDirection: "row", alignItems: "center" },

  productContainer: { flexDirection: "row", alignItems: "center", marginTop: 5 },
  productImage: {
    width: 50, 
    height: 50,
    marginRight: 8,
    borderRadius: 5,
    resizeMode: "cover",
  },
  productName: { fontSize: 14, fontWeight: "bold" },
  productPrice: { fontSize: 12, color: "gray" },
});

export default OrderHistoryScreen;
