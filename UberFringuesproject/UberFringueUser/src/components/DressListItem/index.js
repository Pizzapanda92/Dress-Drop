import React from "react";
import { View, Text, Image, StyleSheet, Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { API_URL } from "@env";

const DressListItem = ({ Dress }) => {
  const navigation = useNavigation();

  const imageUrl = Dress.images?.length > 0
    ? `${API_URL}${Dress.images[0]}`
    : "https://via.placeholder.com/150";

  return (
<Pressable
  onPress={() => {
    console.log("NAVIGATION VERS DressDetails :", Dress._id);
    navigation.navigate("DressDetails", { id: Dress._id });
  }}
  style={styles.container}
>

      <View style={{ flex: 1 }}>
        <Text style={styles.name}>{Dress.name}</Text>
        <Text style={styles.description} numberOfLines={2}>
          {Dress.description}
        </Text>
        <Text style={styles.price}>$ {Dress.price}</Text>
      </View>
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
