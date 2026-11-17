"use client";

import React from "react";
import { useRouter } from "next/navigation";

export default function PageHeader({ title, fallback = "/" }: { title: string; fallback?: string }) {
  const router = useRouter();
  return (
    <div className="absa-header">
      <button
        aria-label="Back"
        className="icon-btn"
        onClick={() => {
          if (window.history.length > 1) router.back();
          else router.push(fallback);
        }}
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6" /></svg>
      </button>
      <span className="absa-header-title">{title}</span>
      <span style={{ width: 40 }} />
    </div>
  );
}
