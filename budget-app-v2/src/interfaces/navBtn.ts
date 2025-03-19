import { IconType } from "react-icons";


export interface NavButton{
    id:string,
    name:string,
    href:string,
    enabled:boolean,
    logo:IconType,
    onClick?:()=>void;
    route:string;
}
