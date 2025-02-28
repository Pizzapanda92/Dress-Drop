import { createContext, useState, useEffect, useContext } from "react";

const BoutiqueContext = createContext({});

const BoutiqueContextProvider = ({ children }) => {
  const [boutique, setBoutique] = useState(null); // Stocke les infos de la boutique

  useEffect(() => {
    // 🔥 Ici, on pourra charger les infos de la boutique depuis un backend plus tard.
    const boutiqueTemporaire = {
      id: "1",
      name: "DressDrop Boutique",
      address: "101 Avenue de la Mode",
    };
    setBoutique(boutiqueTemporaire);
  }, []);

  return (
    <BoutiqueContext.Provider value={{ boutique, setBoutique }}>
      {children}
    </BoutiqueContext.Provider>
  );
};

export default BoutiqueContextProvider;
export const useBoutiqueContext = () => useContext(BoutiqueContext);