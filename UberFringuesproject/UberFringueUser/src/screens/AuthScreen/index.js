import React, { useState, useContext } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { API_URL } from "@env";
import { AuthContext } from "../../context/AuthContext"; // Import du contexte

const AuthScreen = ({ navigation }) => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [pseudo, setPseudo] = useState("");
  const [role, setRole] = useState("buyer");

  const { setIsAuthenticated } = useContext(AuthContext); // Utilisation correcte du contexte

  const handleAuth = async () => {
    try {
      const url = isSignUp ? `${API_URL}/user/register` : `${API_URL}/user/login`;
      const payload = isSignUp ? { pseudo, email, password, role } : { email, password };

      const response = await axios.post(url, payload);

      if (isSignUp) {
        Alert.alert("Succès", "Inscription réussie, connectez-vous !");
        setIsSignUp(false);
      } else {
        if (response.data.token) {
          await AsyncStorage.setItem("token", response.data.token);
          setIsAuthenticated(true); // ✅ Met à jour l'état d'authentification via le contexte
          navigation.replace("Home");
        } else {
          Alert.alert("Erreur", "Aucun token reçu. Vérifiez votre backend.");
        }
      }
    } catch (error) {
      Alert.alert("Erreur", error.response?.data?.message || "Une erreur est survenue.");
    }
  };

  return (
    <View style={{ flex: 1, padding: 20, justifyContent: "center" }}>
      <Text style={{ fontSize: 24, fontWeight: "bold", textAlign: "center", marginBottom: 20 }}>
        {isSignUp ? "Créer un compte" : "Se connecter"}
      </Text>

      {isSignUp && (
        <>
          <TextInput placeholder="Pseudo" value={pseudo} onChangeText={setPseudo} style={styles.input} />
          <TextInput placeholder="Rôle (buyer, seller, delivery)" value={role} onChangeText={setRole} style={styles.input} />
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
    </View>
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
