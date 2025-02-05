import {NavButton} from "$interfaces";
import { IoHomeOutline } from "react-icons/io5";
import { FaChartLine } from "react-icons/fa";
import { LuRepeat2 } from "react-icons/lu";
import { CiSettings } from "react-icons/ci";

import './navbar.style.scss';
const NavBar = () =>{
    const navItems:NavButton[] = [
        {
            id:"home",
            name:"Home",
            href:"",
            enabled:true,
            logo:<IoHomeOutline/>
        },
        {
            id:"report",
            name:"Reports",
            href:"",
            enabled:false,
            logo:<FaChartLine />
        },
        {
            id:"autopay",
            name:"AutoPay",
            href:"",
            enabled:false,
            logo:<LuRepeat2 />
        },
        {
            id:"settings",
            name:"Settings",
            href:"",
            enabled:false,
            logo:<CiSettings />
        },
    ]
   return <nav className="nav-container">
        {
            navItems.map((item,index)=>{
                return <>
                {index === 2 && <div>Mid</div>}
                
                <button key={item.id}>
                    <div>
                        <div>{item.logo}</div>
                        <div>{item.name}</div>
                    </div>
                </button>
                </>
            })
        }
    </nav>
}

export default NavBar;