import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { API_URL } from "@env";

const API_URL = "http://10.0.2.2:5000/api"; // Mets l'IP de ton backend

// Instance Axios avec une configuration de base
const api = axios.create({
  baseURL: API_URL,
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

// Fonction pour récupérer les commandes
export const getOrders = async () => {
    try {
      const response = await api.get(`${API_URL}/order/orderID`);
      return response.data;
    } catch (error) {
      console.error("Erreur lors de la récupération des commandes:", error);
      throw error;
    }
  };
// Fonction pour se connecter et stocker le token
import AsyncStorage from "@react-native-async-storage/async-storage"; // Pour stocker le token

export const signIn = async (email, password) => {
  try {
    const response = await api.post(`${API_URL}/user/login`, { email, password });

    if (response.data.token) {
      await AsyncStorage.setItem("token", response.data.token); // Sauvegarde du token
    }

    return response.data;
  } catch (error) {
    console.error("Erreur lors de la connexion:", error);
    throw error;
  }
}
