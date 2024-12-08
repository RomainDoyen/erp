import { ButtonProps } from "../../types/typesUI";

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
