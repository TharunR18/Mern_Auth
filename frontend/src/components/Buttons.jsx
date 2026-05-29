const GlassButton = ({ children, type = "button" }) => {
  return (
    <button type={type} className="w-full rounded-full cursor-pointer bg-yellow-400 text-black py-2 sm:py-2.5 md:py-3 text-sm sm:text-base font-semibold transition hover:bg-yellow-300">
      {children}
    </button>
  );
};

export default GlassButton;