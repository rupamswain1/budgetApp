import "./input.style.scss";
import React, { forwardRef } from "react";

interface DropdownProps {
  label: string;
  name: string;
  options: string[];
  className?: string;
  value: string;
  onChangeHandler: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

const Dropdown = forwardRef<HTMLSelectElement, DropdownProps>(
  ({ label, name, className = "", options, value, onChangeHandler }, ref) => {
    console.log("Dropdown");
    return (
      <div className={`label-container select-container ${className}`}>
        <label htmlFor={name} className="input-label">
          {label}
        </label>
        <select
          className="input-field dropdown-input"
          ref={ref}
          name={name}
          value={value}
          onChange={onChangeHandler}
        >
          <option value="" disabled>
            Select...
          </option>
          {options.map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>
      </div>
    );
  }
);

export default React.memo(Dropdown);
