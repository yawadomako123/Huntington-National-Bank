"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useBank } from "../context/BankContext";
import { signOut, useSession } from "next-auth/react";

export default function TopNav() {
  const pathname = usePathname();
  const { user } = useBank();
  const { data: session } = useSession();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // If session has a name, use it; otherwise use the context user
  const displayName = session?.user?.name || user.firstName;
  const displayInitials = session?.user?.name 
    ? session.user.name.split(" ").map((n: string) => n[0]).join("").substring(0, 2).toUpperCase() 
    : user.initials;

  // Don't render the navigation bar on the login screen
  if (pathname === "/login" || pathname === "/auth") {
    return null;
  }

  const links = [
    { name: "Accounts", path: "/" },
    { name: "Transactions", path: "/transactions" },
    { name: "Pay & Transfer", path: "/transfers" },
    { name: "Bill Pay", path: "/bill-pay" },
    { name: "Deposit Checks", path: "/deposit" },
    { name: "Plan & Track", path: "/plan-and-track" },
    { name: "Statements", path: "/statements" },
    { name: "Security Center", path: "/cards" },
  ];

  return (
    <header className="topnav">
      <div className="topnav-accent" />
      <div className="topnav-main">
        <Link href="/" className="brand-logo">
          <div className="brand-mark">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
              <path d="M3 20h18" />
              <path d="M5 20V10l7-5 7 5v10" />
              <path d="M9 20v-5h6v5" />
            </svg>
          </div>
          <div style={{ lineHeight: 1.1 }}>
            <div style={{ fontWeight: 800, fontSize: "1.15rem", letterSpacing: "0.5px", color: "var(--brand-green)" }}>HUNTINGTON</div>
            <div style={{ fontSize: "0.62rem", fontWeight: 600, letterSpacing: "2.5px", color: "var(--text-secondary)" }}>NATIONAL BANK</div>
          </div>
        </Link>

        <div style={{ display: "flex", alignItems: "center", gap: "1.25rem" }}>
          <button aria-label="Notifications" style={{ color: "var(--text-secondary)", display: "flex" }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" /><path d="M13.73 21a2 2 0 0 1-3.46 0" /></svg>
          </button>
          <div style={{ display: "flex", alignItems: "center", gap: "0.65rem" }}>
            {session?.user?.image ? (
              <img src={session.user.image} alt={displayName} style={{ width: "32px", height: "32px", borderRadius: "50%" }} />
            ) : (
              <Link href="/profile" className="avatar" aria-label="Profile and settings">{displayInitials}</Link>
            )}
            <div style={{ lineHeight: 1.2 }} className="user-meta">
              <Link href="/profile" style={{ fontSize: "0.82rem", fontWeight: 700 }}>{displayName}</Link>
              <button onClick={() => signOut({ callbackUrl: "/login" })} style={{ color: "var(--text-secondary)", fontSize: "0.72rem", fontWeight: 600, display: "block" }}>Sign Out</button>
            </div>
          </div>

          <button
            className="mobile-menu-btn"
            style={{ display: "none", color: "var(--text-primary)" }}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>
          </button>
        </div>
      </div>

      <div className="topnav-links" style={{ display: mobileMenuOpen ? "block" : "" }}>
        <div className="topnav-links-inner" style={{ flexDirection: mobileMenuOpen ? "column" : "row" }}>
          {links.map((link) => {
            const isActive = pathname === link.path || (link.path === "/" && pathname === "/accounts");
            return (
              <Link
                key={link.path}
                href={link.path}
                className={`nav-link ${isActive ? "active" : ""}`}
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.name}
              </Link>
            );
          })}
        </div>
      </div>

      {/* Mobile Bottom Nav */}
      <div className="mobile-nav">
        <Link href="/" className={`mobile-nav-link ${pathname === "/" ? "active" : ""}`}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="4" width="20" height="16" rx="2"></rect><line x1="2" y1="10" x2="22" y2="10"></line></svg>
          <span>Accounts</span>
        </Link>
        <Link href="/transfers" className={`mobile-nav-link ${pathname === "/transfers" ? "active" : ""}`}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="17 1 21 5 17 9"></polyline><path d="M3 11V9a4 4 0 0 1 4-4h14"></path><polyline points="7 23 3 19 7 15"></polyline><path d="M21 13v2a4 4 0 0 1-4 4H3"></path></svg>
          <span>Transfer</span>
        </Link>
        <Link href="/deposit" className={`mobile-nav-link ${pathname === "/deposit" ? "active" : ""}`}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="17 8 12 3 7 8"></polyline><line x1="12" y1="3" x2="12" y2="15"></line></svg>
          <span>Deposit</span>
        </Link>
        <Link href="/cards" className={`mobile-nav-link ${pathname === "/cards" ? "active" : ""}`}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="1" y="4" width="22" height="16" rx="2" ry="2"></rect><line x1="1" y1="10" x2="23" y2="10"></line></svg>
          <span>Cards</span>
        </Link>
      </div>
    </header>
  );
}
