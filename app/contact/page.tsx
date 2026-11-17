"use client";

import React from "react";
import PageHeader from "../components/PageHeader";

const options = [
  { label: "Call us", sub: "+233 302 429 150 · 24/7", href: "tel:+233302429150", icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.9.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z" /></svg> },
  { label: "Email us", sub: "ghana@absa.com", href: "mailto:ghana@absa.com", icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="4" width="20" height="16" rx="2" /><path d="m22 7-10 6L2 7" /></svg> },
  { label: "WhatsApp", sub: "+233 50 142 0000", href: "https://wa.me/233501420000", icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-8.5 8.5 8.5 8.5 0 0 1-3.8-.9L3 21l1.9-5.7A8.38 8.38 0 0 1 4 11.5 8.5 8.5 0 0 1 12.5 3 8.38 8.38 0 0 1 21 11.5z" /></svg> },
  { label: "Report a lost card", sub: "Block your card instantly", href: "tel:+233302429150", icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="5" width="20" height="14" rx="2" /><line x1="2" y1="10" x2="22" y2="10" /><line x1="4" y1="20" x2="20" y2="4" /></svg> },
];

export default function Contact() {
  return (
    <div>
      <PageHeader title="Contact Us" />
      <div className="container" style={{ paddingTop: "0.5rem" }}>
        <p className="text-secondary" style={{ fontSize: "0.9rem", marginBottom: "1.4rem" }}>
          We&apos;re here to help, any time of day.
        </p>
        <div className="card" style={{ padding: "0.4rem 1.25rem" }}>
          {options.map((o) => (
            <a key={o.label} href={o.href} className="tx-row" style={{ textDecoration: "none" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                <div className="tx-icon" style={{ background: "radial-gradient(circle at 30% 30%, #ff3b6b, #c70039)", color: "#fff" }}>{o.icon}</div>
                <div>
                  <p style={{ fontWeight: 600, fontSize: "0.95rem" }}>{o.label}</p>
                  <p className="text-secondary" style={{ fontSize: "0.8rem" }}>{o.sub}</p>
                </div>
              </div>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--text-secondary)" strokeWidth="2"><polyline points="9 18 15 12 9 6" /></svg>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
