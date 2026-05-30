import { createContext, useState, useEffect } from "react";
import axios from "axios";

export const AppContent = createContext();

export const AppContextProvider = (props) => {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const [isLoggedin, setIsLoggedin] = useState(false);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const verifyAuth = async () => {
      try {
        // Add timeout - don't wait more than 5 seconds
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 5000);

        axios.defaults.withCredentials = true;
        const { data } = await axios.post(
          `${backendUrl}api/auth/is-auth`,
          {},
          { signal: controller.signal }
        );

        clearTimeout(timeoutId);

        if (data.success) {
          setIsLoggedin(true);
          setUserData(data.user);
        } else {
          setIsLoggedin(false);
          setUserData(null);
        }
      } catch (error) {
        console.log("Auth check failed - user not logged in");
        setIsLoggedin(false);
        setUserData(null);
      } finally {
        setLoading(false);
      }
    };

    if (backendUrl) {
      verifyAuth();
    } else {
      console.error("VITE_BACKEND_URL is not set");
      setLoading(false);
    }
  }, [backendUrl]);

  const value = {
    backendUrl,
    isLoggedin,
    setIsLoggedin,
    userData,
    setUserData,
    loading,
  };

  return (
    <AppContent.Provider value={value}>
      {props.children}
    </AppContent.Provider>
  );
};