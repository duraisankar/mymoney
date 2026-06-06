/**
 * API Service Layer
 *
 * Connects to the Cloudflare Worker endpoints.
 */

import type {
  BalanceSummary,
  Transaction,
  WeeklyStats,
  CategoryExpense,
} from '../types';

/**
 * Fetch the balance summary (total balance, income, expenses).
 */
export async function getBalanceSummary(): Promise<BalanceSummary> {
  const res = await fetch('/api/balance');
  if (!res.ok) throw new Error('Failed to fetch balance summary');
  return res.json();
}

/**
 * Fetch the list of recent transactions.
 */
export async function getTransactions(): Promise<Transaction[]> {
  const res = await fetch('/api/transactions');
  if (!res.ok) throw new Error('Failed to fetch transactions');
  return res.json();
}

/**
 * Fetch weekly statistics for the bar chart.
 */
export async function getWeeklyStats(): Promise<WeeklyStats[]> {
  const res = await fetch('/api/stats/weekly');
  if (!res.ok) throw new Error('Failed to fetch weekly stats');
  return res.json();
}

/**
 * Fetch category-level expense breakdown.
 */
export async function getCategoryExpenses(): Promise<CategoryExpense[]> {
  const res = await fetch('/api/expenses/categories');
  if (!res.ok) throw new Error('Failed to fetch category expenses');
  return res.json();
}

/**
 * Fetch overview totals (total income & total expenses).
 */
export async function getOverviewTotals(): Promise<{
  totalIncome: number;
  totalExpenses: number;
}> {
  const res = await fetch('/api/overview');
  if (!res.ok) throw new Error('Failed to fetch overview totals');
  return res.json();
}

/**
 * Create a new transaction.
 */
export async function createTransaction(
  transaction: Omit<Transaction, 'id' | 'createdAt'>
): Promise<boolean> {
  const res = await fetch('/api/transactions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(transaction),
  });
  return res.ok;
}

