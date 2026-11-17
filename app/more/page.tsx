"use client";

import React from "react";
import Link from "next/link";
import { signOut } from "next-auth/react";

type Item = { label: string; href?: string; chevron?: boolean; action?: "logout"; icon: React.ReactNode };

const ic = {
  beneficiaries: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="9" cy="8" r="3" /><path d="M3 20c0-3 3-5 6-5s6 2 6 5" /><circle cx="17" cy="9" r="2.2" /><path d="M16 15c3 0 5 2 5 5" /></svg>,
  history: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="14" height="16" rx="2" /><path d="M7 20h14V8" /><line x1="7" y1="9" x2="13" y2="9" /><line x1="7" y1="13" x2="13" y2="13" /></svg>,
  card: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="5" width="20" height="14" rx="2" /><line x1="2" y1="10" x2="22" y2="10" /><line x1="6" y1="15" x2="9" y2="15" /></svg>,
  limits: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="5" width="20" height="14" rx="2" /><circle cx="17" cy="9" r="2.2" /></svg>,
  recurring: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" /><line x1="3" y1="9" x2="21" y2="9" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="16" y1="2" x2="16" y2="6" /></svg>,
  requests: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M4 14s0-5 8-5 8 5 8 5" /><circle cx="12" cy="7" r="0" /><path d="M8 14l2 2 5-5" /></svg>,
  invest: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22V9" /><path d="M12 9c0-3 2-5 5-5-0 3-2 5-5 5z" /><path d="M12 12c0-3-2-5-5-5 0 3 2 5 5 5z" /></svg>,
  atm: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M12 21s-7-5-7-11a7 7 0 0 1 14 0c0 6-7 11-7 11z" /><circle cx="12" cy="10" r="2.5" /></svg>,
  contact: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M4 11a8 8 0 0 1 16 0v4a2 2 0 0 1-2 2h-1v-6h3M4 11v4a2 2 0 0 0 2 2h1v-6H4" /></svg>,
  settings: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><line x1="4" y1="7" x2="20" y2="7" /><circle cx="9" cy="7" r="2.2" fill="var(--bg-primary)" /><line x1="4" y1="17" x2="20" y2="17" /><circle cx="15" cy="17" r="2.2" fill="var(--bg-primary)" /></svg>,
  logout: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" /><polyline points="16 17 21 12 16 7" /><line x1="21" y1="12" x2="9" y2="12" /></svg>,
};

const bank: Item[] = [
  { label: "Beneficiaries", href: "/beneficiaries", icon: ic.beneficiaries },
  { label: "Transaction history", href: "/transactions", icon: ic.history },
  { label: "Card Management", href: "/cards", icon: ic.card },
  { label: "Transaction limits", href: "/limits", icon: ic.limits },
  { label: "Recurring payments", href: "/recurring", icon: ic.recurring },
  { label: "Product & Service Requests", href: "/explore", icon: ic.requests },
];
const apply: Item[] = [
  { label: "Investments", href: "/explore", chevron: true, icon: ic.invest },
];
const support: Item[] = [
  { label: "ATM and branch locator", href: "/atm-locator", icon: ic.atm },
  { label: "Contact us", href: "/contact", icon: ic.contact },
  { label: "Settings", href: "/profile", icon: ic.settings },
  { label: "Log out", action: "logout", icon: ic.logout },
];

function Row({ item, onLogout }: { item: Item; onLogout: () => void }) {
  const inner = (
    <>
      <span className="menu-row-icon">{item.icon}</span>
      <span className="menu-row-label">{item.label}</span>
      {item.chevron && (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--text-secondary)" strokeWidth="2"><polyline points="9 18 15 12 9 6" /></svg>
      )}
    </>
  );
  if (item.action === "logout") {
    return <button className="menu-row" onClick={onLogout}>{inner}</button>;
  }
  return <Link href={item.href || "#"} className="menu-row">{inner}</Link>;
}

export default function More() {
  const onLogout = () => signOut({ callbackUrl: "/login" });

  return (
    <div>
      <div className="absa-header">
        <span className="absa-header-title">More</span>
      </div>
      <div className="container" style={{ paddingTop: "0.5rem" }}>
        <p className="menu-section-label" style={{ paddingTop: "0.5rem" }}>Bank</p>
        {bank.map((i) => <Row key={i.label} item={i} onLogout={onLogout} />)}

        <p className="menu-section-label">Apply</p>
        {apply.map((i) => <Row key={i.label} item={i} onLogout={onLogout} />)}

        <p className="menu-section-label">Support</p>
        {support.map((i) => <Row key={i.label} item={i} onLogout={onLogout} />)}
      </div>
    </div>
  );
}
