import Footer from "./Footer";

const Layout = ({ children }) => {
  return (
    <div className="min-h-screen bg-black text-white">
      {children}
      <Footer />
    </div>
  );
};

export default Layout;