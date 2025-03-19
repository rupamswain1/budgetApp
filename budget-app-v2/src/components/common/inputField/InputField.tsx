import "./input.style.scss";
import React, { forwardRef } from "react";

interface InputFieldProps {
  label: string;
  name: string;
  type: string;
  value:string|number|Date|null;
  className?: string;
  onChangeHandler: (e:React.ChangeEvent<HTMLInputElement>)=>void;
  placeHolder?:string;
}

const InputField = forwardRef<HTMLInputElement, InputFieldProps>(
  ({ label, name, type, className="", onChangeHandler, value, placeHolder="" }, ref) => {
    console.log("inputField")
    return (
      <div className={`label-container ${className}`}>
        <label htmlFor={name} className="input-label">
          {label}
        </label>
        <input className="input-field" ref={ref} name={name} type={type} onChange={onChangeHandler} value={value?.toString()} placeholder={placeHolder}/>
      </div>
    );
  }
);

export default React.memo(InputField);
