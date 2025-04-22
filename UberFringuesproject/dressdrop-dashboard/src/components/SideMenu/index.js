import { Menu } from "antd";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

const SideMenu = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();

  const menuItems = [
    {
      key: "/orders",
      label: "Commandes",
    },
  
    {
      key: "/shops",
      label: "Boutique",
    },
    {
      key: "/shops/create",
      label: "Créer une boutique",
    },
    {
      key: "/shop-clothes", 
      label: "Vêtement",
    },
    {
      key: "/shops/:shopId/clothes/create",
      label: "Ajouter un vêtement",
    },
    {
      key: "/Dashboard",
      label: "Dashboard",
    }, 
    
    {
      key: "/deliveries",
      label: "Livraisons"
    },
    
    {
      key: "/logout",
      label: "Se déconnecter",
      danger: true, 
      
    },

  ];

  const onClick = (menuItem) => {
    if (menuItem.key === "/logout") {
      logout();
      navigate("/login");
    } else {
      navigate(menuItem.key);
    }
  };

  return <Menu items={menuItems} onClick={onClick} />;
};

export default SideMenu;
