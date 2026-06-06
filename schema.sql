-- D1 Database Schema for MyMoney
CREATE TABLE IF NOT EXISTS transactions (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  category TEXT NOT NULL,
  amount REAL NOT NULL,      -- Positive for income, negative for expense
  date TEXT NOT NULL,        -- YYYY-MM-DD
  time TEXT NOT NULL,        -- HH:MM
  icon TEXT NOT NULL,        -- Lucide icon name
  iconBg TEXT NOT NULL,      -- Tailwind background color class
  iconColor TEXT NOT NULL,   -- Tailwind text color class
  createdAt INTEGER NOT NULL -- Timestamp
);
