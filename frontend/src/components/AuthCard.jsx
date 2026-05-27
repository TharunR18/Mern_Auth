const AuthCard = ({ title, subtitle, children }) => {
  return (
    <div className="w-full max-w-md rounded-3xl border border-yellow-400/30 bg-black/40 p-8 shadow-xl backdrop-blur-xl">
      <h1 className="text-center text-3xl font-bold text-white">
        {title}
      </h1>

      <p className="mt-2 text-center text-white/70">
        {subtitle}
      </p>

      <div className="mt-8">{children}</div>
    </div>
  );
};

export default AuthCard;