import React, { useContext } from "react";
import { StyleSheet, FlatList, View, TouchableOpacity, Text, Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import { API_URL } from "@env";
import { AuthContext } from "../../context/AuthContext"; // Import du contexte Auth

import BoutiqueItem from "../../components/BoutiqueItem";
import boutiques from "../../../assets/data/boutiques.json";

export default function HomeScreen() {
  const navigation = useNavigation();
  const { logout, setIsAuthenticated } = useContext(AuthContext); // Utilisation du contexte Auth pour la déconnexion

  // Fonction de déconnexion
  const handleLogout = async () => {
    try {
      const token = await AsyncStorage.getItem("token");

      if (!token) {
        console.log("Pas de token trouvé. L'utilisateur est déjà déconnecté.");
        setIsAuthenticated(false); // Mettez l'état d'authentification à false
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

  return (
    <View style={styles.page}>
      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutText}>Déconnexion</Text>
      </TouchableOpacity>

      <FlatList
        data={boutiques}
        renderItem={({ item }) => <BoutiqueItem boutique={item} />}
        keyExtractor={(item, index) => item.id?.toString() || index.toString()}
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
});
