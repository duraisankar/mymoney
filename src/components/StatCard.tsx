interface StatCardProps {
  label: string;
  amount: number;
  color: 'blue' | 'red';
}

export default function StatCard({ label, amount, color }: StatCardProps) {
  const formatCurrency = (value: number) =>
    new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
    }).format(value);

  return (
    <div
      id={`stat-card-${label.toLowerCase().replace(/\s+/g, '-')}`}
      className="flex-1 bg-white rounded-2xl p-4 border border-gray-200 hover:shadow-card-hover transition-shadow duration-300"
    >
      <p className="text-xs font-medium text-text-secondary mb-2">{label}</p>
      <div className="flex items-center gap-2">
        <span
          className={`w-2.5 h-2.5 rounded-full ${
            color === 'blue' ? 'bg-primary-500' : 'bg-danger'
          }`}
        />
        <p className="text-lg font-bold text-text-primary">
          {formatCurrency(amount)}
        </p>
      </div>
    </div>
  );
}
