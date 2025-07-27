import type React from "react";

const Button = ({
  onClick,
  children,
}: {
  onClick: () => void;
  children: React.ReactNode;
}) => {
  return (
    <button
      onClick={onClick}
      className="bg-blue-500 hover:bg-blue-700 text-white text-2xl font-bold py-2 px-4 rounded"
    >
      {children}
    </button>
  );
};

export default Button;
