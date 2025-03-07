import React, { useContext } from "react";
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Alert } from "react-native";
import { AuthContext } from "../../context/AuthContext"; // Import du contexte Auth
import OrderListItem from "../../components/OrderListItem"; // Si tu veux afficher les commandes
import AsyncStorage from "@react-native-async-storage/async-storage";

const ProfilScreen = ({ navigation }) => {
  const { logout } = useContext(AuthContext);

  // ✅ Fonction pour gérer la déconnexion
  const handleLogout = async () => {
    Alert.alert(
      "Déconnexion",
      "Voulez-vous vraiment vous déconnecter ?",
      [
        { text: "Annuler", style: "cancel" },
        { text: "Déconnexion", onPress: async () => {
            await AsyncStorage.removeItem("token"); // Supprime le token
            logout(); // Déconnecte l'utilisateur
            navigation.replace("Auth"); // Redirige vers l'écran de connexion
          }
        }
      ]
    );
  };

  return (
    <View style={styles.page}>
      {/* ✅ Bouton de déconnexion */}
      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutText}>Déconnexion</Text>
      </TouchableOpacity>

      {/* ✅ Ajout d'une liste de commandes si nécessaire */}
      <FlatList
        data={[]} // Remplace par tes données de commandes
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <OrderListItem order={item} />}
        ListEmptyComponent={<Text style={styles.emptyText}>Aucune commande trouvée</Text>}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  page: { flex: 1, padding: 50, backgroundColor: "#fff" },
  logoutButton: { backgroundColor: "red", padding: 15, borderRadius: 50, alignItems: "center", marginBottom: 10, bottom:0, },
  logoutText: { color: "#fff", fontSize: 16, fontWeight: "bold" },
  emptyText: { textAlign: "center", color: "gray", marginTop: 20 },
});

export default ProfilScreen;
