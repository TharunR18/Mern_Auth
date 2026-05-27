import Layout from "../components/Layout";
import AuthCard from "../components/AuthCard";
import GlassInput from "../components/GlassInput";
import GlassButton from "../components/Buttons";
import BorderGlow from "../components/BorderGlow";
import { useNavigate } from "react-router-dom";

const Login = () => {

  const navigate = useNavigate();
  const handleNavigateregister = () => {
    navigate("/register");
  }
  const handleNavigateresetpassword = () => {
    navigate("/register");
  }
  return (
    <Layout>

      <main className="flex min-h-[calc(100vh-96px)] items-center justify-center px-4 bg-linear-to-br from-black ">
        <BorderGlow>
          <AuthCard title="Login" subtitle="Welcome back">
            <div className="space-y-4">
              <GlassInput type="email" placeholder="Email id" />
              <GlassInput type="password" placeholder="Password" />
              <p onClick={handleNavigateresetpassword} className="text-sm text-yellow-400 cursor-pointer">
                Forgot password?
              </p>
              <GlassButton>Login</GlassButton>
              <p className="text-center text-sm text-white/60">
                Don't have an account?{" "}
                <span onClick={handleNavigateregister} className=" cursor-pointer text-yellow-400">
                  Sign up
                </span>
              </p>
            </div>
          </AuthCard>
        </BorderGlow>
      </main>
    </Layout >
  );
};

export default Login;