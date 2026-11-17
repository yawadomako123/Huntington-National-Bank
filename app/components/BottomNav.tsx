"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const tabs = [
  {
    name: "Accounts",
    path: "/",
    match: (p: string) => p === "/" || p.startsWith("/accounts"),
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="5" width="20" height="14" rx="3" /><line x1="2" y1="10" x2="22" y2="10" />
      </svg>
    ),
  },
  {
    name: "Explore",
    path: "/explore",
    match: (p: string) => p.startsWith("/explore") || p.startsWith("/plan-and-track"),
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round">
        <line x1="5" y1="9" x2="19" y2="9" /><line x1="5" y1="15" x2="19" y2="15" />
      </svg>
    ),
  },
  {
    name: "Transact",
    path: "/transact",
    match: (p: string) => p.startsWith("/transact") || p.startsWith("/transfers") || p.startsWith("/bill-pay") || p.startsWith("/deposit"),
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="5" width="18" height="14" rx="3" /><path d="M8 12h7" /><path d="M13 9l3 3-3 3" />
      </svg>
    ),
  },
  {
    name: "More",
    path: "/more",
    match: (p: string) => p.startsWith("/more") || p.startsWith("/profile") || p.startsWith("/cards") || p.startsWith("/statements") || p.startsWith("/transactions"),
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
        <circle cx="6" cy="12" r="2" /><circle cx="12" cy="12" r="2" /><circle cx="18" cy="12" r="2" />
      </svg>
    ),
  },
];

export default function BottomNav() {
  const pathname = usePathname();

  if (pathname === "/login" || pathname === "/auth") return null;

  return (
    <nav className="bottom-nav">
      {tabs.map((tab) => {
        const active = tab.match(pathname);
        return (
          <Link key={tab.path} href={tab.path} className={`bottom-nav-link ${active ? "active" : ""}`}>
            <span className="bn-icon">{tab.icon}</span>
            <span>{tab.name}</span>
          </Link>
        );
      })}
    </nav>
  );
}
