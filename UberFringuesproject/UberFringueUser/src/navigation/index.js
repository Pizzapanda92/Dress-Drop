import React, { useContext } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createMaterialBottomTabNavigator } from "react-native-paper/react-navigation";
import { NavigationContainer } from "@react-navigation/native";
import { AuthContext } from "../context/AuthContext"; // Contexte d'authentification
import AuthScreen from "../screens/AuthScreen";
import HomeScreen from "../screens/HomeScreen";
import BoutiqueDetailsScreen from "../screens/BoutiqueDetailsScreen"; // Assurez-vous que cet écran existe
import DishDetailsScreen from "../screens/DishDetailScreen";
import Basket from "../screens/Basket";
import OrdersScreen from "../screens/OrdersScreen";
import OrderDetails from "../screens/OrderDetails";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { View, TouchableOpacity, Text, Alert, StyleSheet } from "react-native";
import axios from "axios";
import { API_URL } from "@env";

// Importation des icônes
import { Foundation, FontAwesome5, MaterialIcons } from "@expo/vector-icons";

const Stack = createNativeStackNavigator();
const Tab = createMaterialBottomTabNavigator();

/**
 * 📌 RootNavigator : Gère la navigation principale (connexion ou écran principal)
 */
const RootNavigator = () => {
  const { isAuthenticated } = useContext(AuthContext);

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {isAuthenticated ? (
        <Stack.Screen name="HomeTabs" component={HomeTabs} />
      ) : (
        <Stack.Screen name="Auth" component={AuthScreen} />
      )}
    </Stack.Navigator>
  );
};

/**
 * 📌 HomeTabs : Barre de navigation avec plusieurs onglets
 */
const HomeTabs = () => {
  return (
    <Tab.Navigator barStyle={{ backgroundColor: "white" }}>
      <Tab.Screen
        name="Home"
        component={HomeStackNavigator}
        options={{
          tabBarIcon: ({ color }) => <Foundation name="home" size={24} color={color} />,
        }}
      />
      <Tab.Screen
        name="Orders"
        component={OrderStackNavigator}
        options={{
          tabBarIcon: ({ color }) => <MaterialIcons name="list-alt" size={24} color={color} />,
        }}
      />
      <Tab.Screen
        name="Profile"
        component={OrdersScreen}
        options={{
          tabBarIcon: ({ color }) => <FontAwesome5 name="user-alt" size={24} color={color} />,
        }}
      />
    </Tab.Navigator>
  );
};

/**
 * 📌 HomeStackNavigator : Gère la navigation des écrans liés à l'accueil
 */
const HomeStack = createNativeStackNavigator();
const HomeStackNavigator = () => {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen name="Home" component={HomeScreen} />
      <HomeStack.Screen name="BoutiqueDetails" component={BoutiqueDetailsScreen} />
      <HomeStack.Screen name="Dish" component={DishDetailsScreen} />
      <HomeStack.Screen name="Basket" component={Basket} />
    </HomeStack.Navigator>
  );
};

/**
 * 📌 OrderStackNavigator : Gère la navigation des commandes
 */
const OrdersStack = createNativeStackNavigator();
const OrderStackNavigator = () => {
  return (
    <OrdersStack.Navigator>
      <OrdersStack.Screen name="Orders" component={OrdersScreen} />
      <OrdersStack.Screen name="Order" component={OrderDetails} />
    </OrdersStack.Navigator>
  );
};

/**
 * 📌 HomeScreen avec bouton de déconnexion intégré
 */
const HomeScreenWithLogout = () => {
  const navigation = useNavigation();
  const { setIsAuthenticated } = useContext(AuthContext);

  const handleLogout = async () => {
    try {
      const token = await AsyncStorage.getItem("token");

      if (!token) {
        console.log("Pas de token trouvé. L'utilisateur est déjà déconnecté.");
        setIsAuthenticated(false);
        navigation.replace("Auth");
        return;
      }

      // Supprimer le token sur le serveur
      await axios.get(`${API_URL}/user/logout`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      await AsyncStorage.removeItem("token"); // Supprimer le token localement
      setIsAuthenticated(false);
      navigation.replace("Auth"); // Redirection vers l'authentification

    } catch (error) {
      console.error("Erreur lors de la déconnexion :", error);
      Alert.alert("Erreur", "Impossible de se déconnecter.");
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutText}>Déconnexion</Text>
      </TouchableOpacity>
      <HomeScreen />
    </View>
  );
};

const styles = StyleSheet.create({
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

export default RootNavigator;
