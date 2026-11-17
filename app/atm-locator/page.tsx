"use client";

import React, { useState } from "react";
import PageHeader from "../components/PageHeader";

type Place = { name: string; address: string; type: "ATM" | "Branch"; open: string; km: number };

const places: Place[] = [
  { name: "Absa Osu Branch", address: "Oxford Street, Osu, Accra", type: "Branch", open: "Open · closes 4:00 PM", km: 1.2 },
  { name: "Absa Accra Mall ATM", address: "Accra Mall, Tetteh Quarshie", type: "ATM", open: "24 hours", km: 2.8 },
  { name: "Absa Ridge Branch", address: "Ridge Towers, Accra Central", type: "Branch", open: "Open · closes 4:00 PM", km: 3.5 },
  { name: "Absa Legon ATM", address: "University of Ghana, Legon", type: "ATM", open: "24 hours", km: 4.1 },
  { name: "Absa Spintex ATM", address: "Spintex Road, near Palace Mall", type: "ATM", open: "24 hours", km: 6.0 },
  { name: "Absa Tema Community 1", address: "Tema Community 1, Meridian Rd", type: "Branch", open: "Closed · opens 8:30 AM", km: 24.3 },
];

export default function AtmLocator() {
  const [q, setQ] = useState("");
  const [filter, setFilter] = useState<"all" | "ATM" | "Branch">("all");

  const rows = places
    .filter((p) => (filter === "all" ? true : p.type === filter))
    .filter((p) => (p.name + p.address).toLowerCase().includes(q.toLowerCase()));

  return (
    <div>
      <PageHeader title="ATM & Branch Locator" />
      <div className="container" style={{ paddingTop: "0.5rem" }}>
        {/* Map placeholder */}
        <div style={{ height: "140px", borderRadius: "var(--radius-md)", marginBottom: "1.25rem", position: "relative", overflow: "hidden",
          background: "linear-gradient(135deg, #1a1a1a, #2a2a2a)", border: "1px solid var(--border-color)", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <svg width="46" height="46" viewBox="0 0 24 24" fill="none" stroke="var(--accent-pink)" strokeWidth="1.6"><path d="M12 21s-7-5-7-11a7 7 0 0 1 14 0c0 6-7 11-7 11z" /><circle cx="12" cy="10" r="2.5" /></svg>
          <span style={{ position: "absolute", bottom: 8, fontSize: "0.72rem", color: "var(--text-muted)" }}>Greater Accra</span>
        </div>

        <input className="form-input" placeholder="Search location…" value={q} onChange={(e) => setQ(e.target.value)} style={{ marginBottom: "1rem" }} />

        <div style={{ display: "flex", gap: "0.5rem", marginBottom: "1.25rem" }}>
          {(["all", "ATM", "Branch"] as const).map((f) => (
            <button key={f} onClick={() => setFilter(f)}
              style={{ padding: "0.5rem 1.1rem", borderRadius: "999px", fontWeight: 600, fontSize: "0.82rem",
                border: `1px solid ${filter === f ? "var(--accent-pink)" : "var(--border-color)"}`,
                background: filter === f ? "rgba(255,77,109,0.12)" : "transparent",
                color: filter === f ? "var(--accent-pink)" : "var(--text-secondary)" }}>
              {f === "all" ? "All" : f}
            </button>
          ))}
        </div>

        <div className="card">
          {rows.map((p) => (
            <div key={p.name} className="tx-row">
              <div style={{ display: "flex", alignItems: "center", gap: "0.9rem", minWidth: 0 }}>
                <div className="tx-icon" style={{ background: "var(--bg-tertiary)", color: "var(--accent-pink)" }}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 21s-7-5-7-11a7 7 0 0 1 14 0c0 6-7 11-7 11z" /><circle cx="12" cy="10" r="2.5" /></svg>
                </div>
                <div style={{ minWidth: 0 }}>
                  <p style={{ fontWeight: 600, fontSize: "0.9rem" }}>{p.name}</p>
                  <p className="text-secondary" style={{ fontSize: "0.77rem" }}>{p.address}</p>
                  <p style={{ fontSize: "0.74rem", color: p.open.startsWith("Closed") ? "var(--danger)" : "var(--success)" }}>{p.open}</p>
                </div>
              </div>
              <div style={{ textAlign: "right", flexShrink: 0 }}>
                <span className="pill">{p.type}</span>
                <p className="text-secondary" style={{ fontSize: "0.74rem", marginTop: "0.3rem" }}>{p.km} km</p>
              </div>
            </div>
          ))}
          {rows.length === 0 && <p className="text-secondary" style={{ textAlign: "center", padding: "1.5rem" }}>No locations found.</p>}
        </div>
      </div>
    </div>
  );
}
