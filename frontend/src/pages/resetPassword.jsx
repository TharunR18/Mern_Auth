import Layout from "../components/Layout";
import AuthCard from "../components/AuthCard";
import GlassInput from "../components/GlassInput";
import GlassButton from "../components/Buttons";
import BorderGlow from "../components/BorderGlow";

const ResetPassword = () => {
  return (
    <Layout>
      <main className="flex min-h-[calc(100vh-96px)] items-center justify-center px-4 bg-linear-to-br from-black to-[#1a1a1a]">
        <BorderGlow>
          <AuthCard title="Reset Password" subtitle="Create new password">
            <div className="space-y-4">
              <GlassInput type="password" placeholder="New password" />
              <GlassInput type="password" placeholder="Confirm password" />
              <GlassButton>Reset Password</GlassButton>
            </div>
          </AuthCard>
        </BorderGlow>
      </main >
    </Layout >
  );
};

export default ResetPassword;