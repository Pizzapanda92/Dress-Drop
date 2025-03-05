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

  const { image, name, description } = boutique;

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
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  page: {
    backgroundColor: "#fff",
  },
  image: {
    width: "100%",
    height: 200,
  },
  container: {
    padding: 10,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
  },
  description: {
    fontSize: 16,
    color: "grey",
  },
});

export default BoutiqueHeader;
