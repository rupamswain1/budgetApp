import { ReactNode } from "react";


export interface NavButton{
    id:string,
    name:string,
    href:string,
    enabled:boolean,
    logo:ReactNode,
    onClick?:()=>void;
}
