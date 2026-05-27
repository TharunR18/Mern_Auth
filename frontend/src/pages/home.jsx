import Layout from "../components/Layout";
import ShapeGrid from "../components/ShapeGrid";
import { useNavigate } from "react-router-dom";

const Home = () => {

  const navigate = useNavigate();
  const handleNavigateHome = () => {
    navigate("/register");
  }

  return (
    <Layout>
      <main className="relative flex min-h-[calc(100vh-96px)] items-center justify-center px-6 text-center overflow-hidden">
        <div className="absolute inset-0">
          <ShapeGrid
            speed={0.32}
            size={40}
            direction="diagonal"
            borderColor="#2F293A"
            hoverColor="#222222"
            shape="hexagon"
          />
        </div>

        <div className="relative z-10 max-w-3xl">

          <h1 className="text-5xl md:text-9xl font-extrabold tracking-tight text-white">
            AUTH
          </h1>

          <p className="mx-auto mt-5 max-w-xl text-base md:text-lg font-light leading-7 text-gray-300">
            A clean MERN authentication project.
          </p>

          <button className="mt-9 rounded-full border border-yellow-400 px-8 py-3 text-sm font-semibold uppercase tracking-widest text-yellow-400 transition-all duration-300 hover:bg-yellow-400 cursor-pointer hover:text-black hover:shadow-[0_0_30px_rgba(250,204,21,0.35)]" onClick={handleNavigateHome}>
            Test My Project
          </button>
        </div>
      </main>
    </Layout>
  );
};

export default Home;