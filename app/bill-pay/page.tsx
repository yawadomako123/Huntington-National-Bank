"use client";

import React, { useState } from "react";
import { useBank } from "../context/BankContext";

export default function BillPay() {
  const { accounts, payBill } = useBank();

  const [fromAccount, setFromAccount] = useState("");
  const [biller, setBiller] = useState("");
  const [amount, setAmount] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fromAccount || !biller || !amount) return;

    payBill(fromAccount, biller, parseFloat(amount));
    setSuccess(true);
    setAmount("");
    setBiller("");

    setTimeout(() => setSuccess(false), 3000);
  };

  return (
    <div className="container" style={{ maxWidth: "640px" }}>
      <h1 style={{ marginBottom: "0.35rem" }}>Bill Pay</h1>
      <p className="text-secondary" style={{ fontSize: "0.9rem", marginBottom: "1.75rem" }}>
        Pay a biller directly from your Vertex account.
      </p>

      {success && (
        <div className="card" style={{ background: "rgba(22, 135, 90, 0.08)", borderColor: "var(--success)", marginBottom: "1.5rem" }}>
          <p className="text-success" style={{ fontWeight: 600, margin: 0 }}>✓ Bill paid successfully.</p>
        </div>
      )}

      <form className="card" onSubmit={handleSubmit}>
        <div className="card-header">
          <h3 style={{ margin: 0 }}>Pay a New Bill</h3>
        </div>

        <div className="form-group">
          <label className="form-label">Pay From</label>
          <select className="form-input" value={fromAccount} onChange={(e) => setFromAccount(e.target.value)} required>
            <option value="">Select account</option>
            {accounts.filter((a) => a.type !== "credit").map((acc) => (
              <option key={acc.id} value={acc.id}>{acc.name} — ${acc.balance.toLocaleString(undefined, { minimumFractionDigits: 2 })}</option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label className="form-label">Biller Name</label>
          <input type="text" className="form-input" placeholder="e.g. City Power & Light" value={biller} onChange={(e) => setBiller(e.target.value)} required />
        </div>

        <div className="form-group">
          <label className="form-label">Amount</label>
          <input type="number" className="form-input" placeholder="0.00" min="0.01" step="0.01" value={amount} onChange={(e) => setAmount(e.target.value)} required />
        </div>

        <button type="submit" className="btn-primary" style={{ width: "100%", marginTop: "0.5rem" }}>
          Submit Payment
        </button>
      </form>
    </div>
  );
}
