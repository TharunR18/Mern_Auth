import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AppContent } from "../context/AppContext";
import axios from "axios";
import { toast } from 'react-toastify';

const Navbar = () => {
  const navigate = useNavigate();
  const { backendUrl, isLoggedin, setIsLoggedin } = useContext(AppContent);

  const handleNavigateHome = () => {
    navigate("/");
  };

  const handleLogout = async () => {
    try {
      axios.defaults.withCredentials = true;
      const { data } = await axios.post(backendUrl + "api/auth/logout");

      if (data.success) {
        setIsLoggedin(false);
        navigate("/");
        toast.success("Logged out successfully");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message || "Logout failed");
    }
  };

  return (
    <nav className="fixed top-0 left-0 z-50 w-full bg-transparent">
      <div className="px-8 py-5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <img
            src="/logo-white.png"
            alt="Logo"
            className="h-12 w-12 cursor-pointer"
            onClick={handleNavigateHome}
          />
          <h1 className="text-2xl font-bold text-white">AUTH-R18</h1>
        </div>
        {isLoggedin && (
          <button
            onClick={handleLogout}
            className="px-6 py-2 rounded-full border border-yellow-400 text-yellow-400 font-semibold hover:bg-yellow-400 hover:text-black transition-all duration-300"
          >
            Logout
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;