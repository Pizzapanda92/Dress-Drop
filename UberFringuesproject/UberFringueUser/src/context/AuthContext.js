import React, { createContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { API_URL } from "@env";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      const token = await AsyncStorage.getItem("token");
      const userId = await AsyncStorage.getItem("userId");

      console.log("Vérification du token et userId");
      console.log("Token récupéré :", token);
      console.log("UserID récupéré :", userId);

      if (token && userId) {
        setIsAuthenticated(true);
        fetchUserData(userId);
      } else {
        setIsAuthenticated(false);
        setUser(null);
      }

      setLoading(false);
    };

    checkAuth();
  }, []);

  const fetchUserData = async (userId) => {
    try {
      console.log(`Récupération des infos de l'utilisateur : ${userId}`);

      const response = await axios.get(`${API_URL}/user/${userId}`);

      console.log("Données utilisateur reçues :", response.data);
      setUser(response.data);
    } catch (error) {
      console.error("Erreur lors de la récupération des infos utilisateur :", error);
    }
  };

  const login = async (token, userId) => {
    try {
      console.log("🔹 Stockage du token et UserID...");
      await AsyncStorage.setItem("token", token);
      await AsyncStorage.setItem("userId", userId);

      setIsAuthenticated(true);
      setUser({ _id: userId });

      console.log("Connexion réussie !");

      const storedToken = await AsyncStorage.getItem("token");
      const storedUserId = await AsyncStorage.getItem("userId");

      console.log("Token stocké :", storedToken);
      console.log("UserID stocké :", storedUserId);

    } catch (error) {
      console.error("Erreur lors de la connexion :", error);
    }
  };

  const logout = async () => {
    try {
      console.log("Déconnexion en cours...");
      await AsyncStorage.removeItem("token");
      await AsyncStorage.removeItem("userId");

      setIsAuthenticated(false);
      setUser(null);

      console.log("Déconnexion réussie !");
    } catch (error) {
      console.error("Erreur lors de la déconnexion :", error);
    }
  };

  return (
    <AuthContext.Provider value={{ user, setUser, isAuthenticated, setIsAuthenticated, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
