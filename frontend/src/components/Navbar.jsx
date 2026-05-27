import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  const handleNavigateHome = () => {
    navigate("/");
  };
  return (
    <nav className="fixed top-0 right-80 z-50 w-full bg-black ">
      <div className="mx-auto px-8 py-5 flex max-w-6xl items-center justify-between">
        <div className="flex items-center gap-3">
          <img
            src="/logo-white.png"
            alt="Logo"
            className="h-12 w-12 cursor-pointer"
            onClick={handleNavigateHome}
          />
          <h1 className="text-2xl font-bold text-white">AUTH-R18</h1>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;