import { useState } from 'react';
import Header from '../components/Header';
import StatCard from '../components/StatCard';
import StatsChart from '../components/StatsChart';
import CategoryItem from '../components/CategoryItem';
import { useTransactions } from '../context/TransactionContext';

type TabType = 'income' | 'expenses';

export default function OverviewPage() {
  const { overviewTotals: totals, weeklyStats, categories, loading } = useTransactions();
  const [activeTab, setActiveTab] = useState<TabType>('expenses');

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
