import "./input.style.scss";
import React, { forwardRef } from "react";

interface InputFieldProps {
  label: string;
  name: string;
  type: string;
  className?: string;
}

const InputField = forwardRef<HTMLInputElement, InputFieldProps>(
  ({ label, name, type, className="" }, ref) => {
    console.log("inputField")
    return (
      <div className={`label-container ${className}`}>
        <label htmlFor={name} className="input-label">
          {label}
        </label>
        <input className="input-field" ref={ref} name={name} type={type} />
      </div>
    );
  }
);

export default InputField;
