import { createContext, useState, useEffect, useContext } from "react";
import axios from "axios";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem("token");
      const userId = localStorage.getItem("userId");

      console.log("🔍 Vérification token & userId...");
      if (token && userId) {
        setIsAuthenticated(true);
        await fetchUserData(userId);
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
      const res = await axios.get(`http://localhost:5000/user/${userId}`);
      const userData = res.data;
      
      setUser(userData);
      localStorage.setItem("role", userData.role); // ✅ indispensable pour ProtectedRoute
      console.log("✅ Données utilisateur chargées :", userData);
    } catch (error) {
      console.error("❌ Erreur récupération des données utilisateur :", error);
    }
  };

  const login = async (token, userId) => {
    localStorage.setItem("token", token);
    localStorage.setItem("userId", userId);

    setIsAuthenticated(true);
    setUser({ _id: userId });

    await fetchUserData(userId);
    console.log("✅ Connexion réussie");
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    localStorage.removeItem("role");

    setIsAuthenticated(false);
    setUser(null);
    console.log("👋 Déconnecté");
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    console.warn("⚠️ useAuth est utilisé en dehors d'un AuthProvider");
    return {
      user: null,
      isAuthenticated: false,
      login: () => {},
      logout: () => {},
      loading: true,
    };
  }
  return context;
};