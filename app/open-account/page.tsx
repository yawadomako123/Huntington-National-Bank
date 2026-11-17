"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import PageHeader from "../components/PageHeader";

const products = ["Ignition Student", "Current Account", "Premier Savings"];

export default function OpenAccount() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [product, setProduct] = useState(products[0]);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [idType, setIdType] = useState("Ghana Card");
  const [done, setDone] = useState(false);

  if (done) {
    return (
      <div>
        <PageHeader title="Open an Account" fallback="/login" />
        <div className="container" style={{ textAlign: "center", paddingTop: "3rem" }}>
          <div style={{ width: "90px", height: "90px", borderRadius: "50%", background: "rgba(53,199,89,0.12)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 1.5rem" }}>
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="var(--success)" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
          </div>
          <h2 style={{ marginBottom: "0.6rem" }}>Application received</h2>
          <p className="text-secondary" style={{ fontSize: "0.9rem", marginBottom: "2rem" }}>
            Thanks {name.split(" ")[0] || "there"} — your {product} application is being processed. We&apos;ll text {phone || "you"} within 24 hours.
          </p>
          <button className="btn-primary" style={{ width: "100%" }} onClick={() => router.push("/login")}>Back to login</button>
        </div>
      </div>
    );
  }

  return (
    <div>
      <PageHeader title="Open an Account" fallback="/login" />
      <div className="container" style={{ paddingTop: "0.5rem" }}>
        <div className="dots" style={{ marginBottom: "1.5rem" }}>
          {[1, 2].map((n) => <span key={n} className={`dot ${step === n ? "active" : ""}`} />)}
        </div>

        {step === 1 ? (
          <div className="card">
            <h3 style={{ marginBottom: "1rem" }}>Choose your account</h3>
            <div style={{ display: "grid", gap: "0.7rem" }}>
              {products.map((p) => (
                <button key={p} type="button" onClick={() => setProduct(p)}
                  style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "1rem", borderRadius: "var(--radius-md)",
                    border: `1px solid ${product === p ? "var(--accent-pink)" : "var(--border-color)"}`,
                    background: product === p ? "rgba(255,77,109,0.1)" : "var(--bg-surface-alt)" }}>
                  <span style={{ fontWeight: 600 }}>{p}</span>
                  {product === p && <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--accent-pink)" strokeWidth="2.5"><polyline points="20 6 9 17 4 12" /></svg>}
                </button>
              ))}
            </div>
            <button className="btn-primary" style={{ width: "100%", marginTop: "1.5rem" }} onClick={() => setStep(2)}>Continue</button>
          </div>
        ) : (
          <form className="card" onSubmit={(e) => { e.preventDefault(); if (name && phone) setDone(true); }}>
            <h3 style={{ marginBottom: "1rem" }}>Your details</h3>
            <div className="form-group">
              <label className="form-label">Full name</label>
              <input className="form-input" value={name} onChange={(e) => setName(e.target.value)} placeholder="e.g. Yaw Mensah" required />
            </div>
            <div className="form-group">
              <label className="form-label">Mobile number</label>
              <input type="tel" className="form-input" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="e.g. 024 123 4567" required />
            </div>
            <div className="form-group">
              <label className="form-label">ID type</label>
              <select className="form-input" value={idType} onChange={(e) => setIdType(e.target.value)}>
                <option>Ghana Card</option>
                <option>Passport</option>
                <option>Voter ID</option>
                <option>Driver&apos;s License</option>
              </select>
            </div>
            <div style={{ display: "flex", gap: "0.75rem", marginTop: "0.5rem" }}>
              <button type="button" className="btn-outline" style={{ flex: 1 }} onClick={() => setStep(1)}>Back</button>
              <button type="submit" className="btn-primary" style={{ flex: 1 }}>Submit</button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
