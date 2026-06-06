/**
 * API Service Layer
 *
 * Currently returns mock data. When connecting to a real API,
 * replace the implementations below with actual fetch() calls.
 * The function signatures stay the same — no component changes needed.
 */

import type {
  BalanceSummary,
  Transaction,
  WeeklyStats,
  CategoryExpense,
} from '../types';

import {
  balanceSummary,
  transactions,
  weeklyStats,
  categoryExpenses,
  overviewTotals,
} from '../data/mockData';

// Simulate network delay for realistic loading states
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

/**
 * Fetch the balance summary (total balance, income, expenses).
 */
export async function getBalanceSummary(): Promise<BalanceSummary> {
  await delay(300);
  // TODO: Replace with → fetch('/api/balance').then(r => r.json())
  return balanceSummary;
}

/**
 * Fetch the list of recent transactions.
 */
export async function getTransactions(): Promise<Transaction[]> {
  await delay(400);
  // TODO: Replace with → fetch('/api/transactions').then(r => r.json())
  return transactions;
}

/**
 * Fetch weekly statistics for the bar chart.
 */
export async function getWeeklyStats(): Promise<WeeklyStats[]> {
  await delay(350);
  // TODO: Replace with → fetch('/api/stats/weekly').then(r => r.json())
  return weeklyStats;
}

/**
 * Fetch category-level expense breakdown.
 */
export async function getCategoryExpenses(): Promise<CategoryExpense[]> {
  await delay(300);
  // TODO: Replace with → fetch('/api/expenses/categories').then(r => r.json())
  return categoryExpenses;
}

/**
 * Fetch overview totals (total income & total expenses).
 */
export async function getOverviewTotals(): Promise<{
  totalIncome: number;
  totalExpenses: number;
}> {
  await delay(250);
  // TODO: Replace with → fetch('/api/overview').then(r => r.json())
  return overviewTotals;
}
