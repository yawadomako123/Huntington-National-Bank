"use client";

import React from "react";
import { useBank } from "../context/BankContext";

export default function PlanAndTrack() {
  const { transactions } = useBank();
  const fmt = (n: number) => n.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });

  // Aggregate spending by category from real transaction data
  const byCategory = transactions
    .filter((t) => t.type === "withdrawal")
    .reduce<Record<string, number>>((acc, t) => {
      const key = t.category || "Other";
      acc[key] = (acc[key] || 0) + t.amount;
      return acc;
    }, {});

  const categories = Object.entries(byCategory).sort((a, b) => b[1] - a[1]);
  const totalSpending = categories.reduce((s, [, v]) => s + v, 0);
  const budget = 4000;
  const pctOfBudget = Math.min(100, Math.round((totalSpending / budget) * 100));

  const palette = ["var(--brand-green)", "#7ac142", "#16875a", "#4d8a1f", "#0c6b3f", "#9db0a7"];

  return (
    <div className="container" style={{ maxWidth: "900px" }}>
      <h1 style={{ marginBottom: "0.35rem" }}>Plan &amp; Track</h1>
      <p className="text-secondary" style={{ fontSize: "0.9rem", marginBottom: "1.75rem" }}>
        Understand your spending and stay on top of your goals.
      </p>

      <div className="hero-panel" style={{ marginBottom: "1.5rem" }}>
        <div style={{ position: "relative", zIndex: 1 }}>
          <p style={{ fontSize: "0.8rem", fontWeight: 600, opacity: 0.85, textTransform: "uppercase", letterSpacing: "0.04em" }}>
            Total Spending
          </p>
          <p style={{ fontSize: "2.4rem", fontWeight: 800, margin: "0.3rem 0 0.75rem" }}>${fmt(totalSpending)}</p>
          <div style={{ height: "8px", borderRadius: "999px", background: "rgba(255,255,255,0.2)", overflow: "hidden", maxWidth: "420px" }}>
            <div style={{ width: `${pctOfBudget}%`, height: "100%", background: "#fff", borderRadius: "999px" }} />
          </div>
          <p style={{ fontSize: "0.82rem", opacity: 0.9, marginTop: "0.5rem" }}>
            {pctOfBudget}% of your ${fmt(budget)} budget · {pctOfBudget < 100 ? "on track" : "over budget"}
          </p>
        </div>
      </div>

      <div className="grid-layout" style={{ gridTemplateColumns: "1fr 1fr" }}>
        <div className="card">
          <h3 className="card-header">Spending by Category</h3>
          <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
            {categories.slice(0, 6).map(([name, value], i) => {
              const pct = Math.round((value / totalSpending) * 100);
              return (
                <li key={name} style={{ marginBottom: "1rem" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.35rem" }}>
                    <span style={{ fontSize: "0.88rem", fontWeight: 500 }}>{name}</span>
                    <strong style={{ fontSize: "0.88rem" }}>${fmt(value)}</strong>
                  </div>
                  <div style={{ height: "6px", borderRadius: "999px", background: "var(--bg-tertiary)", overflow: "hidden" }}>
                    <div style={{ width: `${pct}%`, height: "100%", background: palette[i % palette.length], borderRadius: "999px" }} />
                  </div>
                </li>
              );
            })}
          </ul>
        </div>

        <div className="card">
          <h3 className="card-header">Savings Goals</h3>
          <div style={{ marginBottom: "1.5rem" }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.5rem" }}>
              <span style={{ fontSize: "0.88rem", fontWeight: 500 }}>Emergency Fund</span>
              <span className="text-secondary" style={{ fontSize: "0.85rem" }}>$10,000 / $15,000</span>
            </div>
            <div style={{ width: "100%", height: "8px", background: "var(--bg-tertiary)", borderRadius: "999px", overflow: "hidden" }}>
              <div style={{ width: "66%", height: "100%", background: "var(--success)", borderRadius: "999px" }}></div>
            </div>
          </div>

          <div>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.5rem" }}>
              <span style={{ fontSize: "0.88rem", fontWeight: 500 }}>Vacation</span>
              <span className="text-secondary" style={{ fontSize: "0.85rem" }}>$1,200 / $3,000</span>
            </div>
            <div style={{ width: "100%", height: "8px", background: "var(--bg-tertiary)", borderRadius: "999px", overflow: "hidden" }}>
              <div style={{ width: "40%", height: "100%", background: "var(--brand-green)", borderRadius: "999px" }}></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
