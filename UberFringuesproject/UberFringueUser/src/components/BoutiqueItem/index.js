import { StyleSheet, Text, View, Image, Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { API_URL } from "@env";

const BoutiqueItem = ({ boutique }) => {
  const navigation = useNavigation();

  // Vérifier si l'image commence par "http" et ajuster l'URL si nécessaire
  const fullImageUrl = boutique.image.startsWith("http")
    ? boutique.image
    : `${API_URL}${boutique.image}`;

  const onPress = () => {
    console.log("ID de la boutique sélectionnée :", boutique._id); // Utilisez _id si c'est le cas
    navigation.navigate("BoutiqueDetails", { id: boutique._id }); // Passez l'ID de la boutique
  };

  return (
    <Pressable onPress={onPress} style={styles.boutiqueContainer}>
      <Image source={{ uri: fullImageUrl }} style={styles.image} />
      <View style={styles.row}>
        <View>
          <Text style={styles.title}>{boutique.name}</Text>
          <Text style={styles.subtitle}>
            $ {boutique.deliveryFee} &#8226; {boutique.minDeliveryTime}-
            {boutique.maxDeliveryTime} minutes
          </Text>
        </View>
        <View style={styles.rating}>
          <Text>{boutique.rating}</Text>
        </View>
      </View>
    </Pressable>
  );
};

export default BoutiqueItem;

const styles = StyleSheet.create({
  boutiqueContainer: {
    width: "100%",
    marginVertical: 10,
  },
  image: {
    width: "100%",
    aspectRatio: 5 / 3,
    marginBottom: 5,
  },
  title: {
    fontSize: 16,
    fontWeight: "500",
    marginVertical: 5,
  },
  subtitle: {
    color: "grey",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
  rating: {
    marginLeft: "auto",
    backgroundColor: "lightgray",
    width: 30,
    height: 30,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 20,
  },
});