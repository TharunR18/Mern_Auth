import Layout from "../components/Layout";
import AuthCard from "../components/AuthCard";
import GlassInput from "../components/GlassInput";
import GlassButton from "../components/Buttons";
import BorderGlow from "../components/BorderGlow";
import { useNavigate } from "react-router-dom";
import { useState, useContext } from "react";
import axios from "axios";
import { AppContent } from "../context/AppContext";
import { toast } from 'react-toastify';


const Register = () => {
  const { backendUrl, isLoggedin, setIsLoggedin, setUserData } = useContext(AppContent)
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const handleNavigatelogin = () => {
    navigate("/login");
  }

  const onSubmitHandler = async (e) => {

    try {
      e.preventDefault();

      if (!username || !email || !password) {
        toast.error("Please fill all fields")
        return
      }

      axios.defaults.withCredentials = true
      const { data } = await axios.post(backendUrl + "api/auth/register", { name: username, email, password })

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
        toast.success("Account created successfully")
      }
      else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message || "Registration failed")
    }

  }

  return (
    <Layout>
      <main className="flex min-h-[calc(100vh-96px)] items-center justify-center px-3 sm:px-4 md:px-6 bg-linear-to-br from-black">
        <BorderGlow>
          <AuthCard title="Create Account" subtitle="Register your account">
            <form onSubmit={onSubmitHandler} className="space-y-3 sm:space-y-4 ">
              <GlassInput
                type="text"
                placeholder="Full Name"
                onChange={(e) => setUsername(e.target.value)}
                value={username}
              />
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

              <GlassButton type="submit">Sign Up</GlassButton>
            </form>

            <p className="text-center text-xs sm:text-sm text-white/60">
              Already have an account?{" "}
              <span onClick={handleNavigatelogin} className="text-yellow-400 cursor-pointer">
                Login here
              </span>
            </p>
          </AuthCard>
        </BorderGlow>
      </main>
    </Layout>
  );
};

export default Register;