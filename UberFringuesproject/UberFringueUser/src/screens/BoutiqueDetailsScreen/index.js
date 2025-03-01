import React, { useEffect, useState } from "react";
import { View, FlatList, Text, StyleSheet, ActivityIndicator } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import axios from "axios";
import DishListItem from "../../components/DishListItem"; // Assurez-vous que ce composant existe
import Header from "./Header"; // Assurez-vous que ce composant existe
import { useRoute, useNavigation } from "@react-navigation/native";
import { API_URL } from "@env";  // Assurez-vous que l'URL de l'API est bien définie

const BoutiqueDetailsScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();
  
  // ✅ Récupérer l'ID de la boutique depuis les paramètres de navigation
  const boutiqueId = route.params?.id;
  console.log("ID de la boutique reçu :", boutiqueId); // Log pour vérifier

  const [clothes, setClothes] = useState([]); // Liste des vêtements
  const [loading, setLoading] = useState(true); // Gérer l'état de chargement
  const [error, setError] = useState(""); // Gérer les erreurs

  // Effet qui sera déclenché lorsque le composant est monté ou si boutiqueId change
  useEffect(() => {
    if (!boutiqueId) {
      setError("Aucun ID de boutique reçu.");
      setLoading(false);
      return;
    }

    const fetchClothes = async () => {
      try {
        console.log("📡 Requête envoyée à :", `${API_URL}/clothes/${boutiqueId}`);

        const response = await axios.get(`${API_URL}/clothes/${boutiqueId}`);
        if (response.status === 200 && Array.isArray(response.data)) {
          setClothes(response.data); // On met à jour la liste des vêtements
        } else {
          setError("Aucun article trouvé pour cette boutique.");
        }
      } catch (error) {
        console.error("❌ Erreur API :", error.response?.data || error.message);
        setError("Erreur lors de la récupération des articles.");
      } finally {
        setLoading(false);
      }
    };

    fetchClothes();
  }, [boutiqueId]); // L'effet dépend de boutiqueId

  // Si le chargement est en cours, on affiche un indicateur de chargement
  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  // Si une erreur est survenue, on l'affiche
  if (error) {
    return <Text style={styles.errorText}>{error}</Text>;
  }

  return (
    <View style={styles.page}>
      {/* En-tête de la boutique */}
      <FlatList
        ListHeaderComponent={() => <Header boutiqueId={boutiqueId} />}
        data={clothes} // Liste des articles
        renderItem={({ item }) => (
          <DishListItem dish={item} /> // Assurez-vous que ce composant affiche un article correctement
        )}
        keyExtractor={(item) => item._id.toString()} // Assurez-vous que l'ID est unique
      />
      {/* Icône de retour */}
      <Ionicons
        onPress={() => navigation.goBack()}
        name="arrow-back-circle"
        size={45}
        color="white"
        style={styles.iconContainer}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  page: { flex: 1, backgroundColor: "#fff" },
  centered: { flex: 1, justifyContent: "center", alignItems: "center" },
  errorText: { color: "red", textAlign: "center", fontSize: 18 },
  iconContainer: { position: "absolute", top: 40, left: 20, zIndex: 10 },
});

export default BoutiqueDetailsScreen;
