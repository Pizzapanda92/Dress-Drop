import { useState } from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import boutique from "../../../assets/data/boutiques.json";
import {AntDesign} from '@expo/vector-icons';

const dish = boutique[0].dishes[0]; // Récupère le premier plat du premier magasin
const DishDetailsScreen = () => {
    const [quantity, setQuantity]  = useState(2);

    const onMinus = () =>{
        if (quantity > 1) {
            setQuantity(quantity - 1);
        }
    };

    const onPlus = () => {
        setQuantity(quantity + 1);
    };

  return (
    <View style={styles.page}>
      <Image 
        source={{ uri: dish.image }} 
        style={styles.image} 
      />
      <Text style={styles.name}>{dish.name}</Text>
      <Text style={styles.description}>{dish.description}</Text>
      <View style={styles.separator} />
    

        <View style={styles.row}>
            <AntDesign 
            name="minuscircleo" 
            size={60} 
            color={"black"} 
            onPress={onMinus} 
            />
            
            <Text style={styles.quantity}>{quantity}</Text>

            <AntDesign 
            name="pluscircleo" 
            size={60} 
            color={"black"} 
            onPress={onPlus} 
            />
        </View>
    </View>
  );
};

const styles = StyleSheet.create({
  page: {
    flex: 1,
    width: "100%",
    paddingVertical: 40,
    padding: 10,
    backgroundColor: "#fff",
  },
  image: {
    width: "100%",
    aspectRatio: 5 / 3,
    borderRadius: 10,
  },
  name: {
    fontSize: 24,
    fontWeight: "bold",
    marginVertical: 10,
  },
  description: {
    fontSize: 16,
    color: "gray",
    marginVertical: 5,
  },
  separator: {
    height: 1,
    backgroundColor: "lightgrey",
    marginVertical: 10,
  },

  row:{
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 50,
  },

  quantity: {
    fontSize: 31,
    marginHorizontal: 20,
  }
});

export default DishDetailsScreen;
