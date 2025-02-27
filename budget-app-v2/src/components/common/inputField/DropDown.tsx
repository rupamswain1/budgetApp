import "./input.style.scss";
import React, { forwardRef } from "react";

interface DropdownProps {
  label: string;
  name: string;
  options: string[];
  className?: string;
}

const Dropdown = forwardRef<HTMLSelectElement, DropdownProps>(
  ({ label, name, className = "", options }, ref) => {
    console.log("Dropdown")
    return (
      <div className={`label-container select-container ${className}`}>
        <label htmlFor={name} className="input-label">
          {label}
        </label>
        <select className="input-field" ref={ref} name={name}>
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

export default Dropdown;
