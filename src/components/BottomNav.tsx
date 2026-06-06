import { useLocation, useNavigate } from 'react-router';
import {
  Home,
  BarChart3,
  Plus,
  Wallet,
  User,
} from 'lucide-react';

interface NavItem {
  id: string;
  label: string;
  icon: React.ReactNode;
  path: string;
}

const navItems: NavItem[] = [
  { id: 'home', label: 'Home', icon: <Home size={22} />, path: '/home' },
  { id: 'stats', label: 'Stats', icon: <BarChart3 size={22} />, path: '/overview' },
  { id: 'add', label: 'Add', icon: <Plus size={24} strokeWidth={2.5} />, path: '#' },
  { id: 'wallet', label: 'Wallet', icon: <Wallet size={22} />, path: '/home' },
  { id: 'profile', label: 'Profile', icon: <User size={22} />, path: '/home' },
];

interface BottomNavProps {
  onAddClick?: () => void;
}

export default function BottomNav({ onAddClick }: BottomNavProps) {
  const location = useLocation();
  const navigate = useNavigate();

  const handleNavClick = (item: NavItem) => {
    if (item.id === 'add') {
      onAddClick?.();
      return;
    }
    navigate(item.path);
  };

  return (
    <nav
      id="bottom-nav"
      className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[430px] bg-gray-50/95 backdrop-blur-lg border-t border-gray-200 z-50"
      style={{ paddingBottom: 'var(--spacing-safe-bottom)' }}
    >
      <div className="flex items-center justify-around px-2 pt-2 pb-3">
        {navItems.map((item) => {
          const isActive =
            item.id !== 'add' && location.pathname === item.path;
          const isFab = item.id === 'add';

          if (isFab) {
            return (
              <button
                key={item.id}
                id="fab-add-transaction"
                onClick={() => handleNavClick(item)}
                className="relative -mt-8 flex items-center justify-center w-14 h-14 rounded-full bg-gradient-to-br from-primary-500 to-primary-700 text-white shadow-fab active:scale-95 transition-transform duration-150 cursor-pointer"
                aria-label="Add transaction"
              >
                {item.icon}
              </button>
            );
          }

          return (
            <button
              key={item.id}
              id={`nav-${item.id}`}
              onClick={() => handleNavClick(item)}
              className={`relative flex flex-col items-center gap-0.5 px-3 py-1.5 rounded-xl transition-colors duration-200 cursor-pointer ${
                isActive
                  ? 'text-primary-600'
                  : 'text-gray-400 hover:text-gray-600'
              }`}
              aria-label={item.label}
              aria-current={isActive ? 'page' : undefined}
            >
              {item.icon}
              <span className="text-[10px] font-medium">{item.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
