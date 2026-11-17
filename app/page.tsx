"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useBank } from "./context/BankContext";

const cedi = (n: number) => `GH₵${n.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

const quickActions = [
  {
    label: "Pay a bill", href: "/bill-pay", cls: "c1",
    icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 2h9l3 3v17l-2-1.5L14 22l-2-1.5L10 22l-2-1.5L6 22V2z" /><line x1="9" y1="7" x2="15" y2="7" /><line x1="9" y1="11" x2="15" y2="11" /></svg>,
  },
  {
    label: "Data bundles", href: "/airtime", cls: "c2",
    icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="6" y="2" width="12" height="20" rx="2" /><path d="M11 18h2" /></svg>,
  },
  {
    label: "Airtime", href: "/airtime", cls: "c3",
    icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 18h.01" /><rect x="7" y="2" width="10" height="20" rx="2" /><path d="M16.5 6.5a4 4 0 0 1 0 5" /></svg>,
  },
  {
    label: "MoMo", href: "/transfers", cls: "c4",
    icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="7" y="2" width="10" height="20" rx="2" /><path d="M10 6h4" /><path d="M9.5 15l2.5-2.5L14.5 15" /></svg>,
  },
  {
    label: "ATM", href: "/atm-locator", cls: "c5",
    icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="4" width="20" height="16" rx="2" /><line x1="2" y1="10" x2="22" y2="10" /><line x1="7" y1="15" x2="9" y2="15" /></svg>,
  },
];

export default function Home() {
  const { user, accounts } = useBank();
  const [hidden, setHidden] = useState(false);

  const current = accounts.filter((a) => a.type !== "credit");

  return (
    <div>
      {/* Greeting */}
      <div style={{ textAlign: "center", padding: "1.6rem 1rem 1.1rem" }}>
        <h1 style={{ fontSize: "1.6rem", fontWeight: 800 }}>Hello {user.firstName}</h1>
      </div>

      {/* Quick action rail */}
      <div className="qa-rail" style={{ paddingLeft: "1.1rem", paddingRight: "1.1rem" }}>
        {quickActions.map((qa) => (
          <Link key={qa.label} href={qa.href} className="qa-item">
            <span className={`qa-circle ${qa.cls}`}>{qa.icon}</span>
            <span className="qa-label">{qa.label}</span>
          </Link>
        ))}
      </div>

      <div className="container" style={{ paddingTop: "1.1rem" }}>
        {/* Promo card */}
        <Link href="/explore" className="promo-card" style={{ marginBottom: "2rem" }}>
          <div style={{ maxWidth: "62%" }}>
            <h3 style={{ color: "#fff", fontSize: "1.2rem", marginBottom: "0.5rem" }}>Explore Visa benefits and offers</h3>
            <p style={{ fontSize: "0.85rem", opacity: 0.92 }}>Easily redeem exclusive offers, deals and premium services.</p>
          </div>
          <div style={{
            width: "92px", height: "58px", borderRadius: "8px",
            background: "linear-gradient(135deg, #1a1a1a, #333)",
            display: "flex", flexDirection: "column", justifyContent: "space-between", padding: "0.5rem",
            flexShrink: 0, border: "1px solid rgba(255,255,255,0.15)",
          }}>
            <span style={{ fontSize: "0.6rem", fontWeight: 700 }}>(absa)</span>
            <span style={{ fontSize: "0.7rem", fontStyle: "italic", fontWeight: 800, alignSelf: "flex-end" }}>VISA</span>
          </div>
        </Link>

        {/* Current and Savings */}
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: "0.6rem", marginBottom: "1.1rem", position: "relative" }}>
          <h3 style={{ fontSize: "1.1rem" }}>Current and Savings</h3>
          <button
            aria-label={hidden ? "Show balances" : "Hide balances"}
            onClick={() => setHidden((h) => !h)}
            style={{ position: "absolute", right: 0, color: "var(--text-secondary)" }}
          >
            {hidden ? (
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17.94 17.94A10 10 0 0 1 12 20c-7 0-11-8-11-8a18 18 0 0 1 5.06-5.94M9.9 4.24A9 9 0 0 1 12 4c7 0 11 8 11 8a18 18 0 0 1-2.16 3.19" /><line x1="1" y1="1" x2="23" y2="23" /></svg>
            ) : (
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle cx="12" cy="12" r="3" /></svg>
            )}
          </button>
        </div>

        <div style={{ display: "grid", gap: "1rem" }}>
          {current.map((acc) => (
            <Link key={acc.id} href="/accounts" className="acct-card card-hover">
              <div className="acct-card-head">{acc.name}</div>
              <div className="acct-card-body">
                <span className="text-secondary" style={{ fontSize: "1.05rem", letterSpacing: "0.02em" }}>{acc.accountNumber}</span>
                <div style={{ textAlign: "right" }}>
                  <p className="text-secondary" style={{ fontSize: "0.8rem", marginBottom: "0.1rem" }}>Available</p>
                  <p style={{ fontSize: "1.4rem", fontWeight: 800 }}>
                    {hidden ? "GH₵ ••••" : cedi(acc.available)}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <Link href="/transactions" className="link-btn" style={{ display: "inline-flex", marginTop: "1.5rem" }}>
          View recent activity
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="9 18 15 12 9 6" /></svg>
        </Link>
      </div>
    </div>
  );
}
