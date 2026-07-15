"use client";

import React from "react";
import Link from "next/link";
import { useBank } from "./context/BankContext";
import TransactionHistory from "./components/TransactionHistory";

function AccountIcon({ type }: { type: string }) {
  const map: Record<string, { bg: string; color: string; path: React.ReactNode }> = {
    checking: {
      bg: "rgba(0, 105, 60, 0.1)",
      color: "var(--brand-green)",
      path: <><rect x="2" y="5" width="20" height="14" rx="2" /><line x1="2" y1="10" x2="22" y2="10" /></>,
    },
    savings: {
      bg: "rgba(122, 193, 66, 0.16)",
      color: "#4d8a1f",
      path: <><path d="M19 5c-1.5 0-2.8 1.4-3 2-3.5-1.5-11-.3-11 5 0 1.8 0 3 2 4.5V20h4v-2h3v2h4v-4c1-.5 1.7-1 2-2h2v-4h-2c0-1-.5-1.5-1-2V5z" /><line x1="16" y1="11" x2="16" y2="11.01" /></>,
    },
    credit: {
      bg: "rgba(0, 105, 60, 0.1)",
      color: "var(--brand-green)",
      path: <><rect x="1" y="4" width="22" height="16" rx="2" /><line x1="1" y1="10" x2="23" y2="10" /></>,
    },
  };
  const cfg = map[type] || map.checking;
  return (
    <div className="account-icon" style={{ background: cfg.bg, color: cfg.color }}>
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">{cfg.path}</svg>
    </div>
  );
}

export default function Home() {
  const { user, accounts, transactions } = useBank();

  const totalBalance = accounts
    .filter((a) => a.type !== "credit")
    .reduce((sum, a) => sum + a.balance, 0);

  const monthlyIn = transactions
    .filter((t) => t.type === "deposit" && new Date(t.date).getMonth() === 6)
    .reduce((s, t) => s + t.amount, 0);
  const monthlyOut = transactions
    .filter((t) => t.type === "withdrawal" && new Date(t.date).getMonth() === 6)
    .reduce((s, t) => s + t.amount, 0);

  const fmt = (n: number) => n.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });

  return (
    <div className="container">
      {/* Greeting */}
      <div style={{ marginBottom: "1.5rem" }}>
        <h1 style={{ marginBottom: "0.25rem" }}>Good afternoon, {user.firstName}</h1>
        <p className="text-secondary" style={{ fontSize: "0.9rem" }}>
          Last signed in {new Date(user.lastSignIn).toLocaleString(undefined, { month: "long", day: "numeric", hour: "numeric", minute: "2-digit" })}
        </p>
      </div>

      <div className="grid-layout">
        {/* Left column */}
        <div>
          {/* Hero balance */}
          <div className="hero-panel" style={{ marginBottom: "1.5rem" }}>
            <div style={{ position: "relative", zIndex: 1 }}>
              <p style={{ fontSize: "0.8rem", fontWeight: 600, opacity: 0.85, letterSpacing: "0.04em", textTransform: "uppercase" }}>
                Total Available Balance
              </p>
              <div style={{ display: "flex", alignItems: "baseline", gap: "0.5rem", margin: "0.4rem 0 1.25rem" }}>
                <span style={{ fontSize: "clamp(1.8rem, 8vw, 2.6rem)", fontWeight: 800, letterSpacing: "-0.03em", wordBreak: "break-word" }}>${fmt(totalBalance)}</span>
              </div>
              <div style={{ display: "flex", gap: "2rem", flexWrap: "wrap" }}>
                <div>
                  <p style={{ fontSize: "0.72rem", opacity: 0.8, textTransform: "uppercase", letterSpacing: "0.05em" }}>Money In · Jul</p>
                  <p style={{ fontSize: "1.05rem", fontWeight: 700 }}>+${fmt(monthlyIn)}</p>
                </div>
                <div>
                  <p style={{ fontSize: "0.72rem", opacity: 0.8, textTransform: "uppercase", letterSpacing: "0.05em" }}>Money Out · Jul</p>
                  <p style={{ fontSize: "1.05rem", fontWeight: 700 }}>−${fmt(monthlyOut)}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Accounts */}
          <div className="card" style={{ marginBottom: "1.5rem" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.75rem" }}>
              <h3>Your Accounts</h3>
              <Link href="/accounts" className="text-brand" style={{ fontSize: "0.85rem", fontWeight: 600 }}>View all</Link>
            </div>

            <div>
              {accounts.map((acc) => (
                <Link href="/accounts" key={acc.id} className="account-row">
                  <div style={{ display: "flex", alignItems: "center", gap: "0.9rem", minWidth: 0, paddingRight: "0.5rem" }}>
                    <AccountIcon type={acc.type} />
                    <div style={{ minWidth: 0 }}>
                      <p style={{ fontWeight: 600, fontSize: "0.92rem", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{acc.name}</p>
                      <p className="text-secondary" style={{ fontSize: "0.8rem", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                        {acc.type === "credit" ? "Credit Card" : acc.type === "savings" ? "Savings" : "Checking"} · {acc.accountNumber}
                        {acc.apy ? ` · ${acc.apy}% APY` : ""}
                      </p>
                    </div>
                  </div>
                  <div style={{ textAlign: "right", flexShrink: 0 }}>
                    <p style={{ fontWeight: 700, fontSize: "1rem", color: acc.type === "credit" ? "var(--danger)" : "var(--text-primary)" }}>
                      {acc.type === "credit" && acc.balance < 0 ? "−" : ""}${fmt(Math.abs(acc.balance))}
                    </p>
                    <p className="text-secondary" style={{ fontSize: "0.75rem" }}>
                      {acc.type === "credit" ? "Current balance" : "Available"}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          <TransactionHistory transactions={transactions.slice(0, 6)} />
        </div>

        {/* Right column */}
        <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
          <div className="card">
            <h3 style={{ marginBottom: "1.1rem" }}>Quick Actions</h3>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem" }}>
              <Link href="/transfers" className="quick-action-link">
                <div className="btn-icon">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="17 1 21 5 17 9"></polyline><path d="M3 11V9a4 4 0 0 1 4-4h14"></path><polyline points="7 23 3 19 7 15"></polyline><path d="M21 13v2a4 4 0 0 1-4 4H3"></path></svg>
                </div>
                <span style={{ fontSize: "0.82rem", fontWeight: 600 }}>Transfer</span>
              </Link>

              <Link href="/transfers" className="quick-action-link">
                <div className="btn-icon">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>
                </div>
                <span style={{ fontSize: "0.82rem", fontWeight: 600 }}>Send Money</span>
              </Link>

              <Link href="/bill-pay" className="quick-action-link">
                <div className="btn-icon">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="5" width="20" height="14" rx="2"></rect><line x1="2" y1="10" x2="22" y2="10"></line></svg>
                </div>
                <span style={{ fontSize: "0.82rem", fontWeight: 600 }}>Pay Bills</span>
              </Link>

              <Link href="/deposit" className="quick-action-link">
                <div className="btn-icon">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="17 8 12 3 7 8"></polyline><line x1="12" y1="3" x2="12" y2="15"></line></svg>
                </div>
                <span style={{ fontSize: "0.82rem", fontWeight: 600 }}>Deposit</span>
              </Link>
            </div>
          </div>

          {/* Credit card utilization mini-card */}
          {accounts.filter((a) => a.type === "credit").map((acc) => {
            const used = Math.abs(acc.balance);
            const limit = acc.creditLimit || used;
            const pct = Math.min(100, Math.round((used / limit) * 100));
            return (
              <div className="card" key={acc.id}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: "0.75rem" }}>
                  <h3 style={{ fontSize: "1rem" }}>Credit Card</h3>
                  <span className="text-secondary" style={{ fontSize: "0.78rem" }}>{acc.accountNumber}</span>
                </div>
                <p className="text-secondary" style={{ fontSize: "0.8rem" }}>Available credit</p>
                <p style={{ fontWeight: 700, fontSize: "1.4rem", marginBottom: "0.75rem" }}>${fmt(acc.available)}</p>
                <div style={{ height: "8px", borderRadius: "999px", background: "var(--bg-tertiary)", overflow: "hidden" }}>
                  <div style={{ width: `${pct}%`, height: "100%", background: "var(--brand-green)", borderRadius: "999px" }} />
                </div>
                <p className="text-secondary" style={{ fontSize: "0.75rem", marginTop: "0.5rem" }}>
                  ${fmt(used)} of ${fmt(limit)} used ({pct}%)
                </p>
              </div>
            );
          })}

          <div className="hero-panel">
            <div style={{ position: "relative", zIndex: 1 }}>
              <h3 style={{ color: "#fff", marginBottom: "0.5rem" }}>Plan & Track</h3>
              <p style={{ fontSize: "0.85rem", marginBottom: "1.25rem", opacity: 0.9 }}>
                See where your money goes and build a budget to reach your goals.
              </p>
              <Link href="/plan-and-track" className="btn-primary" style={{ background: "#fff", color: "var(--brand-green)", width: "100%" }}>
                View Spending Summary
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
