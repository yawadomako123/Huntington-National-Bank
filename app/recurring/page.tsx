"use client";

import React, { useState } from "react";
import PageHeader from "../components/PageHeader";

type Standing = { id: string; name: string; detail: string; amount: number; next: string; active: boolean };

const initial: Standing[] = [
  { id: "r1", name: "DSTV Compact Plus", detail: "Monthly · 1st", amount: 445, next: "1 Aug 2026", active: true },
  { id: "r2", name: "ECG Prepaid Top-up", detail: "Monthly · 5th", amount: 120, next: "5 Aug 2026", active: true },
  { id: "r3", name: "Gym Membership", detail: "Monthly · 15th", amount: 180, next: "15 Aug 2026", active: true },
  { id: "r4", name: "Netflix", detail: "Monthly · 22nd", amount: 69.99, next: "22 Aug 2026", active: false },
];

export default function Recurring() {
  const [list, setList] = useState<Standing[]>(initial);
  const toggle = (id: string) => setList((l) => l.map((s) => (s.id === id ? { ...s, active: !s.active } : s)));

  return (
    <div>
      <PageHeader title="Recurring Payments" />
      <div className="container" style={{ paddingTop: "0.5rem" }}>
        <p className="text-secondary" style={{ fontSize: "0.9rem", marginBottom: "1.4rem" }}>
          Manage your standing orders and subscriptions.
        </p>
        <div style={{ display: "grid", gap: "1rem" }}>
          {list.map((s) => (
            <div key={s.id} className="card" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: "1rem" }}>
              <div style={{ minWidth: 0 }}>
                <p style={{ fontWeight: 700, fontSize: "0.98rem" }}>{s.name}</p>
                <p className="text-secondary" style={{ fontSize: "0.8rem" }}>{s.detail} · GH₵{s.amount.toFixed(2)}</p>
                <p style={{ fontSize: "0.76rem", color: s.active ? "var(--success)" : "var(--text-muted)", marginTop: "0.2rem" }}>
                  {s.active ? `Next: ${s.next}` : "Paused"}
                </p>
              </div>
              <button aria-pressed={s.active} className="toggle" data-on={s.active} onClick={() => toggle(s.id)} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
