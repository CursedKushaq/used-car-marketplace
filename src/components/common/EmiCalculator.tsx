"use client";

import React, { useState } from "react";
import { formatCurrency } from "@/lib/format";
import { Calculator, IndianRupee, Sparkles, CheckCircle2, ShieldCheck } from "lucide-react";
import { Button } from "../ui/Button";

interface EmiCalculatorProps {
  initialPrice?: number;
  carTitle?: string;
}

export const EmiCalculator: React.FC<EmiCalculatorProps> = ({
  initialPrice = 1200000,
  carTitle,
}) => {
  const [loanAmount, setLoanAmount] = useState<number>(Math.round(initialPrice * 0.8));
  const [interestRate, setInterestRate] = useState<number>(9.5);
  const [tenureYears, setTenureYears] = useState<number>(5);

  // EMI Formula: P * r * (1+r)^n / ((1+r)^n - 1)
  const calculateMonthlyEmi = () => {
    if (loanAmount <= 0) return 0;
    const r = interestRate / 12 / 100;
    const n = tenureYears * 12;
    const emi = (loanAmount * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
    return Math.round(emi);
  };

  const monthlyEmi = calculateMonthlyEmi();
  const totalPayment = monthlyEmi * tenureYears * 12;
  const totalInterest = Math.max(0, totalPayment - loanAmount);
  const downPayment = Math.max(0, initialPrice - loanAmount);

  return (
    <div className="rounded-3xl border border-slate-200/90 bg-white p-6 sm:p-8 shadow-sm space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-5">
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-700 bg-blue-50 border border-blue-200/80 px-2.5 py-0.5 rounded-full mb-1.5">
            <Calculator className="w-3.5 h-3.5" />
            <span>Used Car Finance Planner</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-black text-slate-900">
            {carTitle ? `Estimate EMI for ${carTitle}` : "Interactive Used Car EMI Calculator"}
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">
            Compare monthly installments with instant approvals from SBI, HDFC, Sundaram &amp; Chola
          </p>
        </div>

        <div className="text-right bg-blue-50/80 rounded-2xl p-4 border border-blue-200/80">
          <span className="text-xs text-slate-500 block font-medium">Estimated Monthly EMI</span>
          <span className="text-2xl sm:text-3xl font-black text-blue-700 font-tabular">
            {formatCurrency(monthlyEmi)}
            <span className="text-xs font-semibold text-slate-500">/month</span>
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Sliders (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          {/* Slider 1: Loan Amount */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs">
              <label htmlFor="loan-amount" className="font-bold text-slate-900">Loan Amount</label>
              <span className="font-extrabold text-blue-600 text-sm font-tabular">
                {formatCurrency(loanAmount)}
              </span>
            </div>
            <input
              id="loan-amount"
              type="range"
              min={100000}
              max={Math.max(initialPrice, 3000000)}
              step={25000}
              value={loanAmount}
              onChange={(e) => setLoanAmount(Number(e.target.value))}
              aria-label="Loan Amount in Rupees"
              className="w-full accent-blue-600 h-2 bg-slate-100 rounded-lg cursor-pointer"
            />
            <div className="flex justify-between text-[11px] text-slate-500 font-medium">
              <span>Min: ₹1 Lakh</span>
              <span>Down Payment: {formatCurrency(downPayment)}</span>
              <span>Max: {formatCurrency(Math.max(initialPrice, 3000000))}</span>
            </div>
          </div>

          {/* Slider 2: Interest Rate */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs">
              <label htmlFor="interest-rate" className="font-bold text-slate-900">Annual Interest Rate (%)</label>
              <span className="font-extrabold text-slate-900 text-sm font-tabular">
                {interestRate}% p.a.
              </span>
            </div>
            <input
              id="interest-rate"
              type="range"
              min={8.5}
              max={16.0}
              step={0.25}
              value={interestRate}
              onChange={(e) => setInterestRate(Number(e.target.value))}
              aria-label="Annual Interest Rate percentage"
              className="w-full accent-blue-600 h-2 bg-slate-100 rounded-lg cursor-pointer"
            />
            <div className="flex justify-between text-[11px] text-slate-500 font-medium">
              <span>8.5% (Prime Bank Rate)</span>
              <span>Average: 9.5%</span>
              <span>16.0% (NBFC)</span>
            </div>
          </div>

          {/* Slider 3: Loan Tenure */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs">
              <label htmlFor="loan-tenure" className="font-bold text-slate-900">Loan Tenure</label>
              <span className="font-extrabold text-slate-900 text-sm font-tabular">
                {tenureYears} Years ({tenureYears * 12} Months)
              </span>
            </div>
            <div className="grid grid-cols-5 gap-2">
              {[2, 3, 4, 5, 7].map((years) => (
                <button
                  key={years}
                  type="button"
                  onClick={() => setTenureYears(years)}
                  className={`py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    tenureYears === years
                      ? "bg-blue-600 text-white shadow-xs"
                      : "bg-slate-100 border border-slate-200/80 text-slate-600 hover:text-slate-900 hover:bg-slate-200/70"
                  }`}
                >
                  {years} Yrs
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Breakdown Card (5 cols) - Midnight Slate Anchor Card */}
        <div className="lg:col-span-5 rounded-2xl bg-slate-900 text-white border border-slate-800 p-5 sm:p-6 space-y-4 shadow-md">
          <h4 className="font-bold text-xs uppercase tracking-wider text-slate-400">
            Repayment Summary Breakdown
          </h4>

          <div className="space-y-2.5 text-xs">
            <div className="flex justify-between py-1.5 border-b border-slate-800">
              <span className="text-slate-400">Principal Loan Amount</span>
              <span className="font-bold text-white">{formatCurrency(loanAmount)}</span>
            </div>
            <div className="flex justify-between py-1.5 border-b border-slate-800">
              <span className="text-slate-400">Total Interest Amount</span>
              <span className="font-bold text-amber-400">{formatCurrency(totalInterest)}</span>
            </div>
            <div className="flex justify-between py-1.5 border-b border-slate-800">
              <span className="text-slate-400">Total Amount Payable</span>
              <span className="font-extrabold text-blue-300 text-sm">{formatCurrency(totalPayment)}</span>
            </div>
          </div>

          <div className="rounded-xl bg-slate-800/80 p-3 border border-slate-700/80 flex items-center gap-2.5 text-[11px] text-slate-300">
            <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>Pre-approved loan options with low processing fees and zero foreclosure charges after 12 months.</span>
          </div>

          <a
            href={`https://wa.me/919848091822?text=${encodeURIComponent(
              `Hello! I calculated an EMI of ${formatCurrency(monthlyEmi)}/mo for ${carTitle || "a used car"} on AutoBazaar. Please share car finance tie-ups and documents needed.`
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="block w-full pt-1"
          >
            <Button size="md" className="w-full text-xs font-bold gap-2 bg-blue-600 hover:bg-blue-500 text-white shadow-md shadow-blue-500/25">
              <Sparkles className="w-4 h-4" />
              <span>Apply for Low Interest Finance</span>
            </Button>
          </a>
        </div>
      </div>
    </div>
  );
};
