import "./input.style.scss";
import React, { forwardRef } from "react";

interface InputFieldProps {
  label: string;
  name: string;
  type: string;
}

const InputField = forwardRef<HTMLInputElement, InputFieldProps>(
  ({ label, name, type }, ref) => {
    return (
      <div className="label-container">
        <label htmlFor={name} className="input-label">{label}</label>
        <input className="input-field" ref={ref} name={name} type={type}/>
      </div>
    );
  }
);

export default InputField;
