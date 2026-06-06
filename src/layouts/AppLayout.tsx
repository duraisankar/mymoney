import { useState } from 'react';
import { Outlet } from 'react-router';
import BottomNav from '../components/BottomNav';
import AddTransactionModal from '../components/AddTransactionModal';

export default function AppLayout() {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  return (
    <div
      id="app-layout"
      className="relative w-full max-w-[430px] min-h-dvh bg-white flex flex-col"
    >
      {/* Page Content */}
      <main className="flex-1 pb-20 overflow-y-auto overflow-x-hidden">
        <Outlet />
      </main>

      {/* Bottom Navigation */}
      <BottomNav onAddClick={() => setIsAddModalOpen(true)} />

      {/* Add Transaction Modal */}
      <AddTransactionModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
      />
    </div>
  );
}
