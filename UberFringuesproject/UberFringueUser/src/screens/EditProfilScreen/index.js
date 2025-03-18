import React, { useContext, useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from "react-native";
import { AuthContext } from "../../context/AuthContext";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import { API_URL } from "@env";

const EditProfileScreen = () => {
  const { user, setUser } = useContext(AuthContext);
  const navigation = useNavigation();

  // Vérifie si user a une adresse, sinon initialise les champs vides
  const [pseudo, setPseudo] = useState(user?.pseudo || "");
  const [street, setStreet] = useState(user?.address?.street || "");
  const [city, setCity] = useState(user?.address?.city || "");
  const [postalCode, setPostalCode] = useState(user?.address?.postalCode || "");
  const [country, setCountry] = useState(user?.address?.country || "France"); // Pays par défaut

  const [loading, setLoading] = useState(false);

  const handleSave = async () => {
    if (!pseudo && !street && !city && !postalCode && !country) {
      Alert.alert("Erreur", "Veuillez entrer au moins une information à modifier.");
      return;
    }

    setLoading(true);

    try {
      // Création de l'objet `address`
      const updatedAddress = {
        street: street.trim(),
        city: city.trim(),
        postalCode: postalCode.trim(),
        country: country.trim(),
      };

      // Requête de mise à jour
      const response = await axios.put(`${API_URL}/user/${user._id}`, {
        pseudo: pseudo || undefined,
        address: updatedAddress || undefined,
      });

      // Mise à jour du contexte utilisateur
      setUser((prevUser) => ({
        ...prevUser,
        pseudo: response.data.pseudo,
        address: response.data.address,
      }));

      Alert.alert("Succès", "Votre profil a été mis à jour !");
      navigation.goBack();
    } catch (error) {
      console.error("Erreur lors de la mise à jour :", error.response?.data || error.message);
      Alert.alert("Erreur", error.response?.data?.message || "Une erreur est survenue lors de la mise à jour.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Pseudo</Text>
      <TextInput
        style={styles.input}
        value={pseudo}
        onChangeText={setPseudo}
        placeholder="Entrez votre pseudo"
      />

      <Text style={styles.label}>Rue</Text>
      <TextInput
        style={styles.input}
        value={street}
        onChangeText={setStreet}
        placeholder="Ex: 10 rue de Paris"
      />

      <Text style={styles.label}>Ville</Text>
      <TextInput
        style={styles.input}
        value={city}
        onChangeText={setCity}
        placeholder="Ex: Lyon"
      />

      <Text style={styles.label}>Code Postal</Text>
      <TextInput
        style={styles.input}
        value={postalCode}
        onChangeText={setPostalCode}
        placeholder="Ex: 69000"
        keyboardType="numeric"
      />

      <Text style={styles.label}>Pays</Text>
      <TextInput
        style={styles.input}
        value={country}
        onChangeText={setCountry}
        placeholder="Ex: France"
      />

      <TouchableOpacity style={styles.saveButton} onPress={handleSave} disabled={loading}>
        <Text style={styles.saveButtonText}>{loading ? "Enregistrement..." : "Sauvegarder"}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#fff" },
  label: { fontSize: 16, fontWeight: "bold", marginTop: 20, color: "#333" },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    padding: 10,
    marginTop: 5,
    fontSize: 16,
  },
  saveButton: {
    backgroundColor: "#DAA520",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 30,
  },
  saveButtonText: { color: "#fff", fontSize: 16, fontWeight: "bold" },
});

export default EditProfileScreen;

