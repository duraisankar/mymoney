import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
} from 'recharts';
import { ChevronDown } from 'lucide-react';
import type { WeeklyStats } from '../types';

interface StatsChartProps {
  data: WeeklyStats[];
}

// Custom tooltip component
function CustomTooltip({
  active,
  payload,
  label,
}: {
  active?: boolean;
  payload?: Array<{ value: number; dataKey: string; color: string }>;
  label?: string;
}) {
  if (!active || !payload) return null;

  return (
    <div className="bg-white rounded-xl shadow-card-hover p-3 border border-gray-100">
      <p className="text-xs font-semibold text-text-primary mb-1.5">{label}</p>
      {payload.map((entry) => (
        <p
          key={entry.dataKey}
          className="text-xs"
          style={{ color: entry.color }}
        >
          {entry.dataKey === 'income' ? 'Income' : 'Expenses'}:{' '}
          <span className="font-semibold">
            ${entry.value.toLocaleString()}
          </span>
        </p>
      ))}
    </div>
  );
}

export default function StatsChart({ data }: StatsChartProps) {
  return (
    <div id="stats-chart-section" className="px-4 animate-fade-in-up delay-200">
      {/* Section Header */}
      <div className="flex items-center justify-between mb-1">
        <div>
          <h2 className="text-base font-bold text-text-primary">Statistics</h2>
          <p className="text-xs text-text-muted">Apr 01 - Apr 30</p>
        </div>
        <button
          id="stats-period-selector"
          className="flex items-center gap-1 px-3 py-1.5 text-xs font-medium text-text-secondary bg-white rounded-lg border border-gray-200 hover:border-primary-300 transition-colors cursor-pointer"
        >
          Monthly
          <ChevronDown size={12} />
        </button>
      </div>

      {/* Chart */}
      <div className="bg-white rounded-2xl p-4 mt-3">
        <ResponsiveContainer width="100%" height={200}>
          <BarChart
            data={data}
            barGap={4}
            barCategoryGap="20%"
          >
            <CartesianGrid
              strokeDasharray="3 3"
              vertical={false}
              stroke="#f3f4f6"
            />
            <XAxis
              dataKey="week"
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 11, fill: '#9ca3af' }}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 11, fill: '#9ca3af' }}
              tickFormatter={(value: number) => value === 0 ? '$0' : `$${(value / 1000).toFixed(0)}k`}
            />
            <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(124, 58, 237, 0.05)' }} />
            <Bar
              dataKey="income"
              fill="#8b5cf6"
              radius={[4, 4, 0, 0]}
              maxBarSize={20}
            />
            <Bar
              dataKey="expenses"
              fill="#f97316"
              radius={[4, 4, 0, 0]}
              maxBarSize={20}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
