import React, { useState, useEffect } from "react";
import { View, Text } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AuthProvider } from "./src/context/AuthContext";
import { CartProvider } from "./src/context/CartContext";
import { NavigationContainer } from "@react-navigation/native";
import { StripeProvider } from "@stripe/stripe-react-native";
import RootNavigator from "./src/navigation/index";

const App = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      await AsyncStorage.getItem("token");
      setLoading(false);
    };
    checkAuth();
  }, []);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Chargement...</Text>
      </View>
    );
  }

  return (
    <AuthProvider>
      <CartProvider>
        <NavigationContainer>
          <StripeProvider>
            <RootNavigator />
          </StripeProvider>
        </NavigationContainer>
      </CartProvider>
    </AuthProvider>
  );
};

export default App;

