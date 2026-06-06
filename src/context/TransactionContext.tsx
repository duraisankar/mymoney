import { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import type { BalanceSummary, Transaction, WeeklyStats, CategoryExpense } from '../types';
import {
  getBalanceSummary,
  getTransactions,
  getWeeklyStats,
  getCategoryExpenses,
  getOverviewTotals,
  createTransaction,
} from '../services/api';

interface TransactionContextType {
  balance: BalanceSummary | null;
  transactions: Transaction[];
  weeklyStats: WeeklyStats[];
  categories: CategoryExpense[];
  overviewTotals: { totalIncome: number; totalExpenses: number } | null;
  loading: boolean;
  refreshData: () => Promise<void>;
  addTransaction: (data: Omit<Transaction, 'id' | 'createdAt'>) => Promise<boolean>;
}

const TransactionContext = createContext<TransactionContextType | undefined>(undefined);

export function TransactionProvider({ children }: { children: ReactNode }) {
  const [balance, setBalance] = useState<BalanceSummary | null>(null);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [weeklyStats, setWeeklyStats] = useState<WeeklyStats[]>([]);
  const [categories, setCategories] = useState<CategoryExpense[]>([]);
  const [overviewTotals, setOverviewTotals] = useState<{ totalIncome: number; totalExpenses: number } | null>(null);
  const [loading, setLoading] = useState(true);

  const refreshData = async () => {
    try {
      const [balanceData, txnData, statsData, catData, totalsData] = await Promise.all([
        getBalanceSummary(),
        getTransactions(),
        getWeeklyStats(),
        getCategoryExpenses(),
        getOverviewTotals(),
      ]);
      setBalance(balanceData);
      setTransactions(txnData);
      setWeeklyStats(statsData);
      setCategories(catData);
      setOverviewTotals(totalsData);
    } catch (error) {
      console.error('Failed to fetch data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    refreshData();
  }, []);

  const addTransaction = async (data: Omit<Transaction, 'id' | 'createdAt'>) => {
    try {
      const success = await createTransaction(data);
      if (success) {
        await refreshData();
        return true;
      }
      return false;
    } catch (error) {
      console.error('Failed to add transaction:', error);
      return false;
    }
  };

  return (
    <TransactionContext.Provider
      value={{
        balance,
        transactions,
        weeklyStats,
        categories,
        overviewTotals,
        loading,
        refreshData,
        addTransaction,
      }}
    >
      {children}
    </TransactionContext.Provider>
  );
}

export function useTransactions() {
  const context = useContext(TransactionContext);
  if (context === undefined) {
    throw new Error('useTransactions must be used within a TransactionProvider');
  }
  return context;
}
