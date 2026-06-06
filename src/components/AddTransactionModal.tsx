import { useState } from 'react';
import { X, UtensilsCrossed, ShoppingBag, Car, Tv, Briefcase, Zap, Coins } from 'lucide-react';
import { useTransactions } from '../context/TransactionContext';

interface AddTransactionModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface CategoryOption {
  name: string;
  iconName: string;
  icon: React.ReactNode;
  bgClass: string;
  textClass: string;
}

const CATEGORIES: CategoryOption[] = [
  { name: 'Food', iconName: 'UtensilsCrossed', icon: <UtensilsCrossed size={20} />, bgClass: 'bg-orange-100', textClass: 'text-orange-600' },
  { name: 'Shopping', iconName: 'ShoppingBag', icon: <ShoppingBag size={20} />, bgClass: 'bg-red-100', textClass: 'text-red-600' },
  { name: 'Transport', iconName: 'Car', icon: <Car size={20} />, bgClass: 'bg-emerald-100', textClass: 'text-emerald-600' },
  { name: 'Entertainment', iconName: 'Tv', icon: <Tv size={20} />, bgClass: 'bg-purple-100', textClass: 'text-purple-600' },
  { name: 'Salary', iconName: 'Briefcase', icon: <Briefcase size={20} />, bgClass: 'bg-green-100', textClass: 'text-green-600' },
  { name: 'Utilities', iconName: 'Zap', icon: <Zap size={20} />, bgClass: 'bg-yellow-100', textClass: 'text-yellow-600' },
  { name: 'Other', iconName: 'Coins', icon: <Coins size={20} />, bgClass: 'bg-blue-100', textClass: 'text-blue-600' },
];

export default function AddTransactionModal({ isOpen, onClose }: AddTransactionModalProps) {
  const { addTransaction } = useTransactions();
  
  const [type, setType] = useState<'income' | 'expense'>('expense');
  const [amount, setAmount] = useState('');
  const [name, setName] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<CategoryOption>(CATEGORIES[0]);
  const [date, setDate] = useState(() => new Date().toISOString().split('T')[0]);
  const [time, setTime] = useState(() => {
    const d = new Date();
    return `${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')}`;
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    const parsedAmount = parseFloat(amount);
    if (isNaN(parsedAmount) || parsedAmount <= 0) {
      setErrorMsg('Please enter a valid amount greater than 0.');
      return;
    }

    if (!name.trim()) {
      setErrorMsg('Please enter a description/title.');
      return;
    }

    setIsSubmitting(true);

    // negative amount for expense, positive for income
    const finalAmount = type === 'expense' ? -parsedAmount : parsedAmount;

    // format time to AM/PM for UI compatibility
    let formattedTime = time;
    try {
      const [hours, minutes] = time.split(':');
      const h = parseInt(hours, 10);
      const ampm = h >= 12 ? 'PM' : 'AM';
      const displayHours = h % 12 || 12;
      formattedTime = `${displayHours}:${minutes} ${ampm}`;
    } catch {
      // fallback to input time
    }

    const success = await addTransaction({
      name: name.trim(),
      category: selectedCategory.name,
      amount: finalAmount,
      date,
      time: formattedTime,
      icon: selectedCategory.iconName,
      iconBg: selectedCategory.bgClass,
      iconColor: selectedCategory.textClass,
    });

    setIsSubmitting(false);

    if (success) {
      // reset form
      setAmount('');
      setName('');
      setSelectedCategory(CATEGORIES[0]);
      setType('expense');
      onClose();
    } else {
      setErrorMsg('Failed to save transaction. Please try again.');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/40 backdrop-blur-xs animate-fade-in">
      {/* Click outside to close */}
      <div className="absolute inset-0" onClick={onClose} />

      {/* Modal Sheet */}
      <div className="relative w-full max-w-[430px] bg-white rounded-t-3xl shadow-xl z-10 flex flex-col max-h-[90vh] overflow-y-auto animate-slide-up border-t border-gray-100">
        
        {/* Drag handle decorator */}
        <div className="mx-auto my-3 w-12 h-1.5 rounded-full bg-gray-200" />

        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 pb-2">
          <h3 className="text-xl font-bold text-gray-900">Add Transaction</h3>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full bg-gray-100 text-gray-500 hover:bg-gray-200 transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X size={18} />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="px-6 pb-8 flex flex-col gap-5">
          
          {/* Income/Expense Toggle */}
          <div className="flex bg-gray-100 p-1 rounded-2xl">
            <button
              type="button"
              onClick={() => setType('expense')}
              className={`flex-1 py-2.5 text-sm font-semibold rounded-xl transition-all duration-200 cursor-pointer ${
                type === 'expense'
                  ? 'bg-danger text-white shadow-sm'
                  : 'text-gray-500 hover:text-gray-900'
              }`}
            >
              Expense
            </button>
            <button
              type="button"
              onClick={() => setType('income')}
              className={`flex-1 py-2.5 text-sm font-semibold rounded-xl transition-all duration-200 cursor-pointer ${
                type === 'income'
                  ? 'bg-success text-white shadow-sm'
                  : 'text-gray-500 hover:text-gray-900'
              }`}
            >
              Income
            </button>
          </div>

          {/* Amount Input */}
          <div className="flex flex-col items-center justify-center py-4 bg-gray-50 rounded-2xl border border-gray-100">
            <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">
              Amount
            </span>
            <div className="flex items-center text-3xl font-extrabold text-gray-900">
              <span className="mr-1 text-gray-400">$</span>
              <input
                type="number"
                step="any"
                placeholder="0.00"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="w-40 text-center bg-transparent border-b-2 border-transparent focus:border-primary-500 outline-none pb-1 font-bold"
                required
                autoFocus
              />
            </div>
          </div>

          {/* Error Message */}
          {errorMsg && (
            <div className="text-center text-xs font-medium text-danger bg-red-50 p-2.5 rounded-xl border border-red-100">
              {errorMsg}
            </div>
          )}

          {/* Description Input */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">
              Description
            </label>
            <input
              type="text"
              placeholder="e.g. Netflix subscription, Salary"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm font-medium text-gray-900 focus:bg-white focus:border-primary-500 outline-none transition-all"
              required
            />
          </div>

          {/* Category Selector */}
          <div className="flex flex-col gap-2">
            <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">
              Category
            </label>
            <div className="grid grid-cols-4 gap-2.5">
              {CATEGORIES.map((cat) => {
                const isSelected = selectedCategory.name === cat.name;
                return (
                  <button
                    key={cat.name}
                    type="button"
                    onClick={() => setSelectedCategory(cat)}
                    className={`flex flex-col items-center gap-1.5 p-2.5 rounded-xl border transition-all duration-200 cursor-pointer ${
                      isSelected
                        ? 'border-primary-500 bg-primary-50/50 shadow-sm scale-102'
                        : 'border-gray-200 bg-white hover:bg-gray-50'
                    }`}
                  >
                    <div className={`p-2 rounded-lg ${cat.bgClass} ${cat.textClass}`}>
                      {cat.icon}
                    </div>
                    <span className="text-[10px] font-bold text-gray-700 truncate w-full text-center">
                      {cat.name}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Date & Time Picker */}
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">
                Date
              </label>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full px-3 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs font-medium text-gray-900 focus:bg-white focus:border-primary-500 outline-none"
                required
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">
                Time
              </label>
              <input
                type="time"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                className="w-full px-3 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs font-medium text-gray-900 focus:bg-white focus:border-primary-500 outline-none"
                required
              />
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full py-3.5 mt-2 rounded-xl text-sm font-bold text-white shadow-button transition-all duration-200 cursor-pointer active:scale-98 ${
              type === 'expense'
                ? 'bg-danger hover:bg-red-600 shadow-red-200'
                : 'bg-success hover:bg-emerald-600 shadow-emerald-200'
            } disabled:opacity-50`}
          >
            {isSubmitting ? (
              <span className="flex items-center justify-center gap-2">
                <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Saving...
              </span>
            ) : (
              `Save ${type === 'expense' ? 'Expense' : 'Income'}`
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
