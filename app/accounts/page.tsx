"use client";

import React from "react";
import { useBank } from "../context/BankContext";

export default function Accounts() {
  const { accounts } = useBank();
  const fmt = (n: number) => n.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });

  const label = (t: string) => (t === "credit" ? "Credit Card" : t === "savings" ? "Savings Account" : "Checking Account");

  return (
    <div className="container">
      <h1 style={{ marginBottom: "0.35rem" }}>Your Accounts</h1>
      <p className="text-secondary" style={{ fontSize: "0.9rem", marginBottom: "1.75rem" }}>
        Overview of all your Vertex National Bank accounts.
      </p>

      <div style={{ display: "grid", gap: "1.25rem" }}>
        {accounts.map((account) => (
          <div key={account.id} className="card card-hover">
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: "1rem" }}>
              <div>
                <span className="pill">{label(account.type)}</span>
                <h3 style={{ margin: "0.6rem 0 0.25rem" }}>{account.name}</h3>
                <p className="text-secondary" style={{ fontSize: "0.85rem" }}>
                  Account {account.accountNumber} · Routing {account.routingNumber}
                </p>
              </div>
              <div style={{ textAlign: "right" }}>
                <p className="text-secondary" style={{ fontSize: "0.78rem", textTransform: "uppercase", letterSpacing: "0.05em" }}>
                  {account.type === "credit" ? "Current Balance" : "Available Balance"}
                </p>
                <h2 style={{ color: account.type === "credit" && account.balance < 0 ? "var(--danger)" : "var(--text-primary)", margin: "0.15rem 0" }}>
                  {account.type === "credit" && account.balance < 0 ? "−" : ""}${fmt(Math.abs(account.balance))}
                </h2>
                {account.apy && (
                  <span className="text-success" style={{ fontSize: "0.8rem", fontWeight: 600 }}>{account.apy}% APY</span>
                )}
                {account.creditLimit && (
                  <span className="text-secondary" style={{ fontSize: "0.8rem" }}>${fmt(account.available)} available of ${fmt(account.creditLimit)}</span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
