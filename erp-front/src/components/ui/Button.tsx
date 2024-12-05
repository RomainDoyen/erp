import React from "react";

type ButtonProps = {
  children: React.ReactNode | string;
  className: string | React.ReactNode;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  loading?: boolean;
};

const Button = ({ children, onClick, type, disabled, loading }: ButtonProps) => {
  return (
    <button
      onClick={onClick}
      type={type}
      disabled={disabled || loading}
      className={`w-full p-2 text-white ${
        disabled || loading ? "bg-gray-500" : "bg-blue-500"
      } rounded hover:bg-blue-600`}
    >
      {loading ? "Envoi en cours..." : children}
    </button>
  );
}

export default Button;