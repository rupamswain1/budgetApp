import './input.style.scss';
import React, { forwardRef } from 'react';

interface InputFieldProps {
    label:string,
    name:string,
}

const InputField = forwardRef<HTMLInputElement, InputFieldProps>(({label,name},ref) =>{
    return <>
    <label htmlFor={name}>{label}</label>
    <input ref={ref} name={name}/>
    </>
})

export default InputField;