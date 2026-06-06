import type { BalanceSummary, Transaction, WeeklyStats, CategoryExpense } from '../types';

// ─── Balance Summary ───
export const balanceSummary: BalanceSummary = {
  totalBalance: 3257.0,
  income: 2350.0,
  expenses: 950.0,
};

// ─── Transactions ───
export const transactions: Transaction[] = [
  {
    id: 'txn-001',
    name: 'Money Transfer',
    category: 'Transfer',
    amount: -450,
    date: 'Today',
    time: '12:35 PM',
    icon: 'ArrowUpRight',
    iconBg: 'bg-blue-100',
    iconColor: 'text-blue-600',
  },
  {
    id: 'txn-002',
    name: 'Paypal',
    category: 'Income',
    amount: 1200,
    date: 'Today',
    time: '10:20 AM',
    icon: 'Wallet',
    iconBg: 'bg-indigo-100',
    iconColor: 'text-indigo-600',
  },
  {
    id: 'txn-003',
    name: 'Uber',
    category: 'Transport',
    amount: -150,
    date: 'Today',
    time: '08:40 AM',
    icon: 'Car',
    iconBg: 'bg-gray-100',
    iconColor: 'text-gray-700',
  },
  {
    id: 'txn-004',
    name: 'Bata Store',
    category: 'Shopping',
    amount: -200,
    date: 'Yesterday',
    time: '04:15 PM',
    icon: 'ShoppingBag',
    iconBg: 'bg-red-100',
    iconColor: 'text-red-600',
  },
  {
    id: 'txn-005',
    name: 'Bank Transfer',
    category: 'Transfer',
    amount: -600,
    date: 'Yesterday',
    time: '02:30 PM',
    icon: 'Building2',
    iconBg: 'bg-purple-100',
    iconColor: 'text-purple-600',
  },
  {
    id: 'txn-006',
    name: 'Freelance Payment',
    category: 'Income',
    amount: 2500,
    date: 'Jun 03',
    time: '09:00 AM',
    icon: 'Briefcase',
    iconBg: 'bg-green-100',
    iconColor: 'text-green-600',
  },
  {
    id: 'txn-007',
    name: 'Netflix',
    category: 'Entertainment',
    amount: -15.99,
    date: 'Jun 02',
    time: '12:00 AM',
    icon: 'Tv',
    iconBg: 'bg-red-100',
    iconColor: 'text-red-500',
  },
  {
    id: 'txn-008',
    name: 'Grocery Store',
    category: 'Food',
    amount: -85.5,
    date: 'Jun 01',
    time: '06:30 PM',
    icon: 'Apple',
    iconBg: 'bg-emerald-100',
    iconColor: 'text-emerald-600',
  },
];

// ─── Weekly Statistics ───
export const weeklyStats: WeeklyStats[] = [
  { week: 'Week 1', income: 1800, expenses: 1200 },
  { week: 'Week 2', income: 2800, expenses: 2000 },
  { week: 'Week 3', income: 2200, expenses: 900 },
  { week: 'Week 4', income: 3200, expenses: 1500 },
];

// ─── Category Expenses ───
export const categoryExpenses: CategoryExpense[] = [
  {
    id: 'cat-001',
    name: 'Shopping',
    date: '30 Apr 2022',
    amount: -1550,
    icon: 'ShoppingCart',
    iconBg: 'bg-purple-100',
    iconColor: 'text-purple-600',
  },
  {
    id: 'cat-002',
    name: 'Laptop',
    date: '28 Apr 2022',
    amount: -1200,
    icon: 'Laptop',
    iconBg: 'bg-blue-100',
    iconColor: 'text-blue-600',
  },
  {
    id: 'cat-003',
    name: 'Food & Dining',
    date: '25 Apr 2022',
    amount: -680,
    icon: 'UtensilsCrossed',
    iconBg: 'bg-orange-100',
    iconColor: 'text-orange-600',
  },
  {
    id: 'cat-004',
    name: 'Transport',
    date: '20 Apr 2022',
    amount: -370,
    icon: 'Car',
    iconBg: 'bg-emerald-100',
    iconColor: 'text-emerald-600',
  },
];

// ─── Overview Totals ───
export const overviewTotals = {
  totalIncome: 8500,
  totalExpenses: 3800,
};
