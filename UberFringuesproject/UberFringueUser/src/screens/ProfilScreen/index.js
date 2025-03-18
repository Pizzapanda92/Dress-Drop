import React, { useContext, useEffect, useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, FlatList, ActivityIndicator, Alert, Image } from "react-native";
import { AuthContext } from "../../context/AuthContext";
import { useNavigation } from "@react-navigation/native";
import { FontAwesome, MaterialIcons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { API_URL } from "@env";

const ProfileScreen = () => {
  const { logout, user } = useContext(AuthContext);
  const navigation = useNavigation();
  const [userInfo, setUserInfo] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        if (!user?._id) return;
        const token = await AsyncStorage.getItem("token");
        const response = await axios.get(`${API_URL}/user/${user._id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        console.log("Données utilisateur reçues sur le profil :", response.data);
        setUserInfo(response.data);
      } catch (error) {
        console.error("Erreur lors de la récupération du profil :", error.response?.data || error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUserInfo();
  }, [user]);

  const handleLogout = async () => {
    Alert.alert(
      "Déconnexion",
      "Voulez-vous vraiment vous déconnecter ?",
      [
        { text: "Annuler", style: "cancel" },
        {
          text: "Déconnexion",
          onPress: async () => {
            try {
              await axios.post(`${API_URL}/user/logout`);
            } catch (error) {
              console.error("Erreur lors de la déconnexion :", error.response?.data || error.message);
            }
            
            await AsyncStorage.removeItem("token");
            logout();
            navigation.replace("Auth");
          },
        },
      ]
    );
  };

  if (loading) {
    return <ActivityIndicator size="large" color="#DAA520" style={styles.loader} />;
  }

  return (
    <View style={styles.container}>
      {/* Profile Header */}
      <View style={styles.profileCard}>
        <Image source={{ uri: userInfo?.picture || "https://via.placeholder.com/150" }} style={styles.avatar} />
        <Text style={styles.userName}>{userInfo?.pseudo ?? "Chargement..."}</Text>
        <Text style={styles.userEmail}>{userInfo?.email}</Text>
      </View>

      {/* Action Buttons */}
      <View style={styles.actionButtons}>
        <TouchableOpacity style={styles.actionButton}>
          <MaterialIcons name="support-agent" size={24} color="#fff" />
          <Text style={styles.actionText}>Support</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton}>
          <MaterialIcons name="account-balance-wallet" size={24} color="#fff" />
          <Text style={styles.actionText}>Portefeuille</Text>
        </TouchableOpacity>
      </View>

      {/* Menu List */}
      <FlatList
        data={[
          { title: "Modifier mon profil", icon: "person" },
          { title: "Paramètres", icon: "settings" },
          { title: "Mentions légales", icon: "gavel" },
          { title: "Déconnexion", icon: "logout", action: handleLogout },
        ]}
        keyExtractor={(item) => item.title}
        renderItem={({ item }) => (
          <TouchableOpacity
          style={styles.menuItem}
          onPress={item.title === "Modifier mon profil" ? () => navigation.navigate("EditProfile") : item.action || (() => {})}
        >
            <MaterialIcons name={item.icon} size={24} color="#DAA520" />
            <Text style={styles.menuText}>{item.title}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f8f8f8", padding: 20 },
  profileCard: {
    backgroundColor: "#fff",
    borderRadius: 15,
    padding: 20,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
    marginBottom: 20,
  },
  avatar: { width: 100, height: 100, borderRadius: 50, borderWidth: 2, borderColor: "#DAA520", marginBottom: 10 },
  userName: { fontSize: 22, fontWeight: "bold", color: "#333" },
  userEmail: { fontSize: 14, color: "#666" },
  actionButtons: { flexDirection: "row", justifyContent: "space-around", marginBottom: 20 },
  actionButton: {
    backgroundColor: "#DAA520",
    padding: 12,
    borderRadius: 12,
    alignItems: "center",
    width: "45%",
    flexDirection: "row",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
  actionText: { color: "#fff", fontSize: 14, fontWeight: "bold", marginLeft: 8 },
  menuItem: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 15,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  menuText: { marginLeft: 15, fontSize: 16, color: "#333", fontWeight: "500" },
  loader: { flex: 1, justifyContent: "center", alignItems: "center" },
});

export default ProfileScreen;

