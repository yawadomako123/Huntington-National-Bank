"use client";

import React from "react";
import Link from "next/link";

type Product = { label: string; desc: string; href: string; icon: React.ReactNode };

const products: Product[] = [
  { label: "Investments", desc: "Grow your money with Absa", href: "/contact", icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 3v18h18" /><path d="M7 15l4-4 3 3 5-6" /></svg> },
  { label: "Loans", desc: "Personal & student loans", href: "/contact", icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="9" /><path d="M9.5 9a2.5 2.5 0 0 1 5 0c0 1.5-2.5 2-2.5 3.5" /><path d="M12 17h.01" /></svg> },
  { label: "Insurance", desc: "Protect what matters", href: "/contact", icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2l8 4v6c0 5-3.5 8-8 10-4.5-2-8-5-8-10V6z" /></svg> },
  { label: "Credit cards", desc: "Visa & Signature cards", href: "/cards", icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="5" width="20" height="14" rx="2" /><line x1="2" y1="10" x2="22" y2="10" /></svg> },
  { label: "Rewards", desc: "Deals, offers & cashback", href: "/contact", icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15 9 22 9 16.5 13.5 18.5 21 12 16.5 5.5 21 7.5 13.5 2 9 9 9" /></svg> },
  { label: "Plan & Track", desc: "Budget and spending insights", href: "/plan-and-track", icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12a9 9 0 1 1-9-9" /><path d="M21 3v6h-6" /></svg> },
];

export default function Explore() {
  return (
    <div>
      <div className="absa-header">
        <span className="absa-header-title">Explore</span>
      </div>
      <div className="container" style={{ paddingTop: "0.5rem" }}>
        {/* Featured promo */}
        <Link href="/open-account" className="promo-card" style={{ marginBottom: "1.6rem" }}>
          <div style={{ maxWidth: "70%" }}>
            <h3 style={{ color: "#fff", fontSize: "1.15rem", marginBottom: "0.4rem" }}>Open a new account online</h3>
            <p style={{ fontSize: "0.82rem", opacity: 0.92 }}>Skip the queues — get started in a few minutes.</p>
          </div>
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" /></svg>
        </Link>

        <p className="menu-section-label" style={{ paddingTop: 0 }}>Products for you</p>
        <div className="tile-grid">
          {products.map((p) => (
            <Link key={p.label} href={p.href} className="tile">
              <span className="tile-icon">{p.icon}</span>
              <div>
                <div className="tile-label">{p.label}</div>
                <div className="text-secondary" style={{ fontSize: "0.72rem", marginTop: "0.15rem" }}>{p.desc}</div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
