import { AuthProvider } from "./contexts/AuthContext";
import AppRoutes from "./components/AppRoutes";

function App() {
  return (
    <AuthProvider>
      <AppRoutes />
    </AuthProvider>
  );
}

export default App;
