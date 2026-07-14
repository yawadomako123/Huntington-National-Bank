"use client";

import React, { useState } from "react";
import { useBank } from "../context/BankContext";
import { useRouter } from "next/navigation";

export default function Transfers() {
  const { accounts, transferFunds } = useBank();
  const router = useRouter();

  const [activeTab, setActiveTab] = useState<"internal" | "external" | "zelle">("external");

  const [fromAccount, setFromAccount] = useState("");
  const [toAccount, setToAccount] = useState("");
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fromAccount || !toAccount || !amount) return;

    let transferDesc = description;
    if (activeTab === "external") {
      transferDesc = description ? `External Transfer: ${description}` : `External Transfer to Account ${toAccount}`;
    } else if (activeTab === "zelle") {
      transferDesc = description ? `Zelle to ${toAccount}: ${description}` : `Zelle to ${toAccount}`;
    } else {
      transferDesc = description || "Internal Transfer";
    }

    transferFunds(fromAccount, toAccount, parseFloat(amount), transferDesc);
    setSuccess(true);
    setAmount("");
    setDescription("");

    setTimeout(() => {
      router.push("/transactions");
    }, 1500);
  };

  type TabType = {
    id: "internal" | "external" | "zelle";
    label: string;
    icon?: string;
  };

  const tabs: TabType[] = [
    { id: "internal", label: "Internal" },
    { id: "external", label: "External Account" },
    { id: "zelle", label: "Send with Zelle", icon: "Z" }
  ];

  return (
    <div className="container" style={{ maxWidth: "600px", marginTop: "2rem" }}>
      <h1 style={{ marginBottom: "2rem" }}>Pay & Transfer</h1>

      <div style={{ display: "flex", gap: "0.5rem", marginBottom: "2rem", borderBottom: "1px solid var(--border-solid)", flexWrap: "wrap" }}>
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => {
              setActiveTab(tab.id);
              setToAccount("");
            }}
            style={{
              padding: "0.75rem 1.25rem",
              borderBottom: activeTab === tab.id ? (tab.id === "zelle" ? "3px solid #741BE1" : "3px solid var(--accent-secondary)") : "3px solid transparent",
              color: activeTab === tab.id ? "var(--text-primary)" : "var(--text-secondary)",
              fontWeight: activeTab === tab.id ? 600 : 500,
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
              background: "none"
            }}
          >
            {tab.icon && <span style={{ backgroundColor: "#741BE1", color: "white", padding: "0 6px", borderRadius: "4px", fontWeight: "bold", fontSize: "0.8rem" }}>{tab.icon}</span>}
            {tab.label}
          </button>
        ))}
      </div>

      {success && (
        <div className="card" style={{ backgroundColor: "rgba(5, 150, 105, 0.1)", borderColor: "var(--success)", marginBottom: "2rem", padding: "1rem" }}>
          <p className="text-success" style={{ fontWeight: 600, margin: 0, textAlign: "center" }}>Transfer successful! Redirecting...</p>
        </div>
      )}

      <form className="card" onSubmit={handleSubmit}>
        <div className="form-group">
          <label className="form-label">From Account</label>
          <select className="form-input" value={fromAccount} onChange={e => setFromAccount(e.target.value)} required>
            <option value="">Select Account</option>
            {accounts.filter(a => a.type !== "credit").map(acc => (
              <option key={acc.id} value={acc.id}>{acc.name} - ${acc.balance.toLocaleString(undefined, { minimumFractionDigits: 2 })}</option>
            ))}
          </select>
        </div>

        {activeTab === "internal" ? (
          <div className="form-group">
            <label className="form-label">To Account</label>
            <select className="form-input" value={toAccount} onChange={e => setToAccount(e.target.value)} required>
              <option value="">Select Recipient Account</option>
              {accounts.map(acc => (
                <option key={`to_${acc.id}`} value={acc.id}>{acc.name}</option>
              ))}
            </select>
          </div>
        ) : activeTab === "external" ? (
          <div className="form-group">
            <label className="form-label">Recipient Account Number</label>
            <input
              type="text"
              className="form-input"
              placeholder="Enter account number"
              value={toAccount}
              onChange={e => setToAccount(e.target.value)}
              required
            />
          </div>
        ) : (
          <div className="form-group">
            <label className="form-label">Send To (Email or Mobile)</label>
            <input
              type="text"
              className="form-input"
              placeholder="e.g. john@example.com"
              value={toAccount}
              onChange={e => setToAccount(e.target.value)}
              required
            />
          </div>
        )}

        <div className="form-group">
          <label className="form-label">Amount</label>
          <div style={{ position: "relative" }}>
            <span style={{ position: "absolute", left: "1rem", top: "50%", transform: "translateY(-50%)", color: "var(--text-secondary)", fontWeight: 500 }}>$</span>
            <input
              type="number"
              className="form-input"
              placeholder="0.00"
              min="0.01"
              step="0.01"
              value={amount}
              onChange={e => setAmount(e.target.value)}
              style={{ paddingLeft: "2rem" }}
              required
            />
          </div>
        </div>

        <div className="form-group">
          <label className="form-label">Memo (Optional)</label>
          <input
            type="text"
            className="form-input"
            placeholder="What is this for?"
            value={description}
            onChange={e => setDescription(e.target.value)}
          />
        </div>

        <button type="submit" className="btn-primary" style={{ width: "100%", marginTop: "1rem", backgroundColor: activeTab === "zelle" ? "#741BE1" : "" }}>
          {activeTab === "zelle" ? "Send Money" : "Confirm Transfer"}
        </button>
      </form>
    </div>
  );
}
