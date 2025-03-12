import React, { useEffect, useState } from "react"; 
import { View, FlatList, Text, StyleSheet, ActivityIndicator } from "react-native";
import axios from "axios";
import { API_URL } from "@env";
import DressListItem from "../../components/DressListItem"; 
import BoutiqueHeader from "./Header"; 
import { useRoute } from "@react-navigation/native";

const BoutiqueDetailsScreen = () => {
  const route = useRoute();
  const boutiqueId = route.params?.id;

  const [boutique, setBoutique] = useState(null);
  const [clothes, setClothes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!boutiqueId) {
      setError("Aucun ID de boutique reçu.");
      setLoading(false);
      return;
    }

    const fetchDetails = async () => {
      try {
        console.log("Requête envoyée à :", `${API_URL}/shops/${boutiqueId}`);

        const boutiqueResponse = await axios.get(`${API_URL}/shops/${boutiqueId}`);
        setBoutique(boutiqueResponse.data);

        const clothesResponse = await axios.get(`${API_URL}/clothes/${boutiqueId}`);
        setClothes(clothesResponse.data);
      } catch (error) {
        console.error("Erreur API :", error.response?.data || error.message);
        setError("Erreur lors du chargement des données.");
      } finally {
        setLoading(false);
      }
    };

    fetchDetails();
  }, [boutiqueId]);

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (error) {
    return <Text style={styles.errorText}>{error}</Text>;
  }

  return (
    <View style={styles.page}>
<FlatList
  ListHeaderComponent={() => <BoutiqueHeader boutique={boutique} />}
  data={clothes}
  renderItem={({ item }) => <DressListItem dish={item} />}
  keyExtractor={(item) => item._id.toString()}
/>

    </View>
  );
};

const styles = StyleSheet.create({
  page: { flex: 1, backgroundColor: "#fff" },
  centered: { flex: 1, justifyContent: "center", alignItems: "center" },
  errorText: { color: "red", textAlign: "center", fontSize: 18 },
});

export default BoutiqueDetailsScreen;
