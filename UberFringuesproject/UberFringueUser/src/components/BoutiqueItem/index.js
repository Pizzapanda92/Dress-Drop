import { StyleSheet, Text, View, Image, Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";

const BoutiqueItem = ({ boutique }) => {
  const navigation = useNavigation();

  const onPress = () => {
    navigation.navigate("Boutique", { id: boutique.id }); 
  };

  return (
    <Pressable onPress={onPress} style={styles.boutiqueContainer}>
      <Image source={{ uri: boutique.image }} style={styles.image} />
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
