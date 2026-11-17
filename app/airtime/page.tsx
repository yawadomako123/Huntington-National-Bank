"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useBank } from "../context/BankContext";
import PageHeader from "../components/PageHeader";

const networks = ["MTN", "Telecel", "AirtelTigo"];
const bundles = [
  { label: "1GB · 30 days", amount: 10 },
  { label: "5GB · 30 days", amount: 25 },
  { label: "10GB · 30 days", amount: 45 },
  { label: "25GB · 30 days", amount: 90 },
];

export default function Airtime() {
  const { accounts, purchase } = useBank();
  const router = useRouter();
  const [mode, setMode] = useState<"airtime" | "data">("airtime");
  const [network, setNetwork] = useState("MTN");
  const [phone, setPhone] = useState("");
  const [amount, setAmount] = useState("");
  const [bundle, setBundle] = useState(bundles[1].label);
  const [success, setSuccess] = useState("");

  const from = accounts.find((a) => a.type !== "credit");

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!from || !phone) return;
    const value = mode === "airtime" ? parseFloat(amount) : bundles.find((b) => b.label === bundle)!.amount;
    if (!value || value <= 0) return;
    const desc = mode === "airtime" ? `Airtime - ${network} ${phone}` : `${network} Data Bundle - ${bundle}`;
    purchase(from.id, desc, value, "Data & Airtime");
    setSuccess(`${mode === "airtime" ? "Airtime" : "Data bundle"} purchased for ${network} ${phone}.`);
    setPhone("");
    setAmount("");
    setTimeout(() => router.push("/transactions"), 1400);
  };

  return (
    <div>
      <PageHeader title="Airtime & Data" />
      <div className="container" style={{ paddingTop: "0.5rem" }}>
        {/* Mode toggle */}
        <div style={{ display: "flex", background: "var(--bg-surface)", borderRadius: "999px", padding: "0.3rem", marginBottom: "1.5rem", border: "1px solid var(--border-color)" }}>
          {(["airtime", "data"] as const).map((m) => (
            <button
              key={m}
              onClick={() => setMode(m)}
              style={{
                flex: 1, padding: "0.7rem", borderRadius: "999px", fontWeight: 700, textTransform: "capitalize",
                background: mode === m ? "var(--accent-pink)" : "transparent",
                color: mode === m ? "#1a0008" : "var(--text-secondary)",
              }}
            >
              {m === "airtime" ? "Airtime" : "Data Bundle"}
            </button>
          ))}
        </div>

        {success && (
          <div className="card" style={{ background: "rgba(53,199,89,0.1)", borderColor: "var(--success)", marginBottom: "1.5rem" }}>
            <p className="text-success" style={{ fontWeight: 600, margin: 0 }}>✓ {success} Redirecting…</p>
          </div>
        )}

        <form className="card" onSubmit={submit}>
          <div className="form-group">
            <label className="form-label">Network</label>
            <div style={{ display: "flex", gap: "0.5rem" }}>
              {networks.map((n) => (
                <button key={n} type="button" onClick={() => setNetwork(n)}
                  style={{
                    flex: 1, padding: "0.7rem", borderRadius: "var(--radius-md)", fontWeight: 600, fontSize: "0.85rem",
                    border: `1px solid ${network === n ? "var(--accent-pink)" : "var(--border-color)"}`,
                    background: network === n ? "rgba(255,77,109,0.12)" : "var(--bg-surface-alt)",
                    color: network === n ? "var(--accent-pink)" : "var(--text-secondary)",
                  }}>
                  {n}
                </button>
              ))}
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Phone Number</label>
            <input type="tel" className="form-input" placeholder="e.g. 024 123 4567" value={phone} onChange={(e) => setPhone(e.target.value)} required />
          </div>

          {mode === "airtime" ? (
            <div className="form-group">
              <label className="form-label">Amount</label>
              <div style={{ position: "relative" }}>
                <span style={{ position: "absolute", left: "1rem", top: "50%", transform: "translateY(-50%)", color: "var(--text-secondary)" }}>GH₵</span>
                <input type="number" className="form-input" placeholder="0.00" min="1" step="0.01" value={amount} onChange={(e) => setAmount(e.target.value)} style={{ paddingLeft: "3.2rem" }} required />
              </div>
            </div>
          ) : (
            <div className="form-group">
              <label className="form-label">Choose a bundle</label>
              <div style={{ display: "grid", gap: "0.6rem" }}>
                {bundles.map((b) => (
                  <button key={b.label} type="button" onClick={() => setBundle(b.label)}
                    style={{
                      display: "flex", justifyContent: "space-between", padding: "0.9rem 1rem", borderRadius: "var(--radius-md)",
                      border: `1px solid ${bundle === b.label ? "var(--accent-pink)" : "var(--border-color)"}`,
                      background: bundle === b.label ? "rgba(255,77,109,0.1)" : "var(--bg-surface-alt)",
                    }}>
                    <span style={{ fontWeight: 600 }}>{b.label}</span>
                    <span style={{ fontWeight: 700 }}>GH₵{b.amount.toFixed(2)}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          <button type="submit" className="btn-primary" style={{ width: "100%", marginTop: "0.5rem" }}>
            {mode === "airtime" ? "Buy Airtime" : "Buy Data Bundle"}
          </button>
          <p className="text-secondary" style={{ textAlign: "center", fontSize: "0.78rem", marginTop: "0.9rem" }}>
            Paid from {from?.name} · {from?.accountNumber}
          </p>
        </form>
      </div>
    </div>
  );
}
