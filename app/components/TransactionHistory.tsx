import React from "react";
import { Transaction } from "../data/mockData";

interface TransactionHistoryProps {
  transactions: Transaction[];
  title?: string;
}

export default function TransactionHistory({ transactions, title = "Recent Activity" }: TransactionHistoryProps) {
  return (
    <div className="card">
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.5rem" }}>
        <h3>{title}</h3>
        <span className="section-title">This Month</span>
      </div>

      <div>
        {transactions.map((tx) => {
          const isDeposit = tx.type === "deposit";
          return (
            <div key={tx.id} className="tx-row">
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
                  <p style={{ fontWeight: 600, margin: 0, fontSize: "0.9rem", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{tx.description}</p>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginTop: "0.15rem" }}>
                    <span className="text-secondary" style={{ fontSize: "0.78rem" }}>
                      {new Date(tx.date).toLocaleDateString(undefined, { month: "short", day: "numeric" })}
                    </span>
                    {tx.category && <span className="text-secondary" style={{ fontSize: "0.78rem" }}>· {tx.category}</span>}
                    {tx.status === "pending" && <span className="badge badge-pending">Pending</span>}
                  </div>
                </div>
              </div>

              <div style={{ textAlign: "right", flexShrink: 0, paddingLeft: "0.5rem" }}>
                <p style={{ fontWeight: 700, margin: 0, fontSize: "0.92rem", color: isDeposit ? "var(--success)" : "var(--text-primary)" }}>
                  {isDeposit ? "+" : "−"}${tx.amount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
