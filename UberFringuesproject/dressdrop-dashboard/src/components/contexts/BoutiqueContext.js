import { createContext, useState, useEffect, useContext } from "react";

const BoutiqueContext = createContext({});

const BoutiqueContextProvider = ({ children }) => {
  const [admin, setAdmin] = useState(null); // Admin de la boutique
  const [boutique, setBoutique] = useState(null); // Infos de la boutique

  useEffect(() => {
    // Simule l'authentification : à remplacer par une vraie gestion de session
    const storedAdmin = localStorage.getItem("admin");
    if (storedAdmin) {
      setAdmin(JSON.parse(storedAdmin));
    }
  }, []);

  useEffect(() => {
    if (!admin) return;

    // Simule une requête pour récupérer les infos de la boutique de l’admin
    const fetchBoutique = async () => {
      // Ici, tu mettras un appel API si nécessaire
      const boutiqueData = {
        id: "123",
        name: "DressDrop Store",
        owner: admin.name,
      };
      setBoutique(boutiqueData);
    };

    fetchBoutique();
  }, [admin]);

  return (
    <BoutiqueContext.Provider value={{ boutique, setBoutique, admin }}>
      {children}
    </BoutiqueContext.Provider>
  );
};

export default BoutiqueContextProvider;

export const useBoutiqueContext = () => useContext(BoutiqueContext);
