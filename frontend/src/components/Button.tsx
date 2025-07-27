const Button = ({
  children,
  onClick,
  outlined = false,
}: {
  children: React.ReactNode;
  onClick?: () => void;
  outlined?: boolean;
}) => (
  <button
    onClick={onClick}
    className={`px-6 py-3 rounded-xl font-medium transition duration-200 ${
      outlined
        ? "border border-white text-white hover:bg-white hover:text-black"
        : "bg-blue-600 text-white hover:bg-blue-700"
    }`}
  >
    {children}
  </button>
);
export default Button;
