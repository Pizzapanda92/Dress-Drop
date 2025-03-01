import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";

const BoutiqueHeader = ({ boutique }) => {
  // Vérification si 'boutique' existe avant d'accéder à ses propriétés
  if (!boutique) {
    return (
      <View style={styles.page}>
        <Text style={styles.title}>Détails de la boutique non disponibles</Text>
      </View>
    );
  }

  // Extraction des propriétés de la boutique avec des valeurs par défaut
  const {
    image = null,
    name = "Nom inconnu",
    deliveryFee = "N/A",
    minDeliveryTime = "N/A",
    maxDeliveryTime = "N/A",
  } = boutique;

  return (
    <View style={styles.page}>
      {/* Affichage de l'image de la boutique */}
      {image ? (
        <Image source={{ uri: image }} style={styles.image} />
      ) : (
        <Text style={styles.title}>Aucune image disponible</Text>
      )}

      {/* Affichage des informations de la boutique */}
      <View style={styles.container}>
        <Text style={styles.title}>{name}</Text>
        <Text style={styles.subtitle}>
          $ {deliveryFee} • {minDeliveryTime}-{maxDeliveryTime} minutes
        </Text>
        <Text style={styles.menuTitle}>Menu</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: "#fff",
  },
  image: {
    width: "100%",
    aspectRatio: 5 / 3,
    marginBottom: 10,
  },
  container: {
    padding: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 16,
    color: "grey",
    marginBottom: 10,
  },
  menuTitle: {
    fontSize: 20,
    fontWeight: "600",
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
    paddingBottom: 5,
  },
});

export default BoutiqueHeader;