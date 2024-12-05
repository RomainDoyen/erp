import React from "react";

type ButtonProps = {
  children: React.ReactNode | string;
  className?: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  type?: "button" | "submit" | "reset";
  theme?: "primary" | "secondary";
  disabled?: boolean;
  loading?: boolean;
};

const Button = ({
  children,
  className = "",
  onClick,
  type = "button",
  disabled = false,
  loading = false,
  theme = "primary",
}: ButtonProps) => {
  const baseStyles = "w-full p-2 text-white rounded";
  const themeStyles =
    theme === "primary"
      ? `bg-blue-500 ${!disabled && !loading && "hover:bg-blue-600"}`
      : `bg-red-500 ${!disabled && !loading && "hover:bg-red-600"}`;
  const disabledStyles = "bg-gray-500 cursor-not-allowed";

  const finalClassName = `${baseStyles} ${
    disabled || loading ? disabledStyles : themeStyles
  } ${className}`;

  return (
    <button
      onClick={onClick}
      type={type}
      disabled={disabled || loading}
      className={finalClassName}
    >
      {loading ? "Envoi en cours..." : children}
    </button>
  );
};

export default Button;
