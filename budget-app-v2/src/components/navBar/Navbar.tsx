import { NavButton } from "$interfaces";
import { IoHomeOutline } from "react-icons/io5";
import { FaChartLine } from "react-icons/fa";
import { LuRepeat2 } from "react-icons/lu";
import { CiSettings } from "react-icons/ci";
import { LuReceiptIndianRupee } from "react-icons/lu";
import { DummyButton, IconButton } from "$components";

import "./navbar.style.scss";
const NavBar = () => {
  const navItems: NavButton[] = [
    {
      id: "home",
      name: "Home",
      href: "",
      enabled: true,
      logo: IoHomeOutline,
    },
    {
      id: "report",
      name: "Reports",
      href: "",
      enabled: false,
      logo: FaChartLine,
    },
    {
      id: "add",
      name: "Add Expense",
      href: "",
      enabled: true,
      logo: LuReceiptIndianRupee,
    },
    {
      id: "autopay",
      name: "AutoPay",
      href: "",
      enabled: false,
      logo: LuRepeat2,
    },
    {
      id: "settings",
      name: "Settings",
      href: "",
      enabled: false,
      logo: CiSettings,
    },
  ];
  return (
    <nav className="nav-container">
      {navItems.map((item) => {
        return (
          <>
            {item.id === "add" && (
                <IconButton
                id={item.id}
                isActive={false}
                Icon={item.logo}
                name={item.name}
                customClass="center-btn nav-btn-selected"
                isNameVisible = {false}
              />
            )}
            {item.id !== "add" ? (
              <IconButton
                id={item.id}
                isActive={false}
                Icon={item.logo}
                name={item.name}
              />
            ) : (
              <DummyButton/>
            )}
          </>
        );
      })}
    </nav>
  );
};

export default NavBar;
