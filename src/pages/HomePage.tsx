import { useState, useEffect } from 'react';
import Header from '../components/Header';
import BalanceCard from '../components/BalanceCard';
import TransactionItem from '../components/TransactionItem';
import { getBalanceSummary, getTransactions } from '../services/api';
import type { BalanceSummary, Transaction } from '../types';

export default function HomePage() {
  const [balance, setBalance] = useState<BalanceSummary | null>(null);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const [balanceData, txnData] = await Promise.all([
          getBalanceSummary(),
          getTransactions(),
        ]);
        setBalance(balanceData);
        setTransactions(txnData);
      } catch (error) {
        console.error('Failed to fetch home data:', error);
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
    <div id="home-page" className="flex-1 pb-4">
      <Header title="Home" />

      {/* Balance Card */}
      {balance && <BalanceCard data={balance} />}

      {/* Transactions Section */}
      <div className="mt-6 animate-fade-in-up delay-200">
        {/* Section Header */}
        <div className="flex items-center justify-between px-5 mb-2">
          <h2 className="text-base font-bold text-text-primary">
            Transactions
          </h2>
          <button
            id="see-all-transactions"
            className="text-xs font-medium text-text-muted hover:text-primary-600 transition-colors cursor-pointer"
          >
            See All
          </button>
        </div>

        {/* Transaction List */}
        <div className="divide-y divide-gray-50">
          {transactions.map((txn, index) => (
            <TransactionItem
              key={txn.id}
              transaction={txn}
              index={index}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
