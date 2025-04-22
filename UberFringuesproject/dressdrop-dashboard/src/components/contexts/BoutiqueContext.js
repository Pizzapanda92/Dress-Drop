import { createContext, useState, useEffect, useContext } from "react";
import dishesData from "../assets/data/dishes.json"; // Charger les vêtements initiaux

const BoutiqueContext = createContext({});

const BoutiqueContextProvider = ({ children }) => {
  const [admin, setAdmin] = useState(null); 
  const [boutique, setBoutique] = useState(null); 
  const [dishes, setDishes] = useState(dishesData);

  useEffect(() => {
    const storedAdmin = localStorage.getItem("admin");
    if (storedAdmin) {
      setAdmin(JSON.parse(storedAdmin));
    }
  }, []);

  useEffect(() => {
    if (!admin) return;
    const fetchBoutique = async () => {
      const boutiqueData = {
        id: "123",
        name: "DressDrop Store",
        owner: admin.name,
      };
      setBoutique(boutiqueData);
    };
    fetchBoutique();
  }, [admin]);

  // 🆕 Fonction pour ajouter un nouvel article
  const addClothingItem = (newItem) => {
    setDishes((prevDishes) => [...prevDishes, newItem]);
  };

  return (
    <BoutiqueContext.Provider value={{ boutique, setBoutique, admin, dishes, addClothingItem }}>
      {children}
    </BoutiqueContext.Provider>
  );
};

export default BoutiqueContextProvider;
export const useBoutiqueContext = () => useContext(BoutiqueContext);
