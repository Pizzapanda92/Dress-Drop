import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { API_URL } from "@env";

// Instance Axios avec une configuration de base
const api = axios.create({
  baseURL: API_URL, // Utilise la variable d'environnement pour l'URL de l'API
  headers: { "Content-Type": "application/json" },
});

// 🔐 Intercepteur pour ajouter le Token automatiquement
api.interceptors.request.use(
  async (config) => {
    const token = await AsyncStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Fonction pour se connecter et stocker le token
export const signIn = async (email, password) => {
  try {
    const response = await api.post("/user/login", { email, password });

    if (response.data.token) {
      await AsyncStorage.setItem("token", response.data.token); // Sauvegarde du token
    }

    return response.data;
  } catch (error) {
    console.error("Erreur lors de la connexion:", error);
    throw error;
  }
};

// Fonction pour récupérer les boutiques
export const fetchBoutiques = async () => {
  try {
    const response = await api.get("/shops");
    return response.data;
  } catch (error) {
    console.error("Erreur lors de la récupération des boutiques :", error);
    throw error;
  }
};

// Fonction pour récupérer les commandes
export const getOrders = async () => {
  try {
    const response = await api.get("/order/orderID");
    return response.data;
  } catch (error) {
    console.error("Erreur lors de la récupération des commandes:", error);
    throw error;
  }
};

export default api;


