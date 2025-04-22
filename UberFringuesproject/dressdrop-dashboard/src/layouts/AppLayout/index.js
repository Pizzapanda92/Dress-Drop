import { Layout, Image } from "antd";
import SideMenu from "../../components/SideMenu";
import { Outlet } from "react-router-dom";

const { Sider, Content, Footer } = Layout;

const AppLayout = () => {
  return (
    <Layout>
      {/* Sidebar visible uniquement dans AppLayout */}
      <Sider style={{ height: "100vh", backgroundColor: "white" }}>
        <Image
          src="https://i.postimg.cc/tR3jzbgZ/Capture-d-cran-2025-02-19-135930.png"
          preview={false}
        />
        <SideMenu />
      </Sider>

      <Layout>
        <Content style={{ padding: 20 }}>
          <Outlet />
        </Content>
        <Footer style={{ textAlign: "center" }}>
          DressDrop Dashboard 2025
        </Footer>
      </Layout>
    </Layout>
  );
};

export default AppLayout;
