"use client";

import React, { useState } from "react";
import PageHeader from "../components/PageHeader";

type Limit = { id: string; label: string; value: number; max: number };

export default function Limits() {
  const [limits, setLimits] = useState<Limit[]>([
    { id: "atm", label: "ATM withdrawal (daily)", value: 2000, max: 5000 },
    { id: "pos", label: "Card / POS (daily)", value: 5000, max: 20000 },
    { id: "transfer", label: "Transfers (daily)", value: 10000, max: 50000 },
    { id: "momo", label: "MoMo send (daily)", value: 3000, max: 10000 },
  ]);
  const [saved, setSaved] = useState(false);

  const set = (id: string, v: number) => {
    setLimits((l) => l.map((x) => (x.id === id ? { ...x, value: v } : x)));
    setSaved(false);
  };

  return (
    <div>
      <PageHeader title="Transaction Limits" />
      <div className="container" style={{ paddingTop: "0.5rem" }}>
        <p className="text-secondary" style={{ fontSize: "0.9rem", marginBottom: "1.4rem" }}>
          Set daily limits to keep your account secure.
        </p>

        {saved && (
          <div className="card" style={{ background: "rgba(53,199,89,0.1)", borderColor: "var(--success)", marginBottom: "1.25rem" }}>
            <p className="text-success" style={{ fontWeight: 600, margin: 0 }}>✓ Limits updated.</p>
          </div>
        )}

        <div style={{ display: "grid", gap: "1.1rem" }}>
          {limits.map((l) => (
            <div key={l.id} className="card">
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.7rem" }}>
                <span style={{ fontWeight: 600, fontSize: "0.92rem" }}>{l.label}</span>
                <strong style={{ color: "var(--accent-pink)" }}>GH₵{l.value.toLocaleString()}</strong>
              </div>
              <input type="range" min={0} max={l.max} step={500} value={l.value}
                onChange={(e) => set(l.id, parseInt(e.target.value))}
                style={{ width: "100%", accentColor: "var(--accent-pink)" }} />
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.72rem", color: "var(--text-muted)", marginTop: "0.25rem" }}>
                <span>GH₵0</span><span>GH₵{l.max.toLocaleString()}</span>
              </div>
            </div>
          ))}
        </div>

        <button className="btn-primary" style={{ width: "100%", marginTop: "1.5rem" }} onClick={() => setSaved(true)}>
          Save limits
        </button>
      </div>
    </div>
  );
}
