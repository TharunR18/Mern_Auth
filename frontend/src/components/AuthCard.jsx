const AuthCard = ({ title, subtitle, children }) => {
  return (
    <div className="w-full max-w-xs sm:max-w-sm md:max-w-md rounded-2xl sm:rounded-3xl border border-yellow-400/30 bg-black/40 p-5 sm:p-6 md:p-8 shadow-xl backdrop-blur-xl">
      <h1 className="text-center text-2xl sm:text-3xl font-bold text-white">
        {title}
      </h1>

      <p className="mt-1 sm:mt-2 text-center text-xs sm:text-sm md:text-base text-white/70">
        {subtitle}
      </p>

      <div className="mt-6 sm:mt-8">{children}</div>
    </div>
  );
};

export default AuthCard;