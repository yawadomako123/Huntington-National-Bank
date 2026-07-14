"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useBank } from "../context/BankContext";

export default function Transactions() {
  const { transactions } = useBank();
  const [filter, setFilter] = useState<"all" | "deposit" | "withdrawal">("all");
  const [query, setQuery] = useState("");

  const filteredTransactions = transactions
    .filter((tx) => (filter === "all" ? true : tx.type === filter))
    .filter((tx) => tx.description.toLowerCase().includes(query.toLowerCase()));

  const fmt = (n: number) => n.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });

  const chip = (active: boolean) => (active ? "btn-primary" : "btn-outline");

  return (
    <div className="container" style={{ maxWidth: "860px" }}>
      <h1 style={{ marginBottom: "0.35rem" }}>Transactions</h1>
      <p className="text-secondary" style={{ fontSize: "0.9rem", marginBottom: "1.75rem" }}>
        Search and filter all account activity.
      </p>

      <div style={{ display: "flex", gap: "0.75rem", marginBottom: "1.25rem", flexWrap: "wrap" }}>
        <button onClick={() => setFilter("all")} className={chip(filter === "all")}>All</button>
        <button onClick={() => setFilter("deposit")} className={chip(filter === "deposit")}>Money In</button>
        <button onClick={() => setFilter("withdrawal")} className={chip(filter === "withdrawal")}>Money Out</button>
      </div>

      <div className="form-group" style={{ marginBottom: "1.25rem" }}>
        <input
          type="text"
          className="form-input"
          placeholder="Search transactions…"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>

      <div className="card">
        {filteredTransactions.length === 0 ? (
          <p className="text-secondary" style={{ textAlign: "center", padding: "2rem" }}>No transactions found.</p>
        ) : (
          <div>
            {filteredTransactions.map((tx) => {
              const isDeposit = tx.type === "deposit";
              return (
                <Link href={`/transactions/${tx.id}`} key={tx.id} style={{ display: "block", textDecoration: "none", color: "inherit" }}>
                  <div className="tx-row" style={{ cursor: "pointer" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "0.9rem", minWidth: 0 }}>
                      <div
                        className="tx-icon"
                        style={{
                          backgroundColor: isDeposit ? "rgba(22, 135, 90, 0.1)" : "var(--bg-tertiary)",
                          color: isDeposit ? "var(--success)" : "var(--text-secondary)",
                        }}
                      >
                        {isDeposit ? (
                          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="19" x2="12" y2="5"></line><polyline points="5 12 12 5 19 12"></polyline></svg>
                        ) : (
                          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><polyline points="19 12 12 19 5 12"></polyline></svg>
                        )}
                      </div>
                      <div style={{ minWidth: 0 }}>
                        <p style={{ fontWeight: 600, margin: 0, fontSize: "0.9rem" }}>{tx.description}</p>
                        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginTop: "0.15rem" }}>
                          <span className="text-secondary" style={{ fontSize: "0.78rem" }}>
                            {new Date(tx.date).toLocaleDateString(undefined, { weekday: "short", month: "short", day: "numeric", year: "numeric" })}
                          </span>
                          {tx.category && <span className="text-secondary" style={{ fontSize: "0.78rem" }}>· {tx.category}</span>}
                          {tx.status === "pending" && <span className="badge badge-pending">Pending</span>}
                        </div>
                      </div>
                    </div>
                    <div style={{ textAlign: "right", flexShrink: 0, paddingLeft: "0.5rem" }}>
                      <p style={{ fontWeight: 700, margin: 0, fontSize: "0.92rem", color: isDeposit ? "var(--success)" : "var(--text-primary)" }}>
                        {isDeposit ? "+" : "−"}${fmt(tx.amount)}
                      </p>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
