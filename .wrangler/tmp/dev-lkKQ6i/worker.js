var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });

// src/worker.ts
var INITIAL_MOCK_TRANSACTIONS = [
  {
    id: "txn-001",
    name: "Money Transfer",
    category: "Transfer",
    amount: -450,
    date: "2026-06-07",
    time: "12:35 PM",
    icon: "ArrowUpRight",
    iconBg: "bg-blue-100",
    iconColor: "text-blue-600",
    createdAt: 17808255e5
  },
  {
    id: "txn-002",
    name: "Paypal",
    category: "Income",
    amount: 1200,
    date: "2026-06-07",
    time: "10:20 AM",
    icon: "Wallet",
    iconBg: "bg-indigo-100",
    iconColor: "text-indigo-600",
    createdAt: 17808174e5
  },
  {
    id: "txn-003",
    name: "Uber",
    category: "Transport",
    amount: -150,
    date: "2026-06-07",
    time: "08:40 AM",
    icon: "Car",
    iconBg: "bg-gray-100",
    iconColor: "text-gray-700",
    createdAt: 17808114e5
  },
  {
    id: "txn-004",
    name: "Bata Store",
    category: "Shopping",
    amount: -200,
    date: "2026-06-06",
    time: "04:15 PM",
    icon: "ShoppingBag",
    iconBg: "bg-red-100",
    iconColor: "text-red-600",
    createdAt: 17807427e5
  },
  {
    id: "txn-005",
    name: "Bank Transfer",
    category: "Transfer",
    amount: -600,
    date: "2026-06-06",
    time: "02:30 PM",
    icon: "Building2",
    iconBg: "bg-purple-100",
    iconColor: "text-purple-600",
    createdAt: 17807364e5
  },
  {
    id: "txn-006",
    name: "Freelance Payment",
    category: "Income",
    amount: 2500,
    date: "2026-06-03",
    time: "09:00 AM",
    icon: "Briefcase",
    iconBg: "bg-green-100",
    iconColor: "text-green-600",
    createdAt: 1780461e6
  },
  {
    id: "txn-007",
    name: "Netflix",
    category: "Entertainment",
    amount: -15.99,
    date: "2026-06-02",
    time: "12:00 AM",
    icon: "Tv",
    iconBg: "bg-red-100",
    iconColor: "text-red-500",
    createdAt: 17803416e5
  },
  {
    id: "txn-008",
    name: "Grocery Store",
    category: "Food",
    amount: -85.5,
    date: "2026-06-01",
    time: "06:30 PM",
    icon: "Apple",
    iconBg: "bg-emerald-100",
    iconColor: "text-emerald-600",
    createdAt: 1780323e6
  }
];
async function seedDatabaseIfEmpty(db) {
  try {
    const check = await db.prepare("SELECT COUNT(*) as count FROM transactions").first();
    if (check && check.count === 0) {
      console.log("Seeding initial transactions...");
      for (const txn of INITIAL_MOCK_TRANSACTIONS) {
        await db.prepare(
          `INSERT INTO transactions (id, name, category, amount, date, time, icon, iconBg, iconColor, createdAt)
           VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
        ).bind(
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
        ).run();
      }
    }
  } catch (err) {
    console.error("Failed to seed database:", err);
  }
}
__name(seedDatabaseIfEmpty, "seedDatabaseIfEmpty");
var worker_default = {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    if (url.pathname.startsWith("/api/")) {
      await seedDatabaseIfEmpty(env.DB);
      try {
        const corsHeaders = {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
          "Access-Control-Allow-Headers": "Content-Type",
          "Content-Type": "application/json"
        };
        if (request.method === "OPTIONS") {
          return new Response(null, { headers: corsHeaders });
        }
        if (url.pathname === "/api/transactions" && request.method === "GET") {
          const { results } = await env.DB.prepare(
            "SELECT * FROM transactions ORDER BY createdAt DESC"
          ).all();
          return new Response(JSON.stringify(results), { headers: corsHeaders });
        }
        if (url.pathname === "/api/transactions" && request.method === "POST") {
          const body = await request.json();
          const { name, category, amount, date, time, icon, iconBg, iconColor } = body;
          if (!name || amount === void 0 || !category || !date || !time) {
            return new Response(JSON.stringify({ error: "Missing required fields" }), {
              status: 400,
              headers: corsHeaders
            });
          }
          const id = `txn-${Date.now()}`;
          const createdAt = Date.now();
          await env.DB.prepare(
            `INSERT INTO transactions (id, name, category, amount, date, time, icon, iconBg, iconColor, createdAt)
             VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
          ).bind(id, name, category, amount, date, time, icon || "Wallet", iconBg || "bg-primary-100", iconColor || "text-primary-600", createdAt).run();
          return new Response(JSON.stringify({ success: true, id }), { headers: corsHeaders });
        }
        if (url.pathname === "/api/balance" && request.method === "GET") {
          const { results } = await env.DB.prepare("SELECT amount FROM transactions").all();
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
        if (url.pathname === "/api/overview" && request.method === "GET") {
          const { results } = await env.DB.prepare("SELECT amount FROM transactions").all();
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
        if (url.pathname === "/api/stats/weekly" && request.method === "GET") {
          const { results } = await env.DB.prepare(
            "SELECT amount, createdAt FROM transactions ORDER BY createdAt ASC"
          ).all();
          const now = Date.now();
          const oneWeekMs = 7 * 24 * 60 * 60 * 1e3;
          const weeks = [
            { name: "Week 1", start: now - 4 * oneWeekMs, end: now - 3 * oneWeekMs },
            { name: "Week 2", start: now - 3 * oneWeekMs, end: now - 2 * oneWeekMs },
            { name: "Week 3", start: now - 2 * oneWeekMs, end: now - 1 * oneWeekMs },
            { name: "Week 4", start: now - 1 * oneWeekMs, end: now }
          ];
          const stats = weeks.map((w) => {
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
          const hasData = stats.some((s) => s.income > 0 || s.expenses > 0);
          if (!hasData) {
            return new Response(
              JSON.stringify([
                { week: "Week 1", income: 1800, expenses: 1200 },
                { week: "Week 2", income: 2800, expenses: 2e3 },
                { week: "Week 3", income: 2200, expenses: 900 },
                { week: "Week 4", income: 3200, expenses: 1500 }
              ]),
              { headers: corsHeaders }
            );
          }
          return new Response(JSON.stringify(stats), { headers: corsHeaders });
        }
        if (url.pathname === "/api/expenses/categories" && request.method === "GET") {
          const { results } = await env.DB.prepare(
            "SELECT * FROM transactions WHERE amount < 0 ORDER BY createdAt DESC"
          ).all();
          const groups = {};
          for (const row of results) {
            const cat = row.category;
            if (!groups[cat]) {
              groups[cat] = {
                amount: 0,
                lastDate: row.date,
                icon: row.icon,
                iconBg: row.iconBg,
                iconColor: row.iconColor
              };
            }
            groups[cat].amount += row.amount;
          }
          const categoryList = Object.entries(groups).map(([name, g], index) => ({
            id: `cat-${index}`,
            name,
            date: g.lastDate,
            amount: g.amount,
            icon: g.icon,
            iconBg: g.iconBg,
            iconColor: g.iconColor
          }));
          return new Response(JSON.stringify(categoryList), { headers: corsHeaders });
        }
        return new Response(JSON.stringify({ error: "Not Found" }), {
          status: 404,
          headers: corsHeaders
        });
      } catch (err) {
        return new Response(JSON.stringify({ error: err.message }), {
          status: 500,
          headers: { "Content-Type": "application/json" }
        });
      }
    }
    return env.ASSETS.fetch(request);
  }
};

// ../../.npm/_npx/32026684e21afda6/node_modules/wrangler/templates/middleware/middleware-ensure-req-body-drained.ts
var drainBody = /* @__PURE__ */ __name(async (request, env, _ctx, middlewareCtx) => {
  try {
    return await middlewareCtx.next(request, env);
  } finally {
    try {
      if (request.body !== null && !request.bodyUsed) {
        const reader = request.body.getReader();
        while (!(await reader.read()).done) {
        }
      }
    } catch (e) {
      console.error("Failed to drain the unused request body.", e);
    }
  }
}, "drainBody");
var middleware_ensure_req_body_drained_default = drainBody;

// ../../.npm/_npx/32026684e21afda6/node_modules/wrangler/templates/middleware/middleware-miniflare3-json-error.ts
function reduceError(e) {
  return {
    name: e?.name,
    message: e?.message ?? String(e),
    stack: e?.stack,
    cause: e?.cause === void 0 ? void 0 : reduceError(e.cause)
  };
}
__name(reduceError, "reduceError");
var jsonError = /* @__PURE__ */ __name(async (request, env, _ctx, middlewareCtx) => {
  try {
    return await middlewareCtx.next(request, env);
  } catch (e) {
    const error = reduceError(e);
    return Response.json(error, {
      status: 500,
      headers: { "MF-Experimental-Error-Stack": "true" }
    });
  }
}, "jsonError");
var middleware_miniflare3_json_error_default = jsonError;

// .wrangler/tmp/bundle-cLQt0A/middleware-insertion-facade.js
var __INTERNAL_WRANGLER_MIDDLEWARE__ = [
  middleware_ensure_req_body_drained_default,
  middleware_miniflare3_json_error_default
];
var middleware_insertion_facade_default = worker_default;

// ../../.npm/_npx/32026684e21afda6/node_modules/wrangler/templates/middleware/common.ts
var __facade_middleware__ = [];
function __facade_register__(...args) {
  __facade_middleware__.push(...args.flat());
}
__name(__facade_register__, "__facade_register__");
function __facade_invokeChain__(request, env, ctx, dispatch, middlewareChain) {
  const [head, ...tail] = middlewareChain;
  const middlewareCtx = {
    dispatch,
    next(newRequest, newEnv) {
      return __facade_invokeChain__(newRequest, newEnv, ctx, dispatch, tail);
    }
  };
  return head(request, env, ctx, middlewareCtx);
}
__name(__facade_invokeChain__, "__facade_invokeChain__");
function __facade_invoke__(request, env, ctx, dispatch, finalMiddleware) {
  return __facade_invokeChain__(request, env, ctx, dispatch, [
    ...__facade_middleware__,
    finalMiddleware
  ]);
}
__name(__facade_invoke__, "__facade_invoke__");

// .wrangler/tmp/bundle-cLQt0A/middleware-loader.entry.ts
var __Facade_ScheduledController__ = class ___Facade_ScheduledController__ {
  constructor(scheduledTime, cron, noRetry) {
    this.scheduledTime = scheduledTime;
    this.cron = cron;
    this.#noRetry = noRetry;
  }
  static {
    __name(this, "__Facade_ScheduledController__");
  }
  #noRetry;
  noRetry() {
    if (!(this instanceof ___Facade_ScheduledController__)) {
      throw new TypeError("Illegal invocation");
    }
    this.#noRetry();
  }
};
function wrapExportedHandler(worker) {
  if (__INTERNAL_WRANGLER_MIDDLEWARE__ === void 0 || __INTERNAL_WRANGLER_MIDDLEWARE__.length === 0) {
    return worker;
  }
  for (const middleware of __INTERNAL_WRANGLER_MIDDLEWARE__) {
    __facade_register__(middleware);
  }
  const fetchDispatcher = /* @__PURE__ */ __name(function(request, env, ctx) {
    if (worker.fetch === void 0) {
      throw new Error("Handler does not export a fetch() function.");
    }
    return worker.fetch(request, env, ctx);
  }, "fetchDispatcher");
  return {
    ...worker,
    fetch(request, env, ctx) {
      const dispatcher = /* @__PURE__ */ __name(function(type, init) {
        if (type === "scheduled" && worker.scheduled !== void 0) {
          const controller = new __Facade_ScheduledController__(
            Date.now(),
            init.cron ?? "",
            () => {
            }
          );
          return worker.scheduled(controller, env, ctx);
        }
      }, "dispatcher");
      return __facade_invoke__(request, env, ctx, dispatcher, fetchDispatcher);
    }
  };
}
__name(wrapExportedHandler, "wrapExportedHandler");
function wrapWorkerEntrypoint(klass) {
  if (__INTERNAL_WRANGLER_MIDDLEWARE__ === void 0 || __INTERNAL_WRANGLER_MIDDLEWARE__.length === 0) {
    return klass;
  }
  for (const middleware of __INTERNAL_WRANGLER_MIDDLEWARE__) {
    __facade_register__(middleware);
  }
  return class extends klass {
    #fetchDispatcher = /* @__PURE__ */ __name((request, env, ctx) => {
      this.env = env;
      this.ctx = ctx;
      if (super.fetch === void 0) {
        throw new Error("Entrypoint class does not define a fetch() function.");
      }
      return super.fetch(request);
    }, "#fetchDispatcher");
    #dispatcher = /* @__PURE__ */ __name((type, init) => {
      if (type === "scheduled" && super.scheduled !== void 0) {
        const controller = new __Facade_ScheduledController__(
          Date.now(),
          init.cron ?? "",
          () => {
          }
        );
        return super.scheduled(controller);
      }
    }, "#dispatcher");
    fetch(request) {
      return __facade_invoke__(
        request,
        this.env,
        this.ctx,
        this.#dispatcher,
        this.#fetchDispatcher
      );
    }
  };
}
__name(wrapWorkerEntrypoint, "wrapWorkerEntrypoint");
var WRAPPED_ENTRY;
if (typeof middleware_insertion_facade_default === "object") {
  WRAPPED_ENTRY = wrapExportedHandler(middleware_insertion_facade_default);
} else if (typeof middleware_insertion_facade_default === "function") {
  WRAPPED_ENTRY = wrapWorkerEntrypoint(middleware_insertion_facade_default);
}
var middleware_loader_entry_default = WRAPPED_ENTRY;
export {
  __INTERNAL_WRANGLER_MIDDLEWARE__,
  middleware_loader_entry_default as default
};
//# sourceMappingURL=worker.js.map
