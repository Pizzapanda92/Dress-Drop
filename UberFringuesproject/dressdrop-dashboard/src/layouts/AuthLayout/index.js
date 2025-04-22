import { Outlet } from "react-router-dom";

const AuthLayout = () => {
  return (
    <div style={{
      height: "100vh",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "#f5f5f5"
    }}>
      <Outlet />
    </div>
  );
};

export default AuthLayout;
