import { Menu } from "antd";
import { useNavigate } from "react-router-dom";

const SideMenu = () => {
  const navigate = useNavigate();

  // Définition des éléments du menu
  const menuItems = [
    {
      key: "/",
      label: "Orders",
    },
    {
      key: "/dresing",
      label: "Dressing",
    },
    {
      key: "/order-history",
      label: "Order History",
    },
    {
      key: "/settings",
      label: "Settings",
    },
    {
      key: "/logout", // Si tu veux gérer la déconnexion plus tard
      label: "Log Out",
      danger: true,
    },
  ];

  // Fonction de navigation au clic
  const onClick = (menuItem) => {
    if (menuItem.key === "/logout") {
      console.log("Déconnexion..."); // À remplacer par une vraie gestion de session
      // Exemple si tu veux supprimer un token d'authentification :
      // localStorage.removeItem("authToken");
      window.location.reload();
    } else {
      navigate(menuItem.key);
    }
  };

  return (
    <Menu items={menuItems} onClick={onClick} />
  );
};

export default SideMenu;
