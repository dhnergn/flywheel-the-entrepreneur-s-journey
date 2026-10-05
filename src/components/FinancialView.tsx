import React, { useState } from 'react';
import { useGame } from '../context/GameContext';
import {
  TrendingUp,
  AlertTriangle,
  Landmark,
  DollarSign,
  PieChart,
  ArrowUpRight,
  ArrowDownRight,
  ShieldCheck
} from 'lucide-react';

export const FinancialView: React.FC = () => {
  const { company, takeBankLoan, repayBankLoan } = useGame();
  const [loanAmount, setLoanAmount] = useState<number>(5000);
  const [repayAmount, setRepayAmount] = useState<number>(2500);

  const fin = company.finances;
  const isProfitable = fin.operatingProfit > 0;
  const ltvEstimate = fin.grossMarginPercent > 0 ? (company.unitPrice * (fin.grossMarginPercent / 100) * 18) : company.unitPrice * 10;
  const cacEstimate = Math.max(25, Math.floor(company.unitPrice * 0.45));
  const ltvCacRatio = cacEstimate > 0 ? (ltvEstimate / cacEstimate).toFixed(1) : '3.5';

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      <div>
        <h1 className="text-xl font-bold text-white font-serif tracking-tight">
          Financial Statement & Unit Economics
        </h1>
        <p className="text-xs text-slate-400">
          Revenue is vanity, profit is sanity, but cash flow is reality. Master the relationship between margins and runway.
        </p>
      </div>

      {/* Top 3 High-Level Financial Gauges */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-4 bg-slate-900/70 border border-slate-800 rounded-xl">
          <div className="text-xs text-slate-400 mb-1 flex items-center justify-between">
            <span>Treasury & Bank Liquidity</span>
            <DollarSign className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-2xl font-bold font-mono text-white tabular-nums">
            ${Math.floor(fin.cash).toLocaleString()}
          </div>
          <div className="text-xs text-slate-400 mt-1 font-mono">
            {fin.runwayMonths > 50 ? (
              <span className="text-emerald-400 flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5" /> Self-Funding / Infinite Runway
              </span>
            ) : fin.runwayMonths < 2 ? (
              <span className="text-rose-400 flex items-center gap-1">
                <AlertTriangle className="w-3.5 h-3.5" /> Critical Runway: {fin.runwayMonths} Months
              </span>
            ) : (
              <span>Estimated Runway: {fin.runwayMonths} Months</span>
            )}
          </div>
        </div>

        <div className="p-4 bg-slate-900/70 border border-slate-800 rounded-xl">
          <div className="text-xs text-slate-400 mb-1 flex items-center justify-between">
            <span>Net Monthly Cash Flow</span>
            {isProfitable ? (
              <ArrowUpRight className="w-4 h-4 text-emerald-400" />
            ) : (
              <ArrowDownRight className="w-4 h-4 text-amber-400" />
            )}
          </div>
          <div className={`text-2xl font-bold font-mono tabular-nums ${isProfitable ? 'text-emerald-400' : 'text-amber-400'}`}>
            {fin.netCashFlow >= 0 ? '+' : ''}${Math.floor(fin.netCashFlow).toLocaleString()}
          </div>
          <div className="text-xs text-slate-400 mt-1 font-mono">
            Burn Rate: ${Math.floor(fin.burnRate).toLocaleString()}/month
          </div>
        </div>

        <div className="p-4 bg-slate-900/70 border border-slate-800 rounded-xl">
          <div className="text-xs text-slate-400 mb-1 flex items-center justify-between">
            <span>Enterprise Valuation</span>
            <TrendingUp className="w-4 h-4 text-indigo-400" />
          </div>
          <div className="text-2xl font-bold font-mono text-indigo-300 tabular-nums">
            ${Math.floor(fin.valuation).toLocaleString()}
          </div>
          <div className="text-xs text-slate-400 mt-1 font-mono">
            Based on {isProfitable ? 'Earnings Multiple' : 'ARR Growth Multiple'}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Income Statement (P&L) - Left 2 Columns */}
        <div className="lg:col-span-2 p-5 bg-slate-900/70 border border-slate-800 rounded-2xl space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <h2 className="text-sm font-semibold text-white">Monthly Statement of Operations (P&L)</h2>
            <span className="text-xs text-slate-500 font-mono">Cash Accounting</span>
          </div>

          <div className="space-y-2 text-xs font-mono tabular-nums">
            {/* Revenue */}
            <div className="flex items-center justify-between py-1.5 border-b border-slate-800/60">
              <span className="text-slate-300">Gross Invoiced Revenue ({company.totalCustomers} Accounts)</span>
              <span className="font-semibold text-emerald-400">${Math.floor(fin.monthlyRevenue).toLocaleString()}</span>
            </div>

            {/* COGS */}
            <div className="flex items-center justify-between py-1.5 border-b border-slate-800/60">
              <span className="text-slate-400">Direct Cost of Goods Sold (COGS)</span>
              <span className="text-slate-400">-${Math.floor(fin.monthlyCOGS).toLocaleString()}</span>
            </div>

            {/* Gross Profit */}
            <div className="flex items-center justify-between py-2 bg-slate-950/70 px-2.5 rounded-lg border border-slate-800/80">
              <span className="font-semibold text-white">Gross Profit ({fin.grossMarginPercent.toFixed(1)}% Margin)</span>
              <span className="font-bold text-emerald-300">${Math.floor(fin.grossProfit).toLocaleString()}</span>
            </div>

            {/* Operating Expenses */}
            <div className="pt-2 text-[11px] uppercase tracking-wider text-slate-500 font-sans font-semibold">
              Operating Expenses (OPEX)
            </div>

            <div className="flex items-center justify-between py-1 pl-3 text-slate-400">
              <span>Employee Salaries ({company.team.length} Members)</span>
              <span>${Math.floor(fin.operatingExpenses.salaries).toLocaleString()}</span>
            </div>

            <div className="flex items-center justify-between py-1 pl-3 text-slate-400">
              <span>Marketing & Demand Acquisition</span>
              <span>${Math.floor(fin.operatingExpenses.marketing).toLocaleString()}</span>
            </div>

            <div className="flex items-center justify-between py-1 pl-3 text-slate-400">
              <span>Office Lease & Facilities</span>
              <span>${Math.floor(fin.operatingExpenses.rentOffice).toLocaleString()}</span>
            </div>

            <div className="flex items-center justify-between py-1 pl-3 text-slate-400">
              <span>Software Stack & Cloud Hosting</span>
              <span>${Math.floor(fin.operatingExpenses.softwareAndTools).toLocaleString()}</span>
            </div>

            {fin.debt > 0 && (
              <div className="flex items-center justify-between py-1 pl-3 text-amber-400">
                <span>Bank Loan Interest ({fin.monthlyInterestRate}% / mo)</span>
                <span>${Math.floor(fin.operatingExpenses.loanInterest).toLocaleString()}</span>
              </div>
            )}

            <div className="flex items-center justify-between py-1 pl-3 text-slate-400">
              <span>Administrative & Miscellaneous</span>
              <span>${Math.floor(fin.operatingExpenses.miscellaneous).toLocaleString()}</span>
            </div>

            {/* Total OPEX */}
            <div className="flex items-center justify-between py-1.5 border-t border-slate-800 text-slate-300 font-semibold">
              <span>Total Operating Expenses</span>
              <span>-${Math.floor(fin.totalOperatingExpenses).toLocaleString()}</span>
            </div>

            {/* Net Operating Profit */}
            <div className={`flex items-center justify-between py-2.5 px-3 rounded-lg border text-sm font-bold ${
              isProfitable
                ? 'bg-emerald-950/30 border-emerald-800/60 text-emerald-300'
                : 'bg-amber-950/30 border-amber-800/60 text-amber-300'
            }`}>
              <span>Net Operating Profit / (Loss)</span>
              <span>{fin.operatingProfit >= 0 ? '+' : ''}${Math.floor(fin.operatingProfit).toLocaleString()}</span>
            </div>
          </div>
        </div>

        {/* Unit Economics & Debt Management - Right Column */}
        <div className="space-y-4">
          {/* Unit Economics Card */}
          <div className="p-5 bg-slate-900/70 border border-slate-800 rounded-2xl space-y-3">
            <div className="flex items-center justify-between border-b border-slate-800 pb-2">
              <h2 className="text-sm font-semibold text-white">Unit Economics Core</h2>
              <PieChart className="w-4 h-4 text-indigo-400" />
            </div>

            <div className="space-y-2 text-xs font-mono">
              <div className="flex justify-between text-slate-400">
                <span>Price per Customer</span>
                <span className="text-white">${company.unitPrice}</span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>Direct Unit Cost (COGS)</span>
                <span className="text-white">${company.unitCost.toFixed(1)}</span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>Gross Margin %</span>
                <span className="text-emerald-400">{fin.grossMarginPercent.toFixed(0)}%</span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>Estimated LTV</span>
                <span className="text-indigo-300">${Math.floor(ltvEstimate)}</span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>Est. Acquisition Cost (CAC)</span>
                <span className="text-slate-300">${cacEstimate}</span>
              </div>
              <div className="pt-2 border-t border-slate-800 flex justify-between font-bold">
                <span className="text-slate-300">LTV : CAC Multiple</span>
                <span className="text-emerald-400 font-mono">{ltvCacRatio}x</span>
              </div>
            </div>
          </div>

          {/* Bank Loan / Credit Facility */}
          <div className="p-5 bg-slate-900/70 border border-slate-800 rounded-2xl space-y-3">
            <div className="flex items-center justify-between border-b border-slate-800 pb-2">
              <h2 className="text-sm font-semibold text-white">Commercial Bank Credit</h2>
              <Landmark className="w-4 h-4 text-emerald-400" />
            </div>

            <div className="text-xs text-slate-400">
              <div>Total Debt Balance: <span className="font-mono text-white font-semibold">${fin.debt.toLocaleString()}</span></div>
              <div>Interest: <span className="font-mono text-slate-300">0.8% / month (~9.6% APR)</span></div>
            </div>

            <div className="pt-2 space-y-2">
              <button
                onClick={() => takeBankLoan(loanAmount)}
                className="w-full py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-lg text-xs font-semibold transition-colors cursor-pointer"
              >
                Draw Down $5,000 Credit
              </button>

              {fin.debt > 0 && (
                <button
                  onClick={() => repayBankLoan(repayAmount)}
                  disabled={fin.cash < repayAmount}
                  className="w-full py-2 bg-emerald-900/60 hover:bg-emerald-800 text-emerald-200 disabled:opacity-40 rounded-lg text-xs font-semibold transition-colors cursor-pointer"
                >
                  Pay Down $2,500 Debt
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
