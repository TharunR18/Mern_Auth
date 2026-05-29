import Layout from "../components/Layout";
import AuthCard from "../components/AuthCard";
import GlassInput from "../components/GlassInput";
import GlassButton from "../components/Buttons";
import BorderGlow from "../components/BorderGlow";
import { useNavigate } from "react-router-dom";
import { useState, useContext } from "react";
import { AppContent } from "../context/AppContext";
import axios from "axios";
import { toast } from 'react-toastify';

const Login = () => {

  const { backendUrl, isLoggedin, setIsLoggedin, setUserData } = useContext(AppContent)
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleNavigateregister = () => {
    navigate("/register");
  }

  const handleNavigateresetpassword = () => {
    navigate("/reset-password");
  }

  const onSubmitHandler = async (e) => {
    try {
      e.preventDefault();

      if (!email || !password) {
        toast.error("Please fill all fields")
        return
      }

      axios.defaults.withCredentials = true
      const { data } = await axios.post(backendUrl + "api/auth/login", { email, password })

      if (data.success) {
        setIsLoggedin(true)

        // Fetch user details
        try {
          axios.defaults.withCredentials = true;
          const { data: userData } = await axios.get(backendUrl + "api/user/get-user-details");
          if (userData.success) {
            setUserData(userData.user);
          }
        } catch (error) {
          console.error("Failed to fetch user details");
        }

        navigate("/")
        toast.success("Login successful")
      }
      else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message || "Login failed")
    }
  }
  return (
    <Layout>
      <main className="flex min-h-[calc(100vh-96px)] items-center justify-center px-3 sm:px-4 md:px-6 bg-linear-to-br from-black">
        <BorderGlow>
          <AuthCard title="Login" subtitle="Welcome back">
            <form onSubmit={onSubmitHandler} className="space-y-3 sm:space-y-4">
              <GlassInput
                type="email"
                placeholder="Email id"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
              />
              <GlassInput
                type="password"
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
              />
              <p onClick={handleNavigateresetpassword} className="text-xs sm:text-sm text-yellow-400 cursor-pointer">
                Forgot password?
              </p>
              <GlassButton type="submit">Login</GlassButton>
              <p className="text-center text-xs sm:text-sm text-white/60">
                Don't have an account?{" "}
                <span onClick={handleNavigateregister} className=" cursor-pointer text-yellow-400">
                  Sign up
                </span>
              </p>
            </form>
          </AuthCard>
        </BorderGlow>
      </main>
    </Layout >
  );
};

export default Login;