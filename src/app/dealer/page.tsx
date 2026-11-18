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
  MessageCircle,
  ExternalLink,
  ShieldCheck,
  MapPin,
} from "lucide-react";

interface Lead {
  id: string;
  buyerName: string;
  buyerPhone: string;
  buyerLocation: string;
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
    buyerName: "P. Venkata Rao",
    buyerPhone: "+91 98481 23456",
    buyerLocation: "Gajuwaka, Visakhapatnam",
    carTitle: "2022 Toyota Innova Crysta 2.4 ZX 7S",
    carPrice: 2150000,
    message: "Namaskaram! Is this Innova available for showroom test drive this Saturday afternoon? Ready with spot token.",
    status: "new",
    createdAt: new Date(Date.now() - 25 * 60 * 1000).toISOString(),
    responseDueMinutes: 35,
  },
  {
    id: "lead-2",
    buyerName: "K. Suresh Naidu",
    buyerPhone: "+91 98662 87654",
    buyerLocation: "Benz Circle, Vijayawada",
    carTitle: "2022 Hyundai Creta SX(O) Diesel AT",
    carPrice: 1580000,
    message: "Looking to exchange my 2018 Swift for this Creta. Loan already pre-approved with SBI. Please share final quote.",
    status: "contacted",
    createdAt: new Date(Date.now() - 3 * 3600 * 1000).toISOString(),
    responseDueMinutes: 0,
  },
  {
    id: "lead-3",
    buyerName: "Dr. M. Lakshmi",
    buyerPhone: "+91 94405 11223",
    buyerLocation: "MVP Colony, Visakhapatnam",
    carTitle: "2023 Maruti Suzuki Swift ZXi+ Dual Tone",
    carPrice: 725000,
    message: "Please share Parivahan AP 31 RC copy and Varun Motors service history on WhatsApp. Full cash payment.",
    status: "visit",
    createdAt: new Date(Date.now() - 18 * 3600 * 1000).toISOString(),
    responseDueMinutes: 0,
  },
  {
    id: "lead-4",
    buyerName: "B. Satyanarayana",
    buyerPhone: "+91 99891 66778",
    buyerLocation: "Danavaipeta, Rajahmundry",
    carTitle: "2022 Skoda Kushaq 1.5 TSI Style DSG",
    carPrice: 1420000,
    message: "Is the price negotiable if I complete transfer this week? Visiting Dwaraka Nagar showroom tomorrow morning.",
    status: "negotiating",
    createdAt: new Date(Date.now() - 36 * 3600 * 1000).toISOString(),
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
      {/* ── Top Header & Dealership Brand Bar ──────────── */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-muted/15 pb-6">
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <div className="p-2 rounded-xl bg-primary/10 text-primary">
              <Building2 className="w-5 h-5" />
            </div>
            <h1 className="text-2xl font-black text-ink">
              Dealer Management Console
            </h1>
            <span className="rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2.5 py-0.5 border border-emerald-300">
              Verified AP Partner
            </span>
          </div>
          <p className="text-xs text-muted mt-1.5 flex items-center gap-1.5">
            <span className="font-bold text-ink">Sri Venkateswara Car Hub</span>
            <span>&bull;</span>
            <MapPin className="w-3.5 h-3.5 text-primary" />
            <span>Dwaraka Nagar, Visakhapatnam, AP</span>
            <span>&bull;</span>
            <span>AP RTO TC: AP31/TC/2021/8841</span>
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <Link href="/dealers/sri-venkateswara-car-hub-vizag" target="_blank">
            <Button size="sm" variant="outline" className="gap-1.5 text-xs">
              <span>View My Live Web Showroom</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </Button>
          </Link>

          <Link href="/sell/new">
            <Button size="sm" className="gap-1.5 text-xs">
              <Car className="w-4 h-4" />
              <span>Add Vehicle to Lot</span>
            </Button>
          </Link>
        </div>
      </div>

      {/* ── KPI Cards ────────────────────────────────────── */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="rounded-2xl border border-muted/15 bg-surface p-5 space-y-1 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs text-muted font-medium">New Leads Pending</span>
            <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
          </div>
          <p className="text-2xl font-black text-primary font-tabular">
            {newLeadsCount}
          </p>
          <span className="text-[11px] text-muted block">Direct buyer enquiries</span>
        </div>

        <div className="rounded-2xl border border-muted/15 bg-surface p-5 space-y-1 shadow-xs">
          <span className="text-xs text-muted font-medium">Showroom Lot Stock</span>
          <p className="text-2xl font-black text-ink font-tabular">
            6 Cars
          </p>
          <span className="text-[11px] text-emerald-700 font-semibold block">100% 160-point verified</span>
        </div>

        <div className="rounded-2xl border border-muted/15 bg-surface p-5 space-y-1 shadow-xs">
          <span className="text-xs text-muted font-medium">Avg WhatsApp Response</span>
          <p className="text-2xl font-black text-ink font-tabular">
            18 mins
          </p>
          <span className="text-[11px] text-muted block">Target: Under 1 hour</span>
        </div>

        <div className="rounded-2xl border border-muted/15 bg-surface p-5 space-y-1 shadow-xs">
          <span className="text-xs text-muted font-medium">Monthly Views</span>
          <p className="text-2xl font-black text-ink font-tabular">
            3,420
          </p>
          <span className="text-[11px] text-emerald-700 font-semibold block">&uarr; 28% from Coastal AP</span>
        </div>
      </div>

      {/* ── Buyer Inquiries Pipeline ─────────────────────── */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-muted/15 pb-3">
          <div className="flex items-center gap-2">
            <Inbox className="w-4 h-4 text-primary" />
            <h2 className="text-base font-bold text-ink">
              Incoming Buyer Enquiries (Andhra Pradesh)
            </h2>
            <span className="rounded-full bg-primary/10 text-primary text-xs font-bold px-2 py-0.5">
              {leads.length}
            </span>
          </div>

          {/* Filter Tabs */}
          <div className="flex flex-wrap items-center gap-1.5 text-xs">
            {[
              { id: "all", label: "All Leads" },
              { id: "new", label: "New" },
              { id: "contacted", label: "Contacted" },
              { id: "visit", label: "Visit Scheduled" },
              { id: "negotiating", label: "Negotiating" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`rounded-xl px-3 py-1 font-semibold transition-colors ${
                  activeTab === tab.id
                    ? "bg-primary text-white"
                    : "bg-surface border border-muted/15 text-muted hover:text-ink"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Leads List */}
        <div className="space-y-3.5">
          {filteredLeads.map((lead) => {
            const replyMsg = encodeURIComponent(
              `Hello ${lead.buyerName}! This is Sri Venkateswara Car Hub (Visakhapatnam). Thank you for your interest in our ${lead.carTitle}. When would you like to visit our Dwaraka Nagar showroom for a test drive?`
            );
            const waUrl = `https://wa.me/${lead.buyerPhone.replace(/[^0-9]/g, "")}?text=${replyMsg}`;

            return (
              <div
                key={lead.id}
                className="rounded-2xl border border-muted/15 bg-surface p-5 space-y-4 hover:border-primary/40 transition-all shadow-xs"
              >
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                  <div className="space-y-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="font-extrabold text-sm text-ink">{lead.buyerName}</span>
                      <span className="text-xs text-muted">({lead.buyerLocation})</span>
                      {lead.status === "new" && (
                        <span className="rounded-full bg-red-100 text-red-700 text-[10px] font-bold px-2 py-0.5">
                          New Enquiry
                        </span>
                      )}
                      {lead.status === "visit" && (
                        <span className="rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.5">
                          Test Drive
                        </span>
                      )}
                    </div>
                    <p className="text-xs font-semibold text-primary">
                      Interested In: {lead.carTitle} &bull; Asking: {formatPriceCompact(lead.carPrice)}
                    </p>
                  </div>

                  <span className="text-[11px] text-muted shrink-0">
                    Received {formatRelativeTime(lead.createdAt)}
                  </span>
                </div>

                {/* Message Quote */}
                <div className="rounded-xl bg-canvas p-3 text-xs text-ink/90 border border-muted/10 italic">
                  &ldquo;{lead.message}&rdquo;
                </div>

                {/* Action Bar */}
                <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-muted/10">
                  <div className="flex flex-wrap items-center gap-2">
                    <a href={waUrl} target="_blank" rel="noopener noreferrer">
                      <Button size="sm" className="gap-1.5 text-xs bg-[#25D366] hover:bg-[#1EBE5D] text-white border-none">
                        <MessageCircle className="w-3.5 h-3.5" />
                        <span>Reply on WhatsApp</span>
                      </Button>
                    </a>

                    <a href={`tel:${lead.buyerPhone.replace(/\s+/g, "")}`}>
                      <Button size="sm" variant="secondary" className="gap-1.5 text-xs">
                        <PhoneCall className="w-3.5 h-3.5 text-primary" />
                        <span>Call {lead.buyerPhone}</span>
                      </Button>
                    </a>
                  </div>

                  {/* Status update pipeline */}
                  <div className="flex items-center gap-1.5 text-xs text-muted">
                    <span className="text-[11px]">Move stage:</span>
                    <select
                      value={lead.status}
                      onChange={(e) =>
                        handleUpdateStatus(lead.id, e.target.value as Lead["status"])
                      }
                      className="rounded-lg bg-canvas border border-muted/20 px-2 py-1 text-xs font-semibold text-ink focus:outline-none"
                    >
                      <option value="new">New</option>
                      <option value="contacted">Contacted</option>
                      <option value="visit">Test Drive Scheduled</option>
                      <option value="negotiating">Negotiating</option>
                      <option value="won">Sold / Completed</option>
                      <option value="lost">Lost</option>
                    </select>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}