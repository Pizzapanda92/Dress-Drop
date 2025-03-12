import React, { useState, useContext } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert, ScrollView } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { API_URL } from "@env";
import { AuthContext } from "../../context/AuthContext";

const AuthScreen = ({ navigation }) => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [pseudo, setPseudo] = useState("");
  const [role, setRole] = useState("buyer");
  const [street, setStreet] = useState("");
  const [city, setCity] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [country, setCountry] = useState("");

  const { login } = useContext(AuthContext);

  const handleAuth = async () => {
    try {
      const payload = isSignUp
        ? { pseudo, email, password, role, address: { street, city, postalCode, country } }
        : { email, password };

      console.log("🔍 Données envoyées :", payload);

      const url = isSignUp ? `${API_URL}/user/register` : `${API_URL}/user/login`;
      const response = await axios.post(url, payload);

      console.log("🔹 Réponse API :", response.data);

      if (!isSignUp && response.data.token && response.data.userId) {
        console.log("Connexion réussie !");
        await AsyncStorage.setItem("token", response.data.token);
        await AsyncStorage.setItem("userId", response.data.userId);
        login(response.data.token, response.data.userId);
        navigation.replace("Home");
      } else {
        Alert.alert("Erreur", "Aucun token ou ID utilisateur reçu. Vérifiez votre backend.");
      }
    } catch (error) {
      console.error("Erreur d'authentification :", error.response?.data || error.message);
      Alert.alert("Erreur", error.response?.data?.message || "Une erreur est survenue.");
    }
  };

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1, padding: 20, justifyContent: "center" }}>
      <Text style={{ fontSize: 24, fontWeight: "bold", textAlign: "center", marginBottom: 20 }}>
        {isSignUp ? "Créer un compte" : "Se connecter"}
      </Text>

      {isSignUp && (
        <>
          <TextInput placeholder="Pseudo" value={pseudo} onChangeText={setPseudo} style={styles.input} />
          <TextInput placeholder="Rôle (buyer, seller, delivery)" value={role} onChangeText={setRole} style={styles.input} />
          <TextInput placeholder="Rue" value={street} onChangeText={setStreet} style={styles.input} />
          <TextInput placeholder="Ville" value={city} onChangeText={setCity} style={styles.input} />
          <TextInput placeholder="Code Postal" value={postalCode} onChangeText={setPostalCode} keyboardType="numeric" style={styles.input} />
          <TextInput placeholder="Pays" value={country} onChangeText={setCountry} style={styles.input} />
        </>
      )}

      <TextInput placeholder="Email" value={email} onChangeText={setEmail} keyboardType="email-address" style={styles.input} />
      <TextInput placeholder="Mot de passe" value={password} onChangeText={setPassword} secureTextEntry style={styles.input} />

      <TouchableOpacity onPress={handleAuth} style={styles.button}>
        <Text style={{ color: "#fff", fontSize: 18 }}>{isSignUp ? "S'inscrire" : "Se connecter"}</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => setIsSignUp(!isSignUp)}>
        <Text style={{ color: "blue", textAlign: "center", marginTop: 10 }}>
          {isSignUp ? "Déjà un compte ? Se connecter" : "Pas encore inscrit ? Créer un compte"}
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = {
  input: {
    height: 50,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  button: {
    backgroundColor: "blue",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
  },
};

export default AuthScreen;