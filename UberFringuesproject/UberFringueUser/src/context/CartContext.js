import React, { createContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { API_URL } from "@env";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const loadCart = async () => {
      try {
        const savedCart = await AsyncStorage.getItem("cart");
        if (savedCart) {
          setCart(JSON.parse(savedCart));
        }
      } catch (error) {
        console.error("Erreur lors du chargement du panier :", error);
      }
    };
    loadCart();
  }, []);

  const addToCart = async (newItem) => {
    let updatedCart = [...cart];

    const existingIndex = updatedCart.findIndex(
      (item) => item.id === newItem.id && item.size === newItem.size && item.color === newItem.color
    );

    if (existingIndex >= 0) {
      updatedCart[existingIndex].quantity += newItem.quantity;
    } else {
      updatedCart.push(newItem);
    }

    setCart(updatedCart);
    await AsyncStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const removeFromCart = async (itemToRemove) => {
    const updatedCart = cart.filter(
      (item) => !(item.id === itemToRemove.id && item.size === itemToRemove.size && item.color === itemToRemove.color)
    );
    setCart(updatedCart);
    await AsyncStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const clearCart = async () => {
    setCart([]);
    await AsyncStorage.removeItem("cart");
  };

  const placeOrder = async (userId, shopId, deliveryFee = 5) => {
    try {
      const totalPrice = cart.reduce((total, item) => total + item.price * item.quantity, 0);
      const response = await axios.post(`${API_URL}/orders/create`, {
        userId,
        shopId,
        items: cart,
        totalPrice,
        deliveryFee,
      });

      if (response.status === 201) {
        clearCart();
        return response.data;
      } else {
        throw new Error("Erreur lors de la création de la commande");
      }
    } catch (error) {
      console.error("Erreur lors de la commande :", error);
      throw error;
    }
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart, placeOrder }}>
      {children}
    </CartContext.Provider>
  );
};
