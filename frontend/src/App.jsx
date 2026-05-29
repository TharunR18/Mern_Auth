import { Routes, Route } from "react-router-dom";
import { useContext } from "react";
import Navbar from "./components/Navbar";
import Home from "./pages/Home.jsx";
import Login from "./pages/Login.jsx";
import ResetPassword from "./pages/ResetPassword.jsx";
import Register from "./pages/Register.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import AuthRedirect from "./components/AuthRedirect.jsx";
import { AppContent } from "./context/AppContext.jsx";
import { ToastContainer } from "react-toastify";

const NotFound = () => {
  return (
    <div className="min-h-screen flex items-center justify-center text-white bg-black">
      <h1 className="text-4xl font-bold">404 - Page Not Found</h1>
    </div>
  );
};

const LoadingScreen = () => {
  return (
    <div className="min-h-screen flex items-center justify-center text-white bg-black">
      <h1 className="text-2xl font-bold">Loading...</h1>
    </div>
  );
};

const App = () => {
  const { loading } = useContext(AppContent);

  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <>
      <ToastContainer />
      <Routes>
        {/* Public Home Route */}
        <Route
          path="/"
          element={
            <>
              <Navbar />
              <Home />
            </>
          }
        />

        {/* Login - Redirect if already logged in */}
        <Route
          path="/login"
          element={
            <AuthRedirect>
              <>
                <Navbar />
                <Login />
              </>
            </AuthRedirect>
          }
        />

        {/* Register - Redirect if already logged in */}
        <Route
          path="/register"
          element={
            <AuthRedirect>
              <>
                <Navbar />
                <Register />
              </>
            </AuthRedirect>
          }
        />

        {/* Reset Password - Can stay public (user forgot password) */}
        <Route
          path="/reset-password"
          element={
            <>
              <Navbar />
              <ResetPassword />
            </>
          }
        />

        {/* Protected Route Example (create a Dashboard page later) */}
        {/* 
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <>
                <Navbar />
                <Dashboard />
              </>
            </ProtectedRoute>
          }
        />
        */}

        {/* Wrong endpoint */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
};

export default App;