import React from "react";
import { View, Text, Image, StyleSheet, Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { API_URL } from "@env"; // Assurez-vous d'avoir l'URL de votre backend

const DressListItem = ({ dish }) => {
  const navigation = useNavigation();

  // Vérification et création du lien complet de l'image
  const imageUrl = dish.images?.length > 0
    ? `${API_URL}${dish.images[0]}` // ✅ Construit l'URL complète
    : "https://via.placeholder.com/150"; // Image par défaut si pas d'image

  return (
<Pressable
  onPress={() => {
    console.log("NAVIGATION VERS DressDetails :", dish._id);
    navigation.navigate("DressDetails", { id: dish._id }); // ✅ Correction ici
  }}
  style={styles.container}
>

      <View style={{ flex: 1 }}>
        <Text style={styles.name}>{dish.name}</Text>
        <Text style={styles.description} numberOfLines={2}>
          {dish.description}
        </Text>
        <Text style={styles.price}>$ {dish.price}</Text>
      </View>
      {/* ✅ Affichage de l'image */}
      <Image
        source={{ uri: imageUrl }}
        style={styles.image}
        onError={() => console.log("Erreur de chargement de l'image :", imageUrl)}
      />
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 10,
    marginVertical: 10,
    marginHorizontal: 20,
    borderBottomColor: "lightgrey",
    borderBottomWidth: 1,
    flexDirection: "row",
    alignItems: "center",
  },
  name: {
    fontWeight: "600",
    fontSize: 16,
    letterSpacing: 0.5,
  },
  description: {
    color: "gray",
    marginVertical: 5,
  },
  price: {
    fontSize: 16,
  },
  image: {
    width: 75,
    height: 75,
    borderRadius: 10,
    marginLeft: 10,
  },
});

export default DressListItem;
