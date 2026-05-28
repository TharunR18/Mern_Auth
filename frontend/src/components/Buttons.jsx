const GlassButton = ({ children, type = "button" }) => {
  return (
    <button type={type} className="w-full rounded-full cursor-pointer bg-yellow-400 text-black py-3 font-semibold transition hover:bg-yellow-300">
      {children}
    </button>
  );
};

export default GlassButton;