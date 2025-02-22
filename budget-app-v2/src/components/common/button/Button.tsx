import React from "react";
import { itemType, ITEM_TYPES } from "$interfaces";
interface ButtonProps{
    name:string;
    type:"primary"|"secondary";
    isEnabled:boolean;
    onClick:()=>void;
    className?:string
}

const Button:React.FC<ButtonProps> = ({
    name,
    type="primary",
    isEnabled,
    onClick,
    className
}) =>{
    return <button className={`${type} ${className} ${!isEnabled && 'btn-disabled'}`} onClick={onClick}>
        {name}
    </button>
}

export default Button