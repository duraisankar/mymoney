import { LayoutGrid, Bell } from 'lucide-react';

interface HeaderProps {
  title: string;
}

export default function Header({ title }: HeaderProps) {
  return (
    <header
      id="app-header"
      className="flex items-center justify-between px-4 py-4 animate-fade-in"
    >
      <button
        id="header-menu"
        className="flex items-center justify-center w-10 h-10 rounded-xl hover:bg-primary-50 transition-colors duration-200 cursor-pointer"
        aria-label="Menu"
      >
        <LayoutGrid size={20} className="text-text-primary" />
      </button>

      <h1 className="text-lg font-semibold text-text-primary">{title}</h1>

      <button
        id="header-notifications"
        className="relative flex items-center justify-center w-10 h-10 rounded-xl hover:bg-primary-50 transition-colors duration-200 cursor-pointer"
        aria-label="Notifications"
      >
        <Bell size={20} className="text-text-primary" />
        {/* Notification dot */}
        <span className="absolute top-2 right-2 w-2 h-2 bg-danger rounded-full" />
      </button>
    </header>
  );
}
