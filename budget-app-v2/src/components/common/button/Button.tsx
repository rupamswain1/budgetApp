import React from "react";
import './button.style.scss';
interface ButtonProps {
  name: string;
  type: "primary" | "secondary";
  isEnabled?: boolean;
  onClick: () => void;
  className?: string;
}

const Button: React.FC<ButtonProps> = ({
  name,
  type = "primary",
  isEnabled = "true",
  onClick,
  className,
}) => {
  console.log("Button")
  return (
    <button
      className={`kharcha-btn ${type}-btn ${className} ${!isEnabled && "btn-disabled"}`}
      onClick={onClick}
      key={name}
      disabled={!isEnabled}
    >
      {name}
    </button>
  );
};

export default Button;
