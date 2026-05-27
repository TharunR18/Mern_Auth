import Layout from "../components/Layout";
import AuthCard from "../components/AuthCard";
import GlassInput from "../components/GlassInput";
import GlassButton from "../components/Buttons";
import BorderGlow from "../components/BorderGlow";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const handleNavigatelogin = () => {
    navigate("/login");
  }

  return (
    <Layout>
      <main className="flex min-h-[calc(100vh-96px)] items-center justify-center px-4 bg-linear-to-br from-black">
        <BorderGlow>
          <AuthCard title="Create Account" subtitle="Register your account">
            <div className="space-y-4 ">
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

              <GlassButton>Sign Up</GlassButton>

              <p className="text-center text-sm text-white/60">
                Already have an account?{" "}
                <span onClick={handleNavigatelogin} className="text-yellow-400 cursor-pointer">
                  Login here
                </span>
              </p>
            </div>
          </AuthCard>
        </BorderGlow>
      </main>
    </Layout>
  );
};

export default Register;