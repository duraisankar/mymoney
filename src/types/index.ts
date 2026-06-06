// ─── Transaction ───
export interface Transaction {
  id: string;
  name: string;
  category: string;
  amount: number; // negative = expense, positive = income
  date: string;
  time: string;
  icon: string; // Lucide icon name
  iconBg: string; // Tailwind bg color class
  iconColor: string; // Tailwind text color class
}

// ─── Balance Summary ───
export interface BalanceSummary {
  totalBalance: number;
  income: number;
  expenses: number;
}

// ─── Weekly Statistics ───
export interface WeeklyStats {
  week: string;
  income: number;
  expenses: number;
}

// ─── Category Expense ───
export interface CategoryExpense {
  id: string;
  name: string;
  date: string;
  amount: number;
  icon: string;
  iconBg: string;
  iconColor: string;
}

// ─── Navigation Tab ───
export interface NavTab {
  id: string;
  label: string;
  icon: string;
  path: string;
}
