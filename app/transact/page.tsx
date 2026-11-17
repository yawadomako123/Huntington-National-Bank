"use client";

import React from "react";
import Link from "next/link";

type Action = { label: string; href: string; icon: React.ReactNode };

const actions: Action[] = [
  { label: "Send money", href: "/transfers", icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="22" y1="2" x2="11" y2="13" /><polygon points="22 2 15 22 11 13 2 9 22 2" /></svg> },
  { label: "Pay a bill", href: "/bill-pay", icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 2h9l3 3v17l-2-1.5L14 22l-2-1.5L10 22l-2-1.5L6 22V2z" /><line x1="9" y1="7" x2="15" y2="7" /><line x1="9" y1="11" x2="15" y2="11" /></svg> },
  { label: "Buy airtime", href: "/airtime", icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="7" y="2" width="10" height="20" rx="2" /><path d="M10 6h4" /><path d="M16.5 6.5a4 4 0 0 1 0 5" /></svg> },
  { label: "Data bundles", href: "/airtime", icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="6" y="2" width="12" height="20" rx="2" /><path d="M11 18h2" /></svg> },
  { label: "MoMo transfer", href: "/transfers", icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="7" y="2" width="10" height="20" rx="2" /><path d="M9.5 15l2.5-2.5L14.5 15" /></svg> },
  { label: "Pay someone", href: "/beneficiaries", icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="8" r="4" /><path d="M4 20c0-4 4-6 8-6s8 2 8 6" /></svg> },
  { label: "Buy goods (QR)", href: "/transfers", icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="7" /><rect x="14" y="3" width="7" height="7" /><rect x="3" y="14" width="7" height="7" /><line x1="14" y1="14" x2="14" y2="21" /><line x1="18" y1="14" x2="21" y2="14" /><line x1="18" y1="18" x2="21" y2="21" /></svg> },
  { label: "Deposit", href: "/deposit", icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="7 10 12 15 17 10" /><line x1="12" y1="15" x2="12" y2="3" /></svg> },
];

export default function Transact() {
  return (
    <div>
      <div className="absa-header">
        <span className="absa-header-title">Transact</span>
      </div>
      <div className="container" style={{ paddingTop: "0.75rem" }}>
        <p className="text-secondary" style={{ fontSize: "0.9rem", marginBottom: "1.4rem" }}>
          Move money, pay bills and top up — all in one place.
        </p>
        <div className="tile-grid">
          {actions.map((a) => (
            <Link key={a.label} href={a.href} className="tile">
              <span className="tile-icon">{a.icon}</span>
              <span className="tile-label">{a.label}</span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
