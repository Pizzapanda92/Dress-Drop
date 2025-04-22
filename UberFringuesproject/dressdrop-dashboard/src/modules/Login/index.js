import { useState } from "react";
import { Form, Input, Button, Typography, Card, message, Select } from "antd";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

const { Title } = Typography;
const { Option } = Select;

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const toggleForm = () => setIsLogin(!isLogin);

  const handleLogin = async (values) => {
    setLoading(true);
    try {
      const res = await axios.post("http://localhost:5000/user/login", values);
      const { token, userId } = res.data;

      // On passe par le contexte
      await login(token, userId);

      message.success("Connexion réussie !");
      navigate("/order-history");
    } catch (error) {
      console.error("Erreur connexion :", error);
      message.error(error.response?.data?.message || "Erreur lors de la connexion.");
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (values) => {
    setLoading(true);
    try {
      await axios.post("http://localhost:5000/user/register", values);
      message.success("Inscription réussie ! Connectez-vous.");
      setIsLogin(true);
    } catch (error) {
      console.error("Erreur inscription :", error);
      message.error(error.response?.data?.message || "Erreur lors de l'inscription.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ position: "relative", height: "100vh", overflow: "hidden" }}>
      {/* Vidéo en arrière-plan */}
      <video
        autoPlay
        muted
        loop
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          zIndex: -1,
        }}
      >
        <source src="/videos/background.mp4" type="video/mp4" />
        Votre navigateur ne supporte pas la balise vidéo.
      </video>

      {/* Contenu centré */}
      <div
        style={{
          height: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Card style={{ width: 400, backgroundColor: "rgba(255, 255, 255, 0.9)" }}>
          <Title level={3} style={{ textAlign: "center" }}>
            {isLogin ? "Connexion" : "Inscription"}
          </Title>

          <Form layout="vertical" onFinish={isLogin ? handleLogin : handleRegister}>
            {!isLogin && (
              <>
                <Form.Item name="pseudo" label="Pseudo" rules={[{ required: true }]}>
                  <Input />
                </Form.Item>

                <Form.Item name="role" label="Rôle" rules={[{ required: true }]}>
                  <Select placeholder="Choisissez un rôle">
                    <Option value="seller">Vendeur</Option>
                    <Option value="buyer">Acheteur</Option>
                    <Option value="delivery">Livreur</Option>
                  </Select>
                </Form.Item>

                <Form.Item label="Adresse">
                  <Form.Item name={["address", "street"]} rules={[{ required: true }]} style={{ marginBottom: 8 }}>
                    <Input placeholder="Rue" />
                  </Form.Item>
                  <Form.Item name={["address", "city"]} rules={[{ required: true }]} style={{ marginBottom: 8 }}>
                    <Input placeholder="Ville" />
                  </Form.Item>
                  <Form.Item name={["address", "postalCode"]} rules={[{ required: true }]} style={{ marginBottom: 8 }}>
                    <Input placeholder="Code postal" />
                  </Form.Item>
                  <Form.Item name={["address", "country"]} rules={[{ required: true }]} style={{ marginBottom: 8 }}>
                    <Input placeholder="Pays" />
                  </Form.Item>
                </Form.Item>
              </>
            )}

            <Form.Item name="email" label="Email" rules={[{ required: true, type: "email" }]}>
              <Input />
            </Form.Item>

            <Form.Item name="password" label="Mot de passe" rules={[{ required: true, min: 6 }]}>
              <Input.Password />
            </Form.Item>

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                loading={loading}
                style={{
                  width: "100%",
                  backgroundColor: "#3fc060",
                  borderColor: "#3fc060",
                }}
              >
                {isLogin ? "Se connecter" : "S'inscrire"}
              </Button>
            </Form.Item>
          </Form>

          <Button type="link" onClick={toggleForm} style={{ width: "100%" }}>
            {isLogin ? "Pas encore de compte ? S’inscrire" : "Déjà inscrit ? Se connecter"}
          </Button>
        </Card>
      </div>
    </div>
  );
};

export default Login;
