import React, { createContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      const token = await AsyncStorage.getItem("token");
      setIsAuthenticated(!!token); // Définit l'état d'authentification
      setLoading(false); // Fin de la vérification
    };

    checkAuth();
  }, []);

  const logout = async () => {
    try {
      await AsyncStorage.removeItem("token"); // Suppression du token
      setIsAuthenticated(false); // Mise à jour immédiate de l'état
    } catch (error) {
      console.error("Erreur lors de la déconnexion :", error);
    }
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
