"use client";

import React, { useState } from "react";
import { useBank } from "../context/BankContext";

type Statement = { period: string; date: string; size: string };

const statementsByYear: Record<string, Statement[]> = {
  "2026": [
    { period: "June 2026", date: "Jul 1, 2026", size: "248 KB" },
    { period: "May 2026", date: "Jun 1, 2026", size: "231 KB" },
    { period: "April 2026", date: "May 1, 2026", size: "224 KB" },
    { period: "March 2026", date: "Apr 1, 2026", size: "240 KB" },
    { period: "February 2026", date: "Mar 1, 2026", size: "218 KB" },
    { period: "January 2026", date: "Feb 1, 2026", size: "226 KB" },
  ],
  "2025": [
    { period: "December 2025", date: "Jan 1, 2026", size: "252 KB" },
    { period: "November 2025", date: "Dec 1, 2025", size: "239 KB" },
    { period: "October 2025", date: "Nov 1, 2025", size: "233 KB" },
  ],
};

export default function Statements() {
  const { accounts } = useBank();
  const [year, setYear] = useState("2026");
  const [accountId, setAccountId] = useState(accounts[0]?.id ?? "");

  const years = Object.keys(statementsByYear);
  const rows = statementsByYear[year] ?? [];

  return (
    <div className="container" style={{ maxWidth: "900px" }}>
      <h1 style={{ marginBottom: "0.35rem" }}>Statements &amp; Documents</h1>
      <p className="text-secondary" style={{ fontSize: "0.9rem", marginBottom: "1.75rem" }}>
        View and download monthly statements and tax documents.
      </p>

      {/* Filters */}
      <div style={{ display: "flex", gap: "1rem", marginBottom: "1.5rem", flexWrap: "wrap" }}>
        <div style={{ flex: "1 1 240px" }}>
          <label className="form-label">Account</label>
          <select className="form-input" value={accountId} onChange={(e) => setAccountId(e.target.value)}>
            {accounts.map((acc) => (
              <option key={acc.id} value={acc.id}>{acc.name} · {acc.accountNumber}</option>
            ))}
          </select>
        </div>
        <div style={{ flex: "1 1 160px" }}>
          <label className="form-label">Year</label>
          <select className="form-input" value={year} onChange={(e) => setYear(e.target.value)}>
            {years.map((y) => (
              <option key={y} value={y}>{y}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Statements table */}
      <div className="card" style={{ marginBottom: "1.5rem" }}>
        <h3 style={{ marginBottom: "0.5rem" }}>Monthly Statements</h3>
        <div className="table-scroll">
          <table className="data-table">
            <thead>
              <tr>
                <th>Statement Period</th>
                <th>Available</th>
                <th>Format</th>
                <th style={{ textAlign: "right" }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((s) => (
                <tr key={s.period}>
                  <td style={{ fontWeight: 600 }}>{s.period}</td>
                  <td className="text-secondary">{s.date}</td>
                  <td className="text-secondary">PDF · {s.size}</td>
                  <td style={{ textAlign: "right" }}>
                    <button className="link-btn">
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="7 10 12 15 17 10" /><line x1="12" y1="15" x2="12" y2="3" /></svg>
                      Download
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Tax documents */}
      <div className="card">
        <h3 style={{ marginBottom: "0.5rem" }}>Tax Documents</h3>
        <div className="settings-row">
          <div>
            <p style={{ fontWeight: 600, fontSize: "0.9rem" }}>1099-INT · 2025</p>
            <p className="text-secondary" style={{ fontSize: "0.82rem" }}>Interest income · Available Jan 31, 2026</p>
          </div>
          <button className="link-btn">Download</button>
        </div>
        <div className="settings-row">
          <div>
            <p style={{ fontWeight: 600, fontSize: "0.9rem" }}>1099-INT · 2024</p>
            <p className="text-secondary" style={{ fontSize: "0.82rem" }}>Interest income · Available Jan 31, 2025</p>
          </div>
          <button className="link-btn">Download</button>
        </div>
      </div>
    </div>
  );
}
