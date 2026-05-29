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
    <nav className="fixed top-0 left-0 z-20 w-full bg-transparent">
      <div className="px-3 sm:px-6 md:px-8 py-3 sm:py-5 flex items-center justify-between">
        <div className="flex items-center gap-2 sm:gap-2">
          <img
            src="/logo-white.png"
            alt="Logo"
            className="h-8 sm:h-10 md:h-12 w-8 sm:w-10 md:w-12 cursor-pointer"
            onClick={handleNavigateHome}
          />
          <h1 className="text-lg sm:text-xl md:text-1xl font-bold text-white">AUTH-R18</h1>
        </div>
        {isLoggedin && (
          <button
            onClick={handleLogout}
            className="px-3 sm:px-4 md:px-6 py-1.5 sm:py-2 md:py-2 text-xs sm:text-sm md:text-base rounded-full border border-yellow-400 text-yellow-400 font-semibold hover:bg-yellow-400 hover:text-black transition-all duration-300"
          >
            Logout
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;