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
    <div className="rounded-3xl border border-muted/15 bg-surface p-6 sm:p-8 shadow-sm space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-muted/10 pb-4">
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-primary bg-primary/10 px-2.5 py-0.5 rounded-full mb-1">
            <Calculator className="w-3.5 h-3.5" />
            <span>Used Car Finance Planner</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-black text-ink">
            {carTitle ? `Estimate EMI for ${carTitle}` : "Interactive Used Car EMI Calculator"}
          </h3>
          <p className="text-xs text-muted mt-0.5">
            Compare monthly installments with instant approvals from SBI, HDFC, Sundaram &amp; Chola
          </p>
        </div>

        <div className="text-right bg-primary/5 rounded-2xl p-4 border border-primary/15">
          <span className="text-xs text-muted block font-medium">Estimated Monthly EMI</span>
          <span className="text-2xl sm:text-3xl font-black text-primary font-tabular">
            {formatCurrency(monthlyEmi)}
            <span className="text-xs font-semibold text-muted">/month</span>
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Sliders (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          {/* Slider 1: Loan Amount */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs">
              <label htmlFor="loan-amount" className="font-bold text-ink">Loan Amount</label>
              <span className="font-extrabold text-primary text-sm font-tabular">
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
              className="w-full accent-primary h-2 bg-canvas rounded-lg cursor-pointer"
            />
            <div className="flex justify-between text-[11px] text-muted">
              <span>Min: ₹1 Lakh</span>
              <span>Down Payment: {formatCurrency(downPayment)}</span>
              <span>Max: {formatCurrency(Math.max(initialPrice, 3000000))}</span>
            </div>
          </div>

          {/* Slider 2: Interest Rate */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs">
              <label htmlFor="interest-rate" className="font-bold text-ink">Annual Interest Rate (%)</label>
              <span className="font-extrabold text-ink text-sm font-tabular">
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
              className="w-full accent-primary h-2 bg-canvas rounded-lg cursor-pointer"
            />
            <div className="flex justify-between text-[11px] text-muted">
              <span>8.5% (Prime Bank Rate)</span>
              <span>Average: 9.5%</span>
              <span>16.0% (NBFC)</span>
            </div>
          </div>

          {/* Slider 3: Loan Tenure */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs">
              <label htmlFor="loan-tenure" className="font-bold text-ink">Loan Tenure</label>
              <span className="font-extrabold text-ink text-sm font-tabular">
                {tenureYears} Years ({tenureYears * 12} Months)
              </span>
            </div>
            <div className="grid grid-cols-5 gap-2">
              {[2, 3, 4, 5, 7].map((years) => (
                <button
                  key={years}
                  type="button"
                  onClick={() => setTenureYears(years)}
                  className={`py-2 rounded-xl text-xs font-bold transition-all ${
                    tenureYears === years
                      ? "bg-primary text-white shadow-xs"
                      : "bg-canvas border border-muted/15 text-muted hover:text-ink"
                  }`}
                >
                  {years} Yrs
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Breakdown Card (5 cols) */}
        <div className="lg:col-span-5 rounded-2xl bg-canvas border border-muted/15 p-5 space-y-4">
          <h4 className="font-bold text-xs uppercase tracking-wider text-muted">
            Repayment Summary Breakdown
          </h4>

          <div className="space-y-2.5 text-xs">
            <div className="flex justify-between py-1.5 border-b border-muted/10">
              <span className="text-muted">Principal Loan Amount</span>
              <span className="font-bold text-ink">{formatCurrency(loanAmount)}</span>
            </div>
            <div className="flex justify-between py-1.5 border-b border-muted/10">
              <span className="text-muted">Total Interest Amount</span>
              <span className="font-bold text-amber-900">{formatCurrency(totalInterest)}</span>
            </div>
            <div className="flex justify-between py-1.5 border-b border-muted/10">
              <span className="text-muted">Total Amount Payable</span>
              <span className="font-extrabold text-ink">{formatCurrency(totalPayment)}</span>
            </div>
          </div>

          <div className="rounded-xl bg-surface p-3 border border-muted/10 flex items-center gap-2.5 text-[11px] text-muted">
            <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
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
            <Button size="md" className="w-full text-xs font-bold gap-2">
              <Sparkles className="w-4 h-4" />
              <span>Apply for Low Interest Finance</span>
            </Button>
          </a>
        </div>
      </div>
    </div>
  );
};