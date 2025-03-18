import { React, createContext, useState, useEffect } from "react";
import axios from "axios";
import { API_URL } from "@env";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [cartId, setCartId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const userId = await AsyncStorage.getItem("userId");
        if (!userId) throw new Error("Aucun ID utilisateur trouvé !");
  
        console.log("Récupération du panier pour userId :", userId);
        const response = await axios.get(`${API_URL}/cart/${userId}`);
  
        console.log("Réponse API :", JSON.stringify(response.data, null, 2));
  
        if (!response.data || !response.data.items) {
          throw new Error("Réponse API invalide :", response.data);
        }
        const updatedItems = await Promise.all(
          response.data.items.map(async (item) => {
            if (typeof item.productId === "string") {
              const productResponse = await axios.get(`${API_URL}/clothes/${item.productId}`);
              return {
                ...item,
                productId: productResponse.data,
              };
            }
            return item;
          })
        );
  
        setCart(updatedItems);
        setCartId(response.data._id);
  
        console.log("Cart mis à jour avec les produits :", JSON.stringify(updatedItems, null, 2));
      } catch (error) {
        console.error("Erreur lors du chargement du panier :", error);
      } finally {
        setLoading(false);
      }
    };
  
    fetchCart();
  }, []);
  const addToCart = async (newItem) => {
    try {
      const userId = await AsyncStorage.getItem("userId");
  
      if (!userId) {
        console.error("Erreur: Aucun ID utilisateur trouvé !");
        throw new Error("Utilisateur non connecté.");
      }
  
      console.log("Envoi au panier :", JSON.stringify(newItem, null, 2));
  
      const response = await axios.post(`${API_URL}/cart/add`, {
        userId,
        items: [{ 
          productId: newItem.productId, 
          quantity: newItem.quantity 
        }]
      });
  
      console.log("Réponse API ajout panier :", JSON.stringify(response.data, null, 2));
  
      setCart(response.data.items);
      setCartId(response.data._id);
    } catch (error) {
      console.error("Erreur lors de l'ajout au panier :", error);
    }
  };
  
  const removeFromCart = async (product) => {
    try {
      if (!cartId) throw new Error("Aucun panier trouvé !");
      if (!product || !product.productId) throw new Error("ID du produit invalide !");

      const productId = typeof product.productId === "object" ? product.productId._id : product.productId;
  
      console.log(`Suppression du produit ${productId} du panier ${cartId}`);
  
      const response = await axios.delete(`${API_URL}/cart/remove/${cartId}`, {
        data: { productId }
      });
  
      console.log("Réponse API suppression panier :", response.data);
  
      setCart(response.data.items || []);
    } catch (error) {
      console.error("Erreur lors de la suppression du panier :", error);
    }
  };

  const clearCart = async () => {
    try {
      if (!cartId) {
        console.error("Erreur : Aucun panier trouvé !");
        return;
      }
  
      console.log("Vidage du panier :", cartId);
  
      await axios.delete(`${API_URL}/cart/clear/${cartId}`);
  

      setCart([]);
      setCartId(null);
      setTotalPrice(0);
  
      console.log("Panier vidé !");
    } catch (error) {
      console.error("Erreur lors du vidage du panier :", error);
    }
  };
  

  const placeOrder = async () => {
    try {
      const userId = await AsyncStorage.getItem("userId");
      if (!userId) throw new Error("Aucun utilisateur trouvé !");

      if (!cartId) throw new Error("Aucun panier trouvé !");
      
      console.log(`Envoi de la commande pour userId: ${userId}, cartId: ${cartId}`);

      const response = await axios.post(`${API_URL}/order/create-from-cart`, {
        userId,
        cartId,
      });

      console.log("Commande passée :", response.data);

      clearCart();
      return response.data;
    } catch (error) {
      console.error("Erreur lors de la commande :", error);
      throw error;
    }
  };

  return (
    <CartContext.Provider value={{ cart, totalPrice, addToCart, removeFromCart, clearCart, placeOrder }}>
      {children}
    </CartContext.Provider>
  );
};
