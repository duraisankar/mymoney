import { ArrowDownLeft, ArrowUpRight, MoreHorizontal, ChevronDown } from 'lucide-react';
import type { BalanceSummary } from '../types';

interface BalanceCardProps {
  data: BalanceSummary;
}

export default function BalanceCard({ data }: BalanceCardProps) {
  const formatCurrency = (amount: number) =>
    new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
    }).format(amount);

  return (
    <div
      id="balance-card"
      className="mx-4 rounded-3xl bg-gradient-to-br from-primary-600 via-primary-500 to-primary-400 p-5 text-white shadow-balance animate-scale-in"
    >
      {/* Top Row */}
      <div className="flex items-center justify-between mb-2">
        <button
          id="balance-type-selector"
          className="flex items-center gap-1 text-sm text-white/80 hover:text-white transition-colors cursor-pointer"
        >
          Total Balance
          <ChevronDown size={14} />
        </button>
        <button
          id="balance-menu"
          className="flex items-center justify-center w-8 h-8 rounded-lg hover:bg-white/10 transition-colors cursor-pointer"
          aria-label="Balance options"
        >
          <MoreHorizontal size={18} />
        </button>
      </div>

      {/* Balance Amount */}
      <p className="text-3xl font-bold tracking-tight mb-5">
        {formatCurrency(data.totalBalance)}
      </p>

      {/* Income / Expenses Row */}
      <div className="flex items-center gap-8">
        {/* Income */}
        <div className="flex items-center gap-2.5">
          <div className="flex items-center justify-center w-8 h-8 rounded-full bg-white/15">
            <ArrowDownLeft size={14} />
          </div>
          <div>
            <p className="text-xs text-white/70">Income</p>
            <p className="text-sm font-semibold">
              {formatCurrency(data.income)}
            </p>
          </div>
        </div>

        {/* Expenses */}
        <div className="flex items-center gap-2.5">
          <div className="flex items-center justify-center w-8 h-8 rounded-full bg-white/15">
            <ArrowUpRight size={14} />
          </div>
          <div>
            <p className="text-xs text-white/70">Expenses</p>
            <p className="text-sm font-semibold">
              {formatCurrency(data.expenses)}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
