import { Layout, Image } from "antd";
import SideMenu from "./components/SideMenu";
import AppRoutes from "./components/AppRoutes";
import BoutiqueContextProvider from "./contexts/BoutiqueContext";

const { Sider, Content, Footer } = Layout;

function App() {
  return (
    <BoutiqueContextProvider> 
      <Layout>
        {/* Barre latérale */}
        <Sider style={{ height: "100vh", backgroundColor: "white" }}>
          <Image
            src="https://i.postimg.cc/tR3jzbgZ/Capture-d-cran-2025-02-19-135930.png"
            preview={false}
          />
          <SideMenu />
        </Sider>

        {/* Contenu principal */}
        <Layout>
          <Content style={{ padding: 20 }}>  
            <AppRoutes />
          </Content>

          {/* Pied de page */}
          <Footer style={{ textAlign: "center" }}>
            DressDrop Dashboard 2025
          </Footer>
        </Layout>
      </Layout>
    </BoutiqueContextProvider>
  );
}

export default App;



