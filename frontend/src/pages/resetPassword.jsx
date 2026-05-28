import Layout from "../components/Layout";
import AuthCard from "../components/AuthCard";
import GlassInput from "../components/GlassInput";
import GlassButton from "../components/Buttons";
import BorderGlow from "../components/BorderGlow";
import { useState, useContext } from "react";
import { AppContent } from "../context/AppContext";
import axios from "axios";
import { toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";

const ResetPassword = () => {
  const { backendUrl } = useContext(AppContent);
  const navigate = useNavigate();

  const [step, setStep] = useState(1); // 1: email, 2: otp, 3: password
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  // Step 1: Send Reset OTP to email
  const handleSendOtp = async (e) => {
    e.preventDefault();

    if (!email) {
      toast.error("Please enter your email");
      return;
    }

    setLoading(true);
    try {
      const { data } = await axios.post(backendUrl + "api/auth/send-reset-otp", { email });

      if (data.success) {
        toast.success("OTP sent to your email");
        setStep(2);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message || "Failed to send OTP");
    } finally {
      setLoading(false);
    }
  };

  // Step 2: Verify OTP and move to password reset
  const handleVerifyOtp = async (e) => {
    e.preventDefault();

    if (!otp) {
      toast.error("Please enter the OTP");
      return;
    }

    if (otp.length !== 6) {
      toast.error("OTP must be 6 digits");
      return;
    }

    setStep(3);
    toast.success("OTP verified. Enter your new password");
  };

  // Step 3: Reset password
  const handleResetPassword = async (e) => {
    e.preventDefault();

    if (!newPassword || !confirmPassword) {
      toast.error("Please fill all password fields");
      return;
    }

    if (newPassword !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    if (newPassword.length < 8) {
      toast.error("Password must be at least 8 characters");
      return;
    }

    setLoading(true);
    try {
      const { data } = await axios.post(backendUrl + "api/auth/reset-password", {
        email,
        otp,
        newPassword
      });

      if (data.success) {
        toast.success("Password reset successfully! Redirecting to login...");
        setTimeout(() => {
          navigate("/login");
        }, 2000);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message || "Failed to reset password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <main className="flex min-h-[calc(100vh-96px)] items-center justify-center px-4 bg-linear-to-br from-black to-[#1a1a1a]">
        <BorderGlow>
          {step === 1 && (
            <AuthCard title="Reset Password" subtitle="Enter your email">
              <form onSubmit={handleSendOtp} className="space-y-4">
                <GlassInput
                  type="email"
                  placeholder="Enter your email"
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                />
                <GlassButton type="submit" disabled={loading}>
                  {loading ? "Sending..." : "Send OTP"}
                </GlassButton>
              </form>
            </AuthCard>
          )}

          {step === 2 && (
            <AuthCard title="Verify OTP" subtitle="Check your email for OTP">
              <form onSubmit={handleVerifyOtp} className="space-y-4">
                <GlassInput
                  type="text"
                  placeholder="Enter 6-digit OTP"
                  onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
                  value={otp}
                  maxLength="6"
                />
                <GlassButton type="submit">Verify OTP</GlassButton>
              </form>
            </AuthCard>
          )}

          {step === 3 && (
            <AuthCard title="Create New Password" subtitle="Enter your new password">
              <form onSubmit={handleResetPassword} className="space-y-4">
                <GlassInput
                  type="password"
                  placeholder="New password"
                  onChange={(e) => setNewPassword(e.target.value)}
                  value={newPassword}
                />
                <GlassInput
                  type="password"
                  placeholder="Confirm password"
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  value={confirmPassword}
                />
                <p className="text-xs text-white/50">
                  Password must be at least 8 characters with 1 uppercase, 1 number, and 1 special character
                </p>
                <GlassButton type="submit" disabled={loading}>
                  {loading ? "Resetting..." : "Reset Password"}
                </GlassButton>
              </form>
            </AuthCard>
          )}
        </BorderGlow>
      </main>
    </Layout>
  );
};

export default ResetPassword;