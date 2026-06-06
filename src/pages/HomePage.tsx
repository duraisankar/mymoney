import Header from '../components/Header';
import BalanceCard from '../components/BalanceCard';
import TransactionItem from '../components/TransactionItem';
import { useTransactions } from '../context/TransactionContext';

export default function HomePage() {
  const { balance, transactions, loading } = useTransactions();

  if (loading) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <div className="w-8 h-8 border-3 border-primary-200 border-t-primary-600 rounded-full animate-spin" />
      </div>
    );
  }

  // Show only the first 5 transactions on the home screen (like the UX mock)
  const visibleTransactions = transactions.slice(0, 5);

  return (
    <div id="home-page" className="flex-1 pb-4">
      <Header title="Home" />

      {/* Balance Card */}
      {balance && <BalanceCard data={balance} />}

      {/* Transactions Section */}
      <div className="mt-8 animate-fade-in-up delay-200">
        {/* Section Header */}
        <div className="flex items-center justify-between px-4 mb-3">
          <h2 className="text-lg font-bold text-text-primary">
            Transactions
          </h2>
          <button
            id="see-all-transactions"
            className="text-sm font-medium text-text-secondary hover:text-primary-600 transition-colors cursor-pointer"
          >
            See All
          </button>
        </div>

        {/* Transaction List */}
        <div>
          {visibleTransactions.map((txn, index) => (
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
