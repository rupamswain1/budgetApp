import React from "react";
import './button.style.scss';
interface ButtonProps {
  name: string;
  type: "primary" | "secondary";
  isEnabled?: boolean;
  onClick: () => void;
  key: string;
  className?: string;
}

const Button: React.FC<ButtonProps> = ({
  name,
  type = "primary",
  isEnabled = "true",
  onClick,
  key,
  className,
}) => {
  return (
    <button
      className={`kharcha-btn ${type}-btn ${className} ${!isEnabled && "btn-disabled"}`}
      onClick={onClick}
      key={key}
    >
      {name}
    </button>
  );
};

export default Button;
