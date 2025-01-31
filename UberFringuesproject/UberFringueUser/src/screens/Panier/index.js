import { useState } from "react";
import { View, Text, StyleSheet, FlatList} from "react-native";
import boutiques from "../../../assets/data/boutiques.json";
import {AntDesign} from '@expo/vector-icons';

const boutique = boutiques[0];

const PanierDishItems = ({ PanierDish }) => {
  return (<View style={styles.row}>
    <View style={styles.quantityContainer}>
      <Text>1</Text>
    </View>
    <Text style={styles.Nom}>{PanierDish.name}</Text>
    <Text style={styles.prix}>{PanierDish.price} €</Text>
  </View>);
}

const Panier = () => {

    return (
    <View style={styles.page}>
      <Text style={styles.name}>{boutique.name}</Text>
      
      <Text style={styles.Panier}>Panier</Text>

      <FlatList 
        data={boutique.dishes}
        renderItem={({item}) => <PanierDishItems PanierDish={item}/>}
      />

      <View style={styles.separator} />
      
      <View style={styles.button}>
        <Text style={styles.buttonText}>Passer commande</Text>
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
  },
  name: {
    fontSize: 25,
    fontWeight: "600",
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
    marginTop: 35,
  },

  quantity: {
    fontSize: 31,
    marginHorizontal: 20,
  },

  button: {
    backgroundColor: "black",
    marginTop: "auto",
    padding: 20,
    alignItems: "center",
  },

  buttonText: {
    color: "white",
    fontWeight: "600", 
    fontSize: 18,
},
Panier: {
  fontSize: 19,
  fontWeight: "600",
  marginTop: 20, 
},

prix:{
  marginLeft: "auto",
},

quantityContainer:{
  backgroundColor: "lightgrey",
  paddingHorizontal: 5,
  paddingVertical: 2,
  marginRight: 10,
  borderRadius: 2,
},

Nom:{
  fontWeight: "600",
  letterSpacing: 0.5,
}

});

export default Panier;
