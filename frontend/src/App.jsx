import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import EmailVerify from "./pages/EmailVerify";
import ResetPassword from "./pages/ResetPassword";
import Register from "./pages/Register";

const NotFound = () => {
  return (
    <div className="min-h-screen flex items-center justify-center text-white bg-black">
      <h1 className="text-4xl font-bold">404 - Page Not Found</h1>
    </div>
  );
};

const App = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <>
            <Navbar />
            <Home />
          </>
        }
      />

      <Route path="/login" element={<><Navbar /><Login /></>} />
      <Route path="/email-verify" element={<><Navbar /><EmailVerify /></>} />
      <Route path="/reset-password" element={<><Navbar /><ResetPassword /></>} />
      <Route path="/register" element={<><Navbar /><Register /></>} />

      {/* Wrong endpoint */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default App;