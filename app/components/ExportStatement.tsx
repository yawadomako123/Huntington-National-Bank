"use client";
import React, { useState } from "react";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { Transaction } from "../data/mockData";

interface ExportStatementProps {
  transactions: Transaction[];
  balance: number;
}

export default function ExportStatement({ transactions, balance }: ExportStatementProps) {
  const [timeframe, setTimeframe] = useState("30");

  const handleExport = () => {
    const doc = new jsPDF();
    
    // Header
    doc.setFontSize(20);
    doc.setTextColor(11, 19, 43); // Oxford Blue
    doc.text("Bank Statement", 14, 22);
    
    doc.setFontSize(12);
    doc.setTextColor(100, 100, 100);
    doc.text(`Generated on: ${new Date().toLocaleDateString()}`, 14, 32);
    doc.text(`Timeframe: Last ${timeframe} Days`, 14, 38);
    doc.text(`Current Balance: $${balance.toLocaleString()}`, 14, 44);

    // Table
    const tableData = transactions.map(t => [
      new Date(t.date).toLocaleDateString(),
      t.description,
      t.type === "deposit" ? `+$${t.amount.toFixed(2)}` : `-$${t.amount.toFixed(2)}`
    ]);

    autoTable(doc, {
      startY: 50,
      head: [["Date", "Description", "Amount"]],
      body: tableData,
      theme: 'striped',
      headStyles: { fillColor: [58, 80, 107] }, // YInMn Blue
    });

    doc.save(`Bank_Statement_${timeframe}_Days.pdf`);
  };

  return (
    <div className="card" style={{ marginTop: "2rem" }}>
      <h3 style={{ marginBottom: "1rem" }}>Export Statement</h3>
      <p className="text-secondary" style={{ marginBottom: "1.5rem", fontSize: "0.875rem" }}>
        Download your transaction history as a PDF.
      </p>
      
      <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
        <select 
          value={timeframe} 
          onChange={(e) => setTimeframe(e.target.value)}
          style={{
            padding: "0.75rem",
            borderRadius: "4px",
            border: "1px solid var(--border-color)",
            backgroundColor: "var(--bg-primary)",
            color: "var(--text-primary)",
            fontFamily: "inherit",
            outline: "none"
          }}
        >
          <option value="30">Last 30 Days</option>
          <option value="90">Last 90 Days</option>
          <option value="365">Year to Date</option>
        </select>
        
        <button className="btn-primary" onClick={handleExport}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
            <polyline points="7 10 12 15 17 10"></polyline>
            <line x1="12" y1="15" x2="12" y2="3"></line>
          </svg>
          Export PDF
        </button>
      </div>
    </div>
  );
}
