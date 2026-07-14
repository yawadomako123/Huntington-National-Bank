"use client";

import React, { use, useEffect, useState } from "react";
import { useBank } from "../../context/BankContext";
import { useRouter } from "next/navigation";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import Link from "next/link";

export default function TransactionDetail({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const { transactions } = useBank();
  const router = useRouter();
  
  const tx = transactions.find(t => t.id === id);

  if (!tx) {
    return (
      <div className="container" style={{ maxWidth: "600px", marginTop: "2rem", textAlign: "center" }}>
        <h2>Transaction not found</h2>
        <button className="btn-outline" onClick={() => router.push("/transactions")}>Back to Transactions</button>
      </div>
    );
  }

  const handleDownloadPDF = () => {
    const doc = new jsPDF();
    
    // Bank Header
    doc.setFontSize(22);
    doc.setTextColor(0, 114, 80); // Huntington Green approx
    doc.text("HUNTINGTON NATIONAL BANK", 14, 22);
    
    doc.setFontSize(10);
    doc.setTextColor(100);
    doc.text("Transaction Receipt", 14, 30);
    
    // Details
    doc.setFontSize(12);
    doc.setTextColor(0);
    doc.text(`Transaction ID: ${tx.id}`, 14, 45);
    doc.text(`Date: ${new Date(tx.date).toLocaleString()}`, 14, 52);
    doc.text(`Status: ${tx.status?.toUpperCase() || 'UNKNOWN'}`, 14, 59);
    
    // Table for transaction info
    const tableData = [
      ["Description", tx.description],
      ["Type", tx.type === "deposit" ? "Money In" : "Money Out"],
      ["Category", tx.category || "Uncategorized"],
      ["Amount", `$${tx.amount.toLocaleString(undefined, { minimumFractionDigits: 2 })}`]
    ];

    autoTable(doc, {
      startY: 65,
      head: [["Detail", "Information"]],
      body: tableData,
      theme: 'grid',
      headStyles: { fillColor: [0, 114, 80] },
      styles: { fontSize: 11, cellPadding: 5 }
    });

    doc.save(`receipt_${tx.id}.pdf`);
  };

  const isDeposit = tx.type === "deposit";

  return (
    <div className="container" style={{ maxWidth: "600px", marginTop: "2rem" }}>
      <Link href="/transactions" style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", color: "var(--text-secondary)", textDecoration: "none", marginBottom: "1.5rem", fontWeight: 500 }}>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>
        Back to Transactions
      </Link>
      
      <div className="card" style={{ padding: "2rem" }}>
        <div style={{ textAlign: "center", marginBottom: "2rem" }}>
          <div style={{ 
            width: "64px", height: "64px", borderRadius: "50%", margin: "0 auto 1rem",
            backgroundColor: isDeposit ? "rgba(22, 135, 90, 0.1)" : "var(--bg-tertiary)",
            color: isDeposit ? "var(--success)" : "var(--text-secondary)",
            display: "flex", alignItems: "center", justifyContent: "center"
          }}>
            {isDeposit ? (
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2"><line x1="12" y1="19" x2="12" y2="5"></line><polyline points="5 12 12 5 19 12"></polyline></svg>
            ) : (
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2"><line x1="12" y1="5" x2="12" y2="19"></line><polyline points="19 12 12 19 5 12"></polyline></svg>
            )}
          </div>
          <h2 style={{ fontSize: "2rem", marginBottom: "0.5rem", color: isDeposit ? "var(--success)" : "var(--text-primary)" }}>
            {isDeposit ? "+" : "−"}${tx.amount.toLocaleString(undefined, { minimumFractionDigits: 2 })}
          </h2>
          <p className="text-secondary" style={{ fontSize: "1.1rem" }}>{tx.description}</p>
        </div>

        <div style={{ borderTop: "1px solid var(--border-solid)", borderBottom: "1px solid var(--border-solid)", padding: "1.5rem 0", marginBottom: "2rem", display: "flex", flexDirection: "column", gap: "1rem" }}>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <span className="text-secondary">Status</span>
            <span style={{ fontWeight: 500, textTransform: "capitalize" }}>{tx.status}</span>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <span className="text-secondary">Date</span>
            <span style={{ fontWeight: 500 }}>{new Date(tx.date).toLocaleString()}</span>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <span className="text-secondary">Category</span>
            <span style={{ fontWeight: 500 }}>{tx.category || "Uncategorized"}</span>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <span className="text-secondary">Transaction ID</span>
            <span style={{ fontWeight: 500, fontFamily: "monospace", fontSize: "0.9rem" }}>{tx.id}</span>
          </div>
        </div>

        <button onClick={handleDownloadPDF} className="btn-primary" style={{ width: "100%", display: "flex", justifyContent: "center", alignItems: "center", gap: "0.5rem" }}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
          Export as PDF
        </button>
      </div>
    </div>
  );
}
