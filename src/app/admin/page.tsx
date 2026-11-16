"use client";

import React, { useState } from "react";
import Link from "next/link";
import { formatCurrency, formatPriceCompact } from "@/lib/format";
import { Button } from "@/components/ui/Button";
import {
  ShieldAlert,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  Eye,
  FileCheck,
  Check,
  X,
  Search,
} from "lucide-react";

interface ModerationItem {
  id: string;
  title: string;
  sellerName: string;
  sellerPhone: string;
  city: string;
  priceInr: number;
  reason: string;
  flagType: "new_listing" | "price_anomaly" | "user_report";
  submittedAt: string;
  status: "pending" | "approved" | "rejected";
}

const INITIAL_QUEUE: ModerationItem[] = [
  {
    id: "mod-1",
    title: "2022 Hyundai Creta SX(O) 1.4 Turbo",
    sellerName: "Rajeshwar Iyer",
    sellerPhone: "+91 99201 44512",
    city: "Mumbai",
    priceInr: 1495000,
    reason: "New listing pending initial RC and photo verification.",
    flagType: "new_listing",
    submittedAt: "10 mins ago",
    status: "pending",
  },
  {
    id: "mod-2",
    title: "2023 Mahindra Thar LX Hard Top",
    sellerName: "Karan Johar (Unverified)",
    sellerPhone: "+91 98990 12345",
    city: "Delhi NCR",
    priceInr: 450000,
    reason: "Price anomaly flag: Priced 68% below median market value (Potential scam).",
    flagType: "price_anomaly",
    submittedAt: "25 mins ago",
    status: "pending",
  },
  {
    id: "mod-3",
    title: "2020 Maruti Swift VXi",
    sellerName: "Sanjay Motors",
    sellerPhone: "+91 98450 67890",
    city: "Bengaluru",
    priceInr: 520000,
    reason: "User report: Suspected odometer rollback from 80,000 km to 25,000 km.",
    flagType: "user_report",
    submittedAt: "1 hour ago",
    status: "pending",
  },
];

export default function AdminModerationPage() {
  const [queue, setQueue] = useState<ModerationItem[]>(INITIAL_QUEUE);

  const handleAction = (id: string, action: "approved" | "rejected") => {
    setQueue((prev) =>
      prev.map((item) => (item.id === id ? { ...item, status: action } : item))
    );
  };

  const pendingCount = queue.filter((q) => q.status === "pending").length;

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-muted/15 pb-6">
        <div>
          <div className="flex items-center gap-2">
            <ShieldAlert className="w-5 h-5 text-primary" />
            <h1 className="text-2xl font-black text-ink">Trust &amp; Safety Moderation Queue</h1>
          </div>
          <p className="text-xs text-muted mt-1">
            Internal console &bull; Automated fraud detection, price anomalies, and user flags
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-bold px-3 py-1 rounded-full bg-amber-50 text-amber-900 border border-amber-200">
            {pendingCount} Pending Review
          </span>
        </div>
      </div>

      <div className="rounded-2xl border border-muted/20 bg-surface shadow-xs overflow-hidden">
        <div className="p-4 bg-canvas/70 border-b border-muted/15 flex items-center justify-between">
          <h2 className="text-xs font-bold uppercase tracking-wider text-muted">
            Pending Queue
          </h2>
          <span className="text-xs text-muted">
            Target SLA: Review within 2 hours
          </span>
        </div>

        <div className="divide-y divide-muted/10">
          {queue.map((item) => (
            <div
              key={item.id}
              className={`p-5 flex flex-col md:flex-row md:items-center justify-between gap-4 transition-colors ${
                item.status === "approved"
                  ? "bg-emerald-50/40"
                  : item.status === "rejected"
                  ? "bg-red-50/40 opacity-70"
                  : "hover:bg-canvas/40"
              }`}
            >
              <div className="space-y-1.5 max-w-xl">
                <div className="flex items-center gap-2">
                  <span
                    className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase ${
                      item.flagType === "price_anomaly"
                        ? "bg-red-100 text-red-800"
                        : item.flagType === "user_report"
                        ? "bg-amber-100 text-amber-800"
                        : "bg-teal-100 text-teal-800"
                    }`}
                  >
                    {item.flagType.replace(/_/g, " ")}
                  </span>
                  <span className="text-xs text-muted">{item.submittedAt}</span>
                </div>

                <h3 className="font-bold text-sm text-ink">{item.title}</h3>

                <p className="text-xs text-muted">
                  Seller: <strong>{item.sellerName}</strong> ({item.sellerPhone}) &bull;{" "}
                  {item.city} &bull; Asking:{" "}
                  <strong className="text-ink">{formatPriceCompact(item.priceInr)}</strong>
                </p>

                <p className="text-xs font-medium text-ink bg-canvas p-2.5 rounded-lg border border-muted/10">
                  {item.reason}
                </p>
              </div>

              <div className="flex items-center gap-2 self-end md:self-center shrink-0">
                {item.status === "pending" ? (
                  <>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleAction(item.id, "approved")}
                      className="gap-1 text-emerald-700 border-emerald-300 hover:bg-emerald-50"
                    >
                      <Check className="w-4 h-4" />
                      <span>Approve</span>
                    </Button>
                    <Button
                      size="sm"
                      variant="danger"
                      onClick={() => handleAction(item.id, "rejected")}
                      className="gap-1"
                    >
                      <X className="w-4 h-4" />
                      <span>Reject / Flag</span>
                    </Button>
                  </>
                ) : (
                  <span
                    className={`text-xs font-bold px-3 py-1 rounded-lg ${
                      item.status === "approved"
                        ? "text-emerald-800 bg-emerald-100"
                        : "text-red-800 bg-red-100"
                    }`}
                  >
                    {item.status.toUpperCase()}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
