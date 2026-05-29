const GlassInput = ({ type = "text", placeholder, onChange, value }) => {
  return (
    <input
      type={type}
      placeholder={placeholder}
      onChange={onChange}
      value={value}
      className="w-full rounded-full border border-yellow-400/30 bg-white/10 px-3 sm:px-4 md:px-5 py-2 sm:py-2.5 md:py-3 text-sm sm:text-base text-white outline-none placeholder:text-white/50 focus:border-yellow-400 transition"
    />
  );
};

export default GlassInput;