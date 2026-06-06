import { useState, useEffect } from 'react';
import Header from '../components/Header';
import StatCard from '../components/StatCard';
import StatsChart from '../components/StatsChart';
import CategoryItem from '../components/CategoryItem';
import {
  getOverviewTotals,
  getWeeklyStats,
  getCategoryExpenses,
} from '../services/api';
import type { WeeklyStats, CategoryExpense } from '../types';

type TabType = 'income' | 'expenses';

export default function OverviewPage() {
  const [totals, setTotals] = useState<{
    totalIncome: number;
    totalExpenses: number;
  } | null>(null);
  const [weeklyStats, setWeeklyStats] = useState<WeeklyStats[]>([]);
  const [categories, setCategories] = useState<CategoryExpense[]>([]);
  const [activeTab, setActiveTab] = useState<TabType>('expenses');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const [totalsData, statsData, catData] = await Promise.all([
          getOverviewTotals(),
          getWeeklyStats(),
          getCategoryExpenses(),
        ]);
        setTotals(totalsData);
        setWeeklyStats(statsData);
        setCategories(catData);
      } catch (error) {
        console.error('Failed to fetch overview data:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <div className="w-8 h-8 border-3 border-primary-200 border-t-primary-600 rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div id="overview-page" className="flex-1 pb-4">
      <Header title="Overview" />

      {/* Stat Cards */}
      {totals && (
        <div className="flex gap-3 px-4 mb-5 animate-scale-in">
          <StatCard
            label="Total Income"
            amount={totals.totalIncome}
            color="blue"
          />
          <StatCard
            label="Total Expenses"
            amount={totals.totalExpenses}
            color="red"
          />
        </div>
      )}

      {/* Statistics Chart */}
      <StatsChart data={weeklyStats} />

      {/* Income / Expenses Toggle */}
      <div className="flex mx-4 mt-5 mb-4 rounded-full overflow-hidden border border-gray-200 animate-fade-in-up delay-300">
        <button
          id="tab-income"
          onClick={() => setActiveTab('income')}
          className={`flex-1 py-3 text-sm font-semibold transition-all duration-300 cursor-pointer ${
            activeTab === 'income'
              ? 'bg-white text-text-primary'
              : 'bg-gray-50 text-text-muted hover:text-text-secondary'
          }`}
        >
          Income
        </button>
        <button
          id="tab-expenses"
          onClick={() => setActiveTab('expenses')}
          className={`flex-1 py-3 text-sm font-semibold rounded-full transition-all duration-300 cursor-pointer ${
            activeTab === 'expenses'
              ? 'bg-accent-500 text-white'
              : 'bg-gray-50 text-text-muted hover:text-text-secondary'
          }`}
        >
          Expenses
        </button>
      </div>

      {/* Category List */}
      <div>
        {activeTab === 'expenses' ? (
          categories.map((cat, index) => (
            <CategoryItem key={cat.id} item={cat} index={index} />
          ))
        ) : (
          <div className="px-4 py-8 text-center text-sm text-text-muted">
            Income breakdown coming soon
          </div>
        )}
      </div>
    </div>
  );
}
