import "./input.style.scss";
import React, { forwardRef } from "react";

interface InputFieldProps {
  label: string;
  name: string;
  type: string;
  className?: string;
  onChangeHandler: (e:unknown)=>void;
}

const InputField = forwardRef<HTMLInputElement, InputFieldProps>(
  ({ label, name, type, className="", onChangeHandler }, ref) => {
    console.log("inputField")
    return (
      <div className={`label-container ${className}`}>
        <label htmlFor={name} className="input-label">
          {label}
        </label>
        <input className="input-field" ref={ref} name={name} type={type} onChange={onChangeHandler}/>
      </div>
    );
  }
);

export default InputField;
