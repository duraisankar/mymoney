import type { Transaction } from '../types';
import {
  ArrowUpRight,
  Wallet,
  Car,
  ShoppingBag,
  Building2,
  Briefcase,
  Tv,
  Apple,
} from 'lucide-react';

// Map icon names to Lucide components
const iconMap: Record<string, React.ReactNode> = {
  ArrowUpRight: <ArrowUpRight size={18} />,
  Wallet: <Wallet size={18} />,
  Car: <Car size={18} />,
  ShoppingBag: <ShoppingBag size={18} />,
  Building2: <Building2 size={18} />,
  Briefcase: <Briefcase size={18} />,
  Tv: <Tv size={18} />,
  Apple: <Apple size={18} />,
};

interface TransactionItemProps {
  transaction: Transaction;
  index: number;
}

export default function TransactionItem({
  transaction,
  index,
}: TransactionItemProps) {
  const isIncome = transaction.amount > 0;

  const formatAmount = (amount: number) => {
    const formatted = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 2,
    }).format(Math.abs(amount));
    return isIncome ? `+${formatted}` : `-${formatted}`;
  };

  return (
    <div
      id={`transaction-${transaction.id}`}
      className="flex items-center gap-3 px-4 py-3.5 hover:bg-primary-50/50 transition-colors duration-200 animate-fade-in-up cursor-pointer"
      style={{ animationDelay: `${index * 80}ms` }}
    >
      {/* Icon */}
      <div
        className={`flex items-center justify-center w-11 h-11 rounded-full ${transaction.iconBg} ${transaction.iconColor} shrink-0`}
      >
        {iconMap[transaction.icon] ?? <Wallet size={18} />}
      </div>

      {/* Name & Time */}
      <div className="flex-1 min-w-0">
        <p className="text-sm font-semibold text-text-primary truncate">
          {transaction.name}
        </p>
        <p className="text-xs text-text-muted mt-0.5">{transaction.time}</p>
      </div>

      {/* Amount */}
      <p
        className={`text-sm font-bold shrink-0 ${
          isIncome ? 'text-success' : 'text-danger'
        }`}
      >
        {formatAmount(transaction.amount)}
      </p>
    </div>
  );
}
