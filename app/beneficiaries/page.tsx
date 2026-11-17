"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import PageHeader from "../components/PageHeader";

type Beneficiary = { id: string; name: string; detail: string; kind: "Bank" | "MoMo" };

const initial: Beneficiary[] = [
  { id: "b1", name: "Ama Owusu", detail: "MTN MoMo · 0554 220 190", kind: "MoMo" },
  { id: "b2", name: "Kwame Mensah", detail: "Absa · 0851 992 014", kind: "Bank" },
  { id: "b3", name: "Efua Addo", detail: "GCB Bank · 1021 445 882", kind: "Bank" },
  { id: "b4", name: "Yaw Boateng", detail: "Telecel Cash · 0205 771 043", kind: "MoMo" },
];

export default function Beneficiaries() {
  const router = useRouter();
  const [list, setList] = useState<Beneficiary[]>(initial);
  const [adding, setAdding] = useState(false);
  const [name, setName] = useState("");
  const [detail, setDetail] = useState("");
  const [kind, setKind] = useState<"Bank" | "MoMo">("MoMo");

  const add = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !detail) return;
    setList((l) => [{ id: "b" + Date.now(), name, detail, kind }, ...l]);
    setName(""); setDetail(""); setAdding(false);
  };

  return (
    <div>
      <PageHeader title="Beneficiaries" />
      <div className="container" style={{ paddingTop: "0.5rem" }}>
        <button className="btn-primary" style={{ width: "100%", marginBottom: "1.5rem" }} onClick={() => setAdding((a) => !a)}>
          {adding ? "Close" : "+ Add beneficiary"}
        </button>

        {adding && (
          <form className="card" style={{ marginBottom: "1.5rem" }} onSubmit={add}>
            <div className="form-group">
              <label className="form-label">Name</label>
              <input className="form-input" value={name} onChange={(e) => setName(e.target.value)} placeholder="Full name" required />
            </div>
            <div className="form-group">
              <label className="form-label">Account / MoMo number</label>
              <input className="form-input" value={detail} onChange={(e) => setDetail(e.target.value)} placeholder="e.g. Absa · 0851 992 014" required />
            </div>
            <div className="form-group" style={{ marginBottom: "1rem" }}>
              <label className="form-label">Type</label>
              <div style={{ display: "flex", gap: "0.5rem" }}>
                {(["MoMo", "Bank"] as const).map((k) => (
                  <button key={k} type="button" onClick={() => setKind(k)}
                    style={{ flex: 1, padding: "0.7rem", borderRadius: "var(--radius-md)", fontWeight: 600,
                      border: `1px solid ${kind === k ? "var(--accent-pink)" : "var(--border-color)"}`,
                      background: kind === k ? "rgba(255,77,109,0.12)" : "var(--bg-surface-alt)",
                      color: kind === k ? "var(--accent-pink)" : "var(--text-secondary)" }}>{k}</button>
                ))}
              </div>
            </div>
            <button type="submit" className="btn-primary" style={{ width: "100%" }}>Save beneficiary</button>
          </form>
        )}

        <div className="card">
          {list.map((b) => (
            <div key={b.id} className="tx-row">
              <div style={{ display: "flex", alignItems: "center", gap: "0.9rem", minWidth: 0 }}>
                <div className="tx-icon" style={{ background: "radial-gradient(circle at 30% 30%, #ff3b6b, #c70039)", color: "#fff", fontWeight: 700 }}>
                  {b.name.split(" ").map((n) => n[0]).join("").slice(0, 2)}
                </div>
                <div style={{ minWidth: 0 }}>
                  <p style={{ fontWeight: 600, fontSize: "0.92rem" }}>{b.name}</p>
                  <p className="text-secondary" style={{ fontSize: "0.78rem" }}>{b.detail}</p>
                </div>
              </div>
              <button className="btn-outline" style={{ padding: "0.5rem 1.1rem", fontSize: "0.82rem" }} onClick={() => router.push("/transfers")}>Send</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
