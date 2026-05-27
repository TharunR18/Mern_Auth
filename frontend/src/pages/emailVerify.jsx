import Layout from "../components/Layout";
import AuthCard from "../components/AuthCard";
import GlassButton from "../components/Buttons";
import BorderGlow from "../components/BorderGlow";

const EmailVerify = () => {
  return (
    <Layout>
      <main className="flex min-h-[calc(100vh-96px)] items-center justify-center px-4 bg-linear-to-br from-black">
        <BorderGlow>
          <AuthCard title="Verify Email" subtitle="Check your email">
            <div className="space-y-5 text-center">
              <div className="text-5xl">📩</div>
              <p className="text-white/70">
                We sent a verification link to your email.
              </p>
              <GlassButton>Verify Email</GlassButton>
            </div>
          </AuthCard>
        </BorderGlow>
      </main>
    </Layout>
  );
};

export default EmailVerify;