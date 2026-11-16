"use client";

import React, { useState } from "react";
import Link from "next/link";
import { formatCurrency, formatPriceCompact, formatRelativeTime } from "@/lib/format";
import { Button } from "@/components/ui/Button";
import {
  Inbox,
  Clock,
  CheckCircle2,
  PhoneCall,
  Calendar,
  AlertCircle,
  Building2,
  TrendingUp,
  Car,
  Filter,
} from "lucide-react";

interface Lead {
  id: string;
  buyerName: string;
  buyerPhone: string;
  carTitle: string;
  carPrice: number;
  message: string;
  status: "new" | "contacted" | "visit" | "negotiating" | "won" | "lost";
  createdAt: string;
  responseDueMinutes: number;
}

const INITIAL_LEADS: Lead[] = [
  {
    id: "lead-1",
    buyerName: "Vikram Malhotra",
    buyerPhone: "+91 98111 23456",
    carTitle: "2021 Maruti Suzuki Swift ZXi+",
    carPrice: 665000,
    message: "Hi, is this car available for test drive this Saturday in South Extension?",
    status: "new",
    createdAt: new Date(Date.now() - 25 * 60 * 1000).toISOString(),
    responseDueMinutes: 35,
  },
  {
    id: "lead-2",
    buyerName: "Dr. Ananya Sen",
    buyerPhone: "+91 98200 87654",
    carTitle: "2022 Hyundai Creta SX(O) 1.4 Turbo",
    carPrice: 1495000,
    message: "Looking to inspect the car on Tuesday afternoon. Please confirm address.",
    status: "contacted",
    createdAt: new Date(Date.now() - 3 * 3600 * 1000).toISOString(),
    responseDueMinutes: 0,
  },
  {
    id: "lead-3",
    buyerName: "Gautam Reddy",
    buyerPhone: "+91 99887 11223",
    carTitle: "2023 Mahindra Thar LX Hard Top",
    carPrice: 1545000,
    message: "Negotiable on cash down payment? Loan is already pre-approved.",
    status: "negotiating",
    createdAt: new Date(Date.now() - 24 * 3600 * 1000).toISOString(),
    responseDueMinutes: 0,
  },
];

export default function DealerPortalPage() {
  const [leads, setLeads] = useState<Lead[]>(INITIAL_LEADS);
  const [activeTab, setActiveTab] = useState<string>("all");

  const handleUpdateStatus = (id: string, newStatus: Lead["status"]) => {
    setLeads((prev) =>
      prev.map((l) => (l.id === id ? { ...l, status: newStatus } : l))
    );
  };

  const filteredLeads =
    activeTab === "all" ? leads : leads.filter((l) => l.status === activeTab);

  const newLeadsCount = leads.filter((l) => l.status === "new").length;

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 space-y-8">
      {/* ── Top Header & Stats ─────────────────────────── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-muted/15 pb-6">
        <div>
          <div className="flex items-center gap-2">
            <Building2 className="w-5 h-5 text-primary" />
            <h1 className="text-2xl font-black text-ink">
              Dealer Management Console
            </h1>
          </div>
          <p className="text-xs text-muted mt-1">
            Capital Motocorp Prime &bull; Dealership ID: dl-wheels-01 &bull; Delhi NCR
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link href="/sell/new">
            <Button size="sm" className="gap-1.5">
              <Car className="w-4 h-4" />
              <span>Add Vehicle</span>
            </Button>
          </Link>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="rounded-2xl border border-muted/15 bg-surface p-5 space-y-1">
          <span className="text-xs text-muted font-medium">New Leads Pending</span>
          <p className="text-2xl font-black text-primary font-tabular">
            {newLeadsCount}
          </p>
          <span className="text-[11px] text-emerald-600 font-semibold">
            Action required within 1 hour
          </span>
        </div>

        <div className="rounded-2xl border border-muted/15 bg-surface p-5 space-y-1">
          <span className="text-xs text-muted font-medium">Median Response Time</span>
          <p className="text-2xl font-black text-ink font-tabular">0.5 hrs</p>
          <span className="text-[11px] text-emerald-600 font-semibold">
            Top 5% among Delhi dealers
          </span>
        </div>

        <div className="rounded-2xl border border-muted/15 bg-surface p-5 space-y-1">
          <span className="text-xs text-muted font-medium">Listing Accuracy</span>
          <p className="text-2xl font-black text-emerald-700 font-tabular">99%</p>
          <span className="text-[11px] text-muted">Zero inaccurate price flags</span>
        </div>

        <div className="rounded-2xl border border-muted/15 bg-surface p-5 space-y-1">
          <span className="text-xs text-muted font-medium">Live Inventory</span>
          <p className="text-2xl font-black text-ink font-tabular">18 Cars</p>
          <span className="text-[11px] text-muted">14 Partner Checked</span>
        </div>
      </div>

      {/* ── Leads Pipeline Inbox ───────────────────────── */}
      <div className="rounded-2xl border border-muted/20 bg-surface shadow-xs overflow-hidden">
        <div className="p-5 border-b border-muted/15 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Inbox className="w-5 h-5 text-primary" />
            <h2 className="font-bold text-base text-ink">Inquiries &amp; Leads</h2>
          </div>

          {/* Filter Status Tabs */}
          <div className="flex flex-wrap gap-1.5 text-xs">
            {["all", "new", "contacted", "visit", "negotiating"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-3 py-1.5 rounded-xl font-semibold capitalize transition-colors ${
                  activeTab === tab
                    ? "bg-primary text-white"
                    : "bg-canvas text-muted hover:text-ink"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Leads Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-canvas/70 border-b border-muted/15 text-muted font-bold">
              <tr>
                <th className="p-4">Buyer Contact</th>
                <th className="p-4">Vehicle Inquired</th>
                <th className="p-4">Buyer Message</th>
                <th className="p-4">Received</th>
                <th className="p-4">Pipeline Status</th>
                <th className="p-4">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-muted/10">
              {filteredLeads.map((lead) => (
                <tr key={lead.id} className="hover:bg-canvas/40 transition-colors">
                  <td className="p-4">
                    <p className="font-bold text-ink">{lead.buyerName}</p>
                    <p className="text-primary font-mono mt-0.5">{lead.buyerPhone}</p>
                  </td>
                  <td className="p-4">
                    <p className="font-bold text-ink">{lead.carTitle}</p>
                    <p className="text-muted">{formatPriceCompact(lead.carPrice)}</p>
                  </td>
                  <td className="p-4 max-w-xs">
                    <p className="text-muted line-clamp-2 leading-relaxed">
                      &ldquo;{lead.message}&rdquo;
                    </p>
                  </td>
                  <td className="p-4 text-muted whitespace-nowrap">
                    {formatRelativeTime(lead.createdAt)}
                  </td>
                  <td className="p-4">
                    <select
                      value={lead.status}
                      onChange={(e) =>
                        handleUpdateStatus(lead.id, e.target.value as any)
                      }
                      className="rounded-lg border border-muted/20 bg-surface px-2.5 py-1 text-xs font-semibold text-ink"
                    >
                      <option value="new">New (Uncontacted)</option>
                      <option value="contacted">Contacted</option>
                      <option value="visit">Viewing Scheduled</option>
                      <option value="negotiating">Negotiating</option>
                      <option value="won">Sold (Won)</option>
                      <option value="lost">Lost</option>
                    </select>
                  </td>
                  <td className="p-4">
                    <a
                      href={`tel:${lead.buyerPhone.replace(/\s+/g, "")}`}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-primary text-white font-semibold hover:bg-primary-600 transition-colors"
                    >
                      <PhoneCall className="w-3.5 h-3.5" />
                      <span>Call</span>
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
