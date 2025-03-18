import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";

const BoutiqueHeader = ({ boutique }) => {
  if (!boutique) {
    return (
      <View style={styles.page}>
        <Text style={styles.title}>Détails de la boutique non disponibles</Text>
      </View>
    );
  }

  const { image, name, description, ShopAddress } = boutique;

  return (
    <View style={styles.page}>
      {image ? (
        <Image source={{ uri: image }} style={styles.image} />
      ) : (
        <Text style={styles.title}>Aucune image disponible</Text>
      )}

      <View style={styles.container}>
        <Text style={styles.title}>{name}</Text>
        <Text style={styles.description}>{description}</Text>
        {ShopAddress && (
          <View style={styles.addressContainer}>
            <Text style={styles.addressTitle}> Adresse :</Text>
            <Text style={styles.addressText}>
              {ShopAddress.street}, {ShopAddress.city}, {ShopAddress.postalCode}, {ShopAddress.country}
            </Text>
          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  page: { backgroundColor: "#fff" },
  image: { width: "100%", height: 200 },
  container: { padding: 10 },
  title: { fontSize: 22, fontWeight: "bold" },
  description: { fontSize: 16, color: "grey", marginBottom: 10 },

  addressContainer: {
    marginTop: 10,
    padding: 10,
    backgroundColor: "#f9f9f9",
    borderRadius: 8,
  },
  addressTitle: { fontSize: 16, fontWeight: "bold", color: "#333" },
  addressText: { fontSize: 14, color: "#555", marginTop: 5 },
});

export default BoutiqueHeader;
