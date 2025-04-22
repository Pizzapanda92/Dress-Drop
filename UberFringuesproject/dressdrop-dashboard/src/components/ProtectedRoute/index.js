// ✅ Désactive toute restriction temporairement
const ProtectedRoute = ({ children }) => {
  return children; // ➜ autorise tout accès, sans vérif
};

export default ProtectedRoute;
