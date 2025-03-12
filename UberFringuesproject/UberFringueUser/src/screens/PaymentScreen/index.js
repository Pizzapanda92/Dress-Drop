import React, { useState } from "react";
import { View, Text, Pressable, Alert, StyleSheet, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useStripe, CardField } from "@stripe/stripe-react-native";
import axios from "axios";
import { API_URL } from "@env";
import AsyncStorage from "@react-native-async-storage/async-storage";

const SaveCardScreen = () => {
  const { createPaymentMethod } = useStripe();
  const navigation = useNavigation();
  const [cardDetails, setCardDetails] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSaveCard = async () => {
    console.log("Bouton cliqué !");
    if (!cardDetails?.complete) {
      console.log("Carte incomplète. Détails :", cardDetails);
      Alert.alert("Erreur", "Veuillez remplir tous les champs de la carte.");
      return;
    }

    setLoading(true);
    console.log("Chargement activé.");

    try {
      console.log("Création du PaymentMethod...");
      const { paymentMethod, error } = await createPaymentMethod({
        type: "Card",
        card: cardDetails,
      });

      if (error) {
        console.error("Erreur Stripe:", error);
        throw new Error(error.message);
      }

      console.log("PaymentMethod créé :", paymentMethod);

      console.log("Envoi de la requête à l'API backend...");
      const response = await axios.post(`${API_URL}/payment/save-card`, {
        paymentMethodId: paymentMethod.id,
      });

      console.log("Réponse de l'API backend :", response.data);

      if (response.data.success) {
        console.log("Carte enregistrée avec succès.");
        await AsyncStorage.setItem("paymentMethodId", paymentMethod.id);
        Alert.alert("Succès", "Carte enregistrée avec succès !");
        navigation.navigate("Basket");
        console.log("Navigation vers Basket réussie.");
      } else {
        throw new Error("Erreur d'enregistrement.");
      }
    } catch (error) {
      console.error("Erreur dans handleSaveCard:", error);
      Alert.alert("Erreur", error.message || "Impossible d'enregistrer la carte.");
    } finally {
      console.log("Chargement désactivé.");
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Ajouter une carte</Text>
      <CardField
        postalCodeEnabled={false}
        placeholders={{ number: "4242 4242 4242 4242", expiration: "MM/YY", cvc: "CVC" }}
        cardStyle={styles.card}
        style={styles.cardContainer}
        onCardChange={(details) => {
          console.log("Détails de la carte :", details);
          setCardDetails(details);
        }}
      />
      <TouchableOpacity
        style={[styles.saveButton, (loading || !cardDetails?.complete) && styles.disabledButton]}
        onPress={handleSaveCard}
        disabled={loading || !cardDetails?.complete}
      >
        <Text style={styles.saveButtonText}>{loading ? "Enregistrement..." : "Enregistrer la carte"}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", padding: 20, backgroundColor: "#fff" },
  title: { fontSize: 22, fontWeight: "bold", textAlign: "center", marginBottom: 20 },
  card: {
    backgroundColor: "#FFFFFF",
    textColor: "#000000",
    borderColor: "#000000",
    borderWidth: 1,
    borderRadius: 5,
    fontSize: 16,
    placeholderColor: "#999999",
  },
  cardContainer: { height: 50, marginVertical: 20 },
  saveButton: {
    backgroundColor: "#4CAF50",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    width: "100%",
    marginTop: 20,
  },
  disabledButton: {
    backgroundColor: "#A5D6A7", // Couleur différente pour le bouton désactivé
  },
  saveButtonText: { color: "#fff", fontSize: 18, fontWeight: "bold" },
});

export default SaveCardScreen;