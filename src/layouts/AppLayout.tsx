import { Outlet } from 'react-router';
import BottomNav from '../components/BottomNav';

export default function AppLayout() {
  return (
    <div
      id="app-layout"
      className="relative w-full max-w-[430px] min-h-dvh bg-surface-bg flex flex-col"
    >
      {/* Page Content */}
      <main className="flex-1 pb-20 overflow-y-auto">
        <Outlet />
      </main>

      {/* Bottom Navigation */}
      <BottomNav />
    </div>
  );
}
