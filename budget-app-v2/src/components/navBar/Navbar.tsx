import { NavButton } from '$interfaces';
import { IoHomeOutline } from 'react-icons/io5';
import { FaChartLine } from 'react-icons/fa';
import { LuRepeat2 } from 'react-icons/lu';
import { CiSettings } from 'react-icons/ci';
import { LuReceiptIndianRupee } from 'react-icons/lu';
import { AddExpenses, DummyButton, IconButton } from '$components';

import './navbar.style.scss';
import { QuickAddExpenses } from '$pages';
import { useLocation, useNavigate } from 'react-router';
import { ROUTES } from '$constants';
const NavBar = () => {
  const location = useLocation().pathname;
  const navigate = useNavigate();
  const navItems: NavButton[] = [
    {
      id: 'home',
      name: 'Home',
      href: '',
      enabled: true,
      logo: IoHomeOutline,
      route: ROUTES.HOME,
    },
    {
      id: 'report',
      name: 'Reports',
      href: '',
      enabled: true,
      logo: FaChartLine,
      route: ROUTES.REPORTS,
    },
    {
      id: 'add',
      name: 'Add Expense',
      href: '',
      enabled: true,
      logo: LuReceiptIndianRupee,
      route: '',
    },
    {
      id: 'autopay',
      name: 'AutoPay',
      href: '',
      enabled: false,
      logo: LuRepeat2,
      route: ROUTES.AUTOPAY,
    },
    {
      id: 'settings',
      name: 'Settings',
      href: '',
      enabled: true,
      logo: CiSettings,
      route: ROUTES.SETTINGS,
    },
  ];

  console.log('Navbar');
  return (
    <nav className="nav-container">
      {navItems.map((item) => {
        return (
          <>
            {item.id === 'add' && (
              <QuickAddExpenses>
                <AddExpenses />
              </QuickAddExpenses>
            )}
            {item.id !== 'add' ? (
              <IconButton
                id={item.id}
                isActive={location === item.route}
                Icon={item.logo}
                name={item.name}
                isDisabled={!item.enabled}
                handleClick={() => navigate(item.route)}
              />
            ) : (
              <DummyButton />
            )}
          </>
        );
      })}
    </nav>
  );
};

export default NavBar;
