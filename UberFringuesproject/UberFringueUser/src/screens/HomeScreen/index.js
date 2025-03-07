import React, { useContext, useState, useEffect } from "react";
import { StyleSheet, FlatList, View, Text, Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import { API_URL } from "@env"; // Import de l'URL de l'API
import BoutiqueItem from "../../components/BoutiqueItem";

export default function HomeScreen() {
  const navigation = useNavigation();
  const [boutiques, setBoutiques] = useState([]); // État pour stocker les boutiques
  const [loading, setLoading] = useState(true); // État pour gérer le chargement

  // ✅ Fonction pour récupérer les boutiques depuis le backend
  const fetchBoutiques = async () => {
    try {
      const token = await AsyncStorage.getItem("token");
      const response = await axios.get(`${API_URL}/shops`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setBoutiques(response.data); // Met à jour l'état avec les boutiques récupérées
    } catch (error) {
      console.error("Erreur lors de la récupération des boutiques :", error);
      Alert.alert("Erreur", "Impossible de charger les boutiques.");
    } finally {
      setLoading(false); // Arrête le chargement
    }
  };

  // ✅ Récupère les boutiques au chargement de l'écran
  useEffect(() => {
    fetchBoutiques();
  }, []);

  // ✅ Affiche un indicateur de chargement pendant la récupération des données
  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <Text>Chargement des boutiques...</Text>
      </View>
    );
  }

  return (
    <View style={styles.page}>
      {/* ✅ Liste des boutiques */}
      <FlatList
        data={boutiques}
        renderItem={({ item }) => <BoutiqueItem boutique={item} />}
        keyExtractor={(item, index) => item._id?.toString() || index.toString()}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  page: {
    padding: 10,
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

