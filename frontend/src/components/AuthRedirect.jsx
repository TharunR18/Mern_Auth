import { Navigate } from "react-router-dom";
import { useContext } from "react";
import { AppContent } from "../context/AppContext";

const AuthRedirect = ({ children }) => {
  const { isLoggedin } = useContext(AppContent);

  if (isLoggedin) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default AuthRedirect;