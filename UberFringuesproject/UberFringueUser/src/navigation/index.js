import React, { useContext } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import { AuthContext } from "../context/AuthContext";
import AuthScreen from "../screens/AuthScreen";
import HomeScreen from "../screens/HomeScreen";
import BoutiqueDetailsScreen from "../screens/BoutiqueDetailsScreen";
import DressDetailsScreen from "../screens/DressDetailScreen";
import Basket from "../screens/Basket";
import OrderSummaryScreen from "../screens/OrderSummaryScreen";
import ProfilScreen from "../screens/ProfilScreen";
import OrderDetails from "../screens/OrderDetails";
import LoadingScreen from "../screens/LoadingScreen";
import { Foundation, FontAwesome5, MaterialIcons } from "@expo/vector-icons";

const Stack = createNativeStackNavigator();
const Tab = createMaterialBottomTabNavigator();

/**
 * ✅ RootNavigator - Gère la connexion et redirige l'utilisateur
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
 * ✅ Onglets de navigation principale
 */
const HomeTabs = () => {
  return (
    <Tab.Navigator
      barStyle={{ backgroundColor: "white" }}
      screenOptions={{ headerShown: false }}
    >
      <Tab.Screen
        name="HomeStack"
        component={HomeStackNavigator}
        options={{
          tabBarIcon: ({ color }) => <Foundation name="home" size={24} color={color} />,
          title: "Accueil",
        }}
      />
      <Tab.Screen
        name="OrdersStack"
        component={OrderStackNavigator}
        options={{
          tabBarIcon: ({ color }) => <MaterialIcons name="list-alt" size={24} color={color} />,
          title: "Commandes",
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfilScreen}
        options={{
          tabBarIcon: ({ color }) => <FontAwesome5 name="user-alt" size={24} color={color} />,
          title: "Profil",
        }}
      />
    </Tab.Navigator>
  );
};

/**
 * ✅ Stack de navigation pour Home
 */
const HomeStack = createNativeStackNavigator();
const HomeStackNavigator = () => {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen name="Home" component={HomeScreen} />
      <HomeStack.Screen name="BoutiqueDetails" component={BoutiqueDetailsScreen} />
      <HomeStack.Screen name="DressDetails" component={DressDetailsScreen} />
      <HomeStack.Screen name="Basket" component={Basket} />
      <HomeStack.Screen name="OrderSummary" component={OrderSummaryScreen} />
      <HomeStack.Screen name="LoadingScreen" component={LoadingScreen} options={{ headerShown: false }} /> 
    </HomeStack.Navigator>
  );
};
/**
 * ✅ Stack de navigation pour les commandes
 */
const OrdersStack = createNativeStackNavigator();
const OrderStackNavigator = () => {
  return (
    <OrdersStack.Navigator>
      <OrdersStack.Screen name="Orders" component={ProfilScreen} />
      <OrdersStack.Screen name="OrderDetails" component={OrderDetails} />
    </OrdersStack.Navigator>
  );
};

export default RootNavigator;