import React from "react";

interface BalanceCardProps {
  balance: number;
}

export default function BalanceCard({ balance }: BalanceCardProps) {
  return (
    <div className="card">
      <h3 className="text-secondary" style={{ marginBottom: "0.5rem", fontWeight: 500 }}>Available Balance</h3>
      <h1 style={{ fontSize: "3rem", fontWeight: 700, margin: "0.5rem 0" }}>
        ${balance.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
      </h1>
      <p className="text-success" style={{ fontSize: "0.875rem", fontWeight: 500 }}>
        + $1,200.00 this month
      </p>
    </div>
  );
}
