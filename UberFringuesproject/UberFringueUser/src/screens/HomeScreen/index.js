import React, { useContext, useState, useEffect } from "react";
import { StyleSheet, FlatList, View, TouchableOpacity, Text, Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import { API_URL } from "@env"; // Import de l'URL de l'API
import { AuthContext } from "../../context/AuthContext"; // Import du contexte Auth
import BoutiqueItem from "../../components/BoutiqueItem";

export default function HomeScreen() {
  const navigation = useNavigation();
  const { logout, setIsAuthenticated } = useContext(AuthContext); // Utilisation du contexte Auth pour la déconnexion
  const [boutiques, setBoutiques] = useState([]); // État pour stocker les boutiques
  const [loading, setLoading] = useState(true); // État pour gérer le chargement

  // Fonction pour récupérer les boutiques depuis le backend
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

  // Récupère les boutiques au chargement de l'écran
  useEffect(() => {
    fetchBoutiques();
  }, []);

  // Fonction de déconnexion
  const handleLogout = async () => {
    try {
      const token = await AsyncStorage.getItem("token");

      if (!token) {
        console.log("Pas de token trouvé. L'utilisateur est déjà déconnecté.");
        setIsAuthenticated(false); // Met à jour l'état global
        navigation.replace("Auth"); // Redirection vers l'écran Auth
        return;
      }

      // Si le token existe, on le supprime et on appelle le logout
      await axios.get(`${API_URL}/user/logout`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      await AsyncStorage.removeItem("token"); // Suppression du token
      setIsAuthenticated(false); // Mise à jour du contexte Auth
      navigation.replace("Auth"); // Redirection vers AuthScreen

    } catch (error) {
      console.error("Erreur lors de la déconnexion :", error);
      Alert.alert("Erreur", "Impossible de se déconnecter.");
    }
  };

  // Affiche un indicateur de chargement pendant la récupération des données
  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <Text>Chargement des boutiques...</Text>
      </View>
    );
  }

  return (
    <View style={styles.page}>
      {/* Bouton de déconnexion */}
      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutText}>Déconnexion</Text>
      </TouchableOpacity>

      {/* Liste des boutiques */}
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
  logoutButton: {
    backgroundColor: "red",
    padding: 10,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 10,
  },
  logoutText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});