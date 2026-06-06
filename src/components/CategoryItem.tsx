import type { CategoryExpense } from '../types';
import {
  ShoppingCart,
  Laptop,
  UtensilsCrossed,
  Car,
} from 'lucide-react';

const iconMap: Record<string, React.ReactNode> = {
  ShoppingCart: <ShoppingCart size={18} />,
  Laptop: <Laptop size={18} />,
  UtensilsCrossed: <UtensilsCrossed size={18} />,
  Car: <Car size={18} />,
};

interface CategoryItemProps {
  item: CategoryExpense;
  index: number;
}

export default function CategoryItem({ item, index }: CategoryItemProps) {
  const formatAmount = (amount: number) => {
    const formatted = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
    }).format(Math.abs(amount));
    return `-${formatted}`;
  };

  return (
    <div
      id={`category-${item.id}`}
      className="flex items-center gap-3 px-4 py-3.5 hover:bg-primary-50/50 transition-colors duration-200 animate-fade-in-up cursor-pointer"
      style={{ animationDelay: `${(index + 3) * 80}ms` }}
    >
      {/* Icon */}
      <div
        className={`flex items-center justify-center w-11 h-11 rounded-full ${item.iconBg} ${item.iconColor} shrink-0`}
      >
        {iconMap[item.icon] ?? <ShoppingCart size={18} />}
      </div>

      {/* Name & Date */}
      <div className="flex-1 min-w-0">
        <p className="text-sm font-semibold text-text-primary truncate">
          {item.name}
        </p>
        <p className="text-xs text-text-muted mt-0.5">{item.date}</p>
      </div>

      {/* Amount */}
      <p className="text-sm font-bold text-danger shrink-0">
        {formatAmount(item.amount)}
      </p>
    </div>
  );
}
