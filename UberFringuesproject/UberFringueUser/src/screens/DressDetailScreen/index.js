import React, { useEffect, useState, useContext } from "react";
import { View, Text, StyleSheet, Pressable, ActivityIndicator, Image, ScrollView } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { Picker } from "@react-native-picker/picker"; 
import { useRoute, useNavigation } from "@react-navigation/native";
import axios from "axios";
import { API_URL } from "@env";
import { CartContext } from "../../context/CartContext";

const DressDetailsScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const { addToCart } = useContext(CartContext);
  const dressId = route.params?.id;

  const [dress, setDress] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState("");

  useEffect(() => {
    if (!dressId) {
      setError("Erreur : ID d'article manquant");
      setLoading(false);
      return;
    }

    const fetchDress = async () => {
      try {
        console.log(`📡 Requête envoyée à : ${API_URL}/clothes/item/${dressId}`);
        const response = await axios.get(`${API_URL}/clothes/item/${dressId}`);
        if (response.status === 200) {
          const data = response.data;
          setDress(data);

          setSelectedSize(data.sizes?.length > 0 ? data.sizes[0] : "");
          setSelectedColor(data.colors?.length > 0 ? data.colors[0] : "");
        } else {
          setError("Erreur : Article introuvable");
        }
      } catch (error) {
        console.error("Erreur API :", error.response?.data || error.message);
        setError("Erreur lors de la récupération de l'article.");
      } finally {
        setLoading(false);
      }
    };

    fetchDress();
  }, [dressId]);

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#000" />
      </View>
    );
  }

  if (error || !dress) {
    return <Text style={styles.errorText}>{error || "Erreur : Article introuvable"}</Text>;
  }

  const onMinus = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const onPlus = () => {
    setQuantity(quantity + 1);
  };

  const getTotal = () => {
    return (dress.price * quantity).toFixed(2);
  };

  const handleAddToCart = () => {
    const itemToAdd = {
      productId: dress._id,
      name: dress.name,
      price: dress.price,
      quantity,
      size: selectedSize,
      color: selectedColor, 
      image: dress.images.length > 0 ? dress.images[0] : null,
    };
  
    console.log("Ajout au panier :", itemToAdd);
  
    addToCart(itemToAdd);
    navigation.navigate("Basket");
  };
  
  return (
    <ScrollView 
      style={styles.container} 
      contentContainerStyle={{ paddingBottom: 50 }} 
      keyboardShouldPersistTaps="handled"
    > 
      <View style={styles.page}>
        {dress.images.length > 0 && (
          <Image source={{ uri: `${API_URL}${dress.images[0]}` }} style={styles.image} />
        )}
        <Text style={styles.name}>{dress.name}</Text>
        <Text style={styles.description}>{dress.description}</Text>
        <View style={styles.separator} />

        <View style={styles.detailRow}>
          <Text style={styles.label}>Taille :</Text>
          <Picker selectedValue={selectedSize} onValueChange={setSelectedSize} style={styles.picker}>
            {dress.sizes && dress.sizes.length > 0 ? (
              dress.sizes.map((size, index) => <Picker.Item key={index} label={size} value={size} />)
            ) : (
              <Picker.Item label="Aucune taille dispo" value="" />
            )}
          </Picker>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.label}>Couleur :</Text>
          <Picker selectedValue={selectedColor} onValueChange={setSelectedColor} style={styles.picker}>
            {dress.colors && dress.colors.length > 0 ? (
              dress.colors.map((color, index) => <Picker.Item key={index} label={color} value={color} />)
            ) : (
              <Picker.Item label="Aucune couleur dispo" value="" />
            )}
          </Picker>
        </View>

        <View style={styles.row}>
          <AntDesign name="minuscircleo" size={50} color="black" onPress={onMinus} />
          <Text style={styles.quantity}>{quantity}</Text>
          <AntDesign name="pluscircleo" size={50} color="black" onPress={onPlus} />
        </View>

        <Pressable style={styles.button} onPress={handleAddToCart}>
          <Text style={styles.buttonText}>Ajouter {quantity} au panier • ${getTotal()}</Text>
        </Pressable>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  image: { width: "100%", height: 250, resizeMode: "contain", marginBottom: 10 },
  name: { fontSize: 28, fontWeight: "700", textAlign: "center", marginVertical: 10 },
  description: { color: "gray", fontSize: 16, textAlign: "center", marginBottom: 10 },
  separator: { height: 1, backgroundColor: "lightgrey", marginVertical: 15 },
  detailRow: { marginVertical: 10, paddingHorizontal: 10 },
  label: { fontSize: 18, fontWeight: "600", marginBottom: 5 },
  picker: { height: 50, width: "100%", backgroundColor: "#f5f5f5", borderRadius: 5, marginBottom: 10 },
  row: { flexDirection: "row", alignItems: "center", justifyContent: "center", marginVertical: 20 },
  quantity: { fontSize: 28, fontWeight: "700", marginHorizontal: 20 },
  button: { backgroundColor: "black", paddingVertical: 15, margin: 20, borderRadius: 8, width: "90%", alignSelf: "center" },
  buttonText: { color: "white", fontWeight: "700", fontSize: 20, textAlign: "center" },
  errorText: { color: "red", textAlign: "center", marginTop: 20, fontSize: 16 },
  centered: { flex: 1, justifyContent: "center", alignItems: "center" },
});

export default DressDetailsScreen;
