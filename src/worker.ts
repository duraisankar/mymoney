interface Env {
  DB: D1Database;
  ASSETS: {
    fetch: typeof fetch;
  };
}

interface D1Transaction {
  id: string;
  name: string;
  category: string;
  amount: number;
  date: string;
  time: string;
  icon: string;
  iconBg: string;
  iconColor: string;
  createdAt: number;
}

// Initial mock data to seed database if empty
const INITIAL_MOCK_TRANSACTIONS = [
  {
    id: 'txn-001',
    name: 'Money Transfer',
    category: 'Transfer',
    amount: -450,
    date: '2026-06-07',
    time: '12:35 PM',
    icon: 'ArrowUpRight',
    iconBg: 'bg-blue-100',
    iconColor: 'text-blue-600',
    createdAt: 1780825500000,
  },
  {
    id: 'txn-002',
    name: 'Paypal',
    category: 'Income',
    amount: 1200,
    date: '2026-06-07',
    time: '10:20 AM',
    icon: 'Wallet',
    iconBg: 'bg-indigo-100',
    iconColor: 'text-indigo-600',
    createdAt: 1780817400000,
  },
  {
    id: 'txn-003',
    name: 'Uber',
    category: 'Transport',
    amount: -150,
    date: '2026-06-07',
    time: '08:40 AM',
    icon: 'Car',
    iconBg: 'bg-gray-100',
    iconColor: 'text-gray-700',
    createdAt: 1780811400000,
  },
  {
    id: 'txn-004',
    name: 'Bata Store',
    category: 'Shopping',
    amount: -200,
    date: '2026-06-06',
    time: '04:15 PM',
    icon: 'ShoppingBag',
    iconBg: 'bg-red-100',
    iconColor: 'text-red-600',
    createdAt: 1780742700000,
  },
  {
    id: 'txn-005',
    name: 'Bank Transfer',
    category: 'Transfer',
    amount: -600,
    date: '2026-06-06',
    time: '02:30 PM',
    icon: 'Building2',
    iconBg: 'bg-purple-100',
    iconColor: 'text-purple-600',
    createdAt: 1780736400000,
  },
  {
    id: 'txn-006',
    name: 'Freelance Payment',
    category: 'Income',
    amount: 2500,
    date: '2026-06-03',
    time: '09:00 AM',
    icon: 'Briefcase',
    iconBg: 'bg-green-100',
    iconColor: 'text-green-600',
    createdAt: 1780461000000,
  },
  {
    id: 'txn-007',
    name: 'Netflix',
    category: 'Entertainment',
    amount: -15.99,
    date: '2026-06-02',
    time: '12:00 AM',
    icon: 'Tv',
    iconBg: 'bg-red-100',
    iconColor: 'text-red-500',
    createdAt: 1780341600000,
  },
  {
    id: 'txn-008',
    name: 'Grocery Store',
    category: 'Food',
    amount: -85.5,
    date: '2026-06-01',
    time: '06:30 PM',
    icon: 'Apple',
    iconBg: 'bg-emerald-100',
    iconColor: 'text-emerald-600',
    createdAt: 1780323000000,
  },
];

async function seedDatabaseIfEmpty(db: Env['DB']) {
  try {
    const check = await db.prepare('SELECT COUNT(*) as count FROM transactions').first<{ count: number }>();
    if (check && check.count === 0) {
      console.log('Seeding initial transactions...');
      for (const txn of INITIAL_MOCK_TRANSACTIONS) {
        await db.prepare(
          `INSERT INTO transactions (id, name, category, amount, date, time, icon, iconBg, iconColor, createdAt)
           VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
        )
        .bind(
          txn.id,
          txn.name,
          txn.category,
          txn.amount,
          txn.date,
          txn.time,
          txn.icon,
          txn.iconBg,
          txn.iconColor,
          txn.createdAt
        )
        .run();
      }
    }
  } catch (err) {
    console.error('Failed to seed database:', err);
  }
}

export default {
  async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
    const url = new URL(request.url);

    // Only handle API requests
    if (url.pathname.startsWith('/api/')) {
      // Seed DB asynchronously or on first query (using await here to ensure data exists)
      await seedDatabaseIfEmpty(env.DB);

      try {
        const corsHeaders = {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type',
          'Content-Type': 'application/json',
        };

        if (request.method === 'OPTIONS') {
          return new Response(null, { headers: corsHeaders });
        }

        // ─── GET /api/transactions ───
        if (url.pathname === '/api/transactions' && request.method === 'GET') {
          const { results } = await env.DB.prepare(
            'SELECT * FROM transactions ORDER BY createdAt DESC'
          ).all<D1Transaction>();
          return new Response(JSON.stringify(results), { headers: corsHeaders });
        }

        // ─── POST /api/transactions ───
        if (url.pathname === '/api/transactions' && request.method === 'POST') {
          const body: any = await request.json();
          const { name, category, amount, date, time, icon, iconBg, iconColor } = body;

          if (!name || amount === undefined || !category || !date || !time) {
            return new Response(JSON.stringify({ error: 'Missing required fields' }), {
              status: 400,
              headers: corsHeaders,
            });
          }

          const id = `txn-${Date.now()}`;
          const createdAt = Date.now();

          await env.DB.prepare(
            `INSERT INTO transactions (id, name, category, amount, date, time, icon, iconBg, iconColor, createdAt)
             VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
          )
          .bind(id, name, category, amount, date, time, icon || 'Wallet', iconBg || 'bg-primary-100', iconColor || 'text-primary-600', createdAt)
          .run();

          return new Response(JSON.stringify({ success: true, id }), { headers: corsHeaders });
        }

        // ─── GET /api/balance ───
        if (url.pathname === '/api/balance' && request.method === 'GET') {
          const { results } = await env.DB.prepare('SELECT amount FROM transactions').all<{ amount: number }>();
          let totalBalance = 0;
          let income = 0;
          let expenses = 0;

          for (const row of results) {
            totalBalance += row.amount;
            if (row.amount > 0) {
              income += row.amount;
            } else {
              expenses += Math.abs(row.amount);
            }
          }

          return new Response(
            JSON.stringify({ totalBalance, income, expenses }),
            { headers: corsHeaders }
          );
        }

        // ─── GET /api/overview ───
        if (url.pathname === '/api/overview' && request.method === 'GET') {
          const { results } = await env.DB.prepare('SELECT amount FROM transactions').all<{ amount: number }>();
          let totalIncome = 0;
          let totalExpenses = 0;

          for (const row of results) {
            if (row.amount > 0) {
              totalIncome += row.amount;
            } else {
              totalExpenses += Math.abs(row.amount);
            }
          }

          return new Response(
            JSON.stringify({ totalIncome, totalExpenses }),
            { headers: corsHeaders }
          );
        }

        // ─── GET /api/stats/weekly ───
        if (url.pathname === '/api/stats/weekly' && request.method === 'GET') {
          // Dynamic weekly grouping
          // Query all transactions
          const { results } = await env.DB.prepare(
            'SELECT amount, createdAt FROM transactions ORDER BY createdAt ASC'
          ).all<{ amount: number; createdAt: number }>();

          // Group by weeks relative to the earliest transaction (or fallback to last 4 weeks)
          // For simplicity, let's map transactions to weeks of the year or last 4 weeks
          const now = Date.now();
          const oneWeekMs = 7 * 24 * 60 * 60 * 1000;
          
          const weeks = [
            { name: 'Week 1', start: now - 4 * oneWeekMs, end: now - 3 * oneWeekMs },
            { name: 'Week 2', start: now - 3 * oneWeekMs, end: now - 2 * oneWeekMs },
            { name: 'Week 3', start: now - 2 * oneWeekMs, end: now - 1 * oneWeekMs },
            { name: 'Week 4', start: now - 1 * oneWeekMs, end: now },
          ];

          const stats = weeks.map(w => {
            let income = 0;
            let expenses = 0;
            for (const txn of results) {
              if (txn.createdAt >= w.start && txn.createdAt < w.end) {
                if (txn.amount > 0) {
                  income += txn.amount;
                } else {
                  expenses += Math.abs(txn.amount);
                }
              }
            }
            return { week: w.name, income, expenses };
          });

          // If all weeks are empty, populate with some defaults from historical data
          const hasData = stats.some(s => s.income > 0 || s.expenses > 0);
          if (!hasData) {
            // fallback mock representation
            return new Response(
              JSON.stringify([
                { week: 'Week 1', income: 1800, expenses: 1200 },
                { week: 'Week 2', income: 2800, expenses: 2000 },
                { week: 'Week 3', income: 2200, expenses: 900 },
                { week: 'Week 4', income: 3200, expenses: 1500 },
              ]),
              { headers: corsHeaders }
            );
          }

          return new Response(JSON.stringify(stats), { headers: corsHeaders });
        }

        // ─── GET /api/expenses/categories ───
        if (url.pathname === '/api/expenses/categories' && request.method === 'GET') {
          // Query transactions that are expenses (amount < 0)
          const { results } = await env.DB.prepare(
            'SELECT * FROM transactions WHERE amount < 0 ORDER BY createdAt DESC'
          ).all<D1Transaction>();

          // Group by category name
          const groups: Record<string, { amount: number; lastDate: string; icon: string; iconBg: string; iconColor: string }> = {};

          for (const row of results) {
            const cat = row.category;
            if (!groups[cat]) {
              groups[cat] = {
                amount: 0,
                lastDate: row.date,
                icon: row.icon,
                iconBg: row.iconBg,
                iconColor: row.iconColor,
              };
            }
            groups[cat].amount += row.amount; // keeps it negative
          }

          const categoryList = Object.entries(groups).map(([name, g], index) => ({
            id: `cat-${index}`,
            name,
            date: g.lastDate,
            amount: g.amount,
            icon: g.icon,
            iconBg: g.iconBg,
            iconColor: g.iconColor,
          }));

          return new Response(JSON.stringify(categoryList), { headers: corsHeaders });
        }

        return new Response(JSON.stringify({ error: 'Not Found' }), {
          status: 404,
          headers: corsHeaders,
        });
      } catch (err: any) {
        return new Response(JSON.stringify({ error: err.message }), {
          status: 500,
          headers: { 'Content-Type': 'application/json' },
        });
      }
    }

    // Default: Fallback to static assets
    return env.ASSETS.fetch(request);
  },
};
