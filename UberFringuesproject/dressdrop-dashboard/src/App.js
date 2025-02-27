import { Layout, Image } from "antd";
import SideMenu from "./components/SideMenu";
import AppRoutes from "./components/AppRoutes"

const { Sider, Content, Footer } = Layout;

function App() {
  return (
    <Layout>
      <Sider style={{ height: "100vh", backgroundColor: "white" }}>
        <Image
          src="https://i.postimg.cc/tR3jzbgZ/Capture-d-cran-2025-02-19-135930.png"
          preview={false}
        />
        <SideMenu />
      </Sider>

      <Layout>
        <Content>
          <AppRoutes />
        </Content>

        <Footer style={{ textAlign: "center" }}>
          DressDrop Dashboard 2025
        </Footer>

      </Layout>
    </Layout>
  );
}

export default App;



