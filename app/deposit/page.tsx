"use client";

import React, { useState } from "react";
import { useBank } from "../context/BankContext";

export default function Deposit() {
  const { accounts, depositCheck } = useBank();

  const [toAccount, setToAccount] = useState("");
  const [amount, setAmount] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!toAccount || !amount) return;

    depositCheck(toAccount, parseFloat(amount));
    setSuccess(true);
    setAmount("");
    setToAccount("");

    setTimeout(() => setSuccess(false), 3000);
  };

  return (
    <div className="container" style={{ maxWidth: "640px" }}>
      <h1 style={{ marginBottom: "0.35rem" }}>Deposit Checks</h1>
      <p className="text-secondary" style={{ fontSize: "0.9rem", marginBottom: "1.75rem" }}>
        Snap a photo of your check to deposit it in seconds.
      </p>

      {success && (
        <div className="card" style={{ background: "rgba(22, 135, 90, 0.08)", borderColor: "var(--success)", marginBottom: "1.5rem" }}>
          <p className="text-success" style={{ fontWeight: 600, margin: 0 }}>✓ Check deposited. Funds are available immediately.</p>
        </div>
      )}

      <form className="card" onSubmit={handleSubmit}>
        <div className="form-group">
          <label className="form-label">Deposit To</label>
          <select className="form-input" value={toAccount} onChange={(e) => setToAccount(e.target.value)} required>
            <option value="">Select account</option>
            {accounts.filter((a) => a.type !== "credit").map((acc) => (
              <option key={acc.id} value={acc.id}>{acc.name} — ${acc.balance.toLocaleString(undefined, { minimumFractionDigits: 2 })}</option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label className="form-label">Check Amount</label>
          <input type="number" className="form-input" placeholder="0.00" min="0.01" step="0.01" value={amount} onChange={(e) => setAmount(e.target.value)} required />
        </div>

        <div className="form-group" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
          {["Front of Check", "Back of Check"].map((label) => (
            <div key={label} style={{ border: "2px dashed var(--border-color)", borderRadius: "var(--radius-md)", padding: "1.75rem 1rem", textAlign: "center", cursor: "pointer", background: "var(--bg-surface-alt)" }}>
              <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="var(--brand-green)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" style={{ marginBottom: "0.5rem" }}><path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z" /><circle cx="12" cy="13" r="3" /></svg>
              <p className="text-secondary" style={{ fontSize: "0.82rem", margin: 0 }}>Upload {label}</p>
            </div>
          ))}
        </div>

        <button type="submit" className="btn-primary" style={{ width: "100%", marginTop: "1rem" }}>
          Deposit Check
        </button>
      </form>
    </div>
  );
}
