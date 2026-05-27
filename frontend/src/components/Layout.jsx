import Footer from "./Footer";

const Layout = ({ children }) => {
  return (
    <div className="min-h-screen pt-24 pb-24 bg-black text-white">
      {children}
      <Footer />
    </div>
  );
};

export default Layout;