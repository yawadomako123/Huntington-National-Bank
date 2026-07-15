"use client";

import React from "react";
import { useBank } from "../context/BankContext";

export default function Cards() {
  const { user, cards, toggleCardFreeze } = useBank();

  return (
    <div className="container" style={{ maxWidth: "1000px" }}>
      <h1 style={{ marginBottom: "0.35rem" }}>Security Center</h1>
      <p className="text-secondary" style={{ fontSize: "0.9rem", marginBottom: "1.75rem" }}>
        Manage your cards, freeze them instantly, and stay protected.
      </p>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "2rem" }}>
        {cards.map((card) => (
          <div key={card.id} className="card" style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>

            {/* Card face */}
            <div style={{
              position: "relative",
              width: "100%",
              aspectRatio: "1.58",
              background: card.type === "credit"
                ? "linear-gradient(135deg, #013a22 0%, #00693c 100%)"
                : "linear-gradient(135deg, #004f2d 0%, #16875a 100%)",
              borderRadius: "16px",
              padding: "1.5rem",
              color: "white",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              boxShadow: "0 12px 28px -8px rgba(1, 58, 34, 0.5)",
              opacity: card.isFrozen ? 0.55 : 1,
              transition: "opacity 0.3s ease",
              overflow: "hidden",
            }}>
              <div style={{ position: "absolute", top: "-50px", right: "-20px", width: "170px", height: "170px", borderRadius: "50%", background: "rgba(255,255,255,0.06)" }}></div>
              <div style={{ position: "absolute", bottom: "-70px", right: "40px", width: "140px", height: "140px", borderRadius: "50%", background: "rgba(122,193,66,0.18)" }}></div>

              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", position: "relative", zIndex: 1 }}>
                <div style={{ fontSize: "1.15rem", fontWeight: 800, letterSpacing: "1px" }}>VERTEX</div>
                <div style={{ fontSize: "0.8rem", opacity: 0.85, textTransform: "uppercase", letterSpacing: "1px" }}>{card.type === "credit" ? "Signature" : "Debit"}</div>
              </div>

              <div style={{ position: "relative", zIndex: 1 }}>
                <div style={{ width: "42px", height: "31px", background: "linear-gradient(135deg, #f5d572, #c79a3a)", borderRadius: "5px", marginBottom: "1rem", position: "relative", overflow: "hidden" }}>
                  <div style={{ position: "absolute", top: "50%", width: "100%", height: "1px", background: "rgba(0,0,0,0.25)" }}></div>
                  <div style={{ position: "absolute", left: "50%", width: "1px", height: "100%", background: "rgba(0,0,0,0.25)" }}></div>
                </div>

                <div style={{ fontSize: "clamp(0.9rem, 3.5vw, 1.4rem)", letterSpacing: "clamp(1px, 1vw, 3px)", marginBottom: "0.75rem", textShadow: "0 1px 2px rgba(0,0,0,0.4)", fontVariantNumeric: "tabular-nums", wordBreak: "break-all" }}>
                  {card.cardNumber}
                </div>

                <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.8rem", textTransform: "uppercase", letterSpacing: "1px", opacity: 0.92 }}>
                  <span>{user.fullName}</span>
                  <span>{card.expiry}</span>
                </div>
              </div>
            </div>

            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: "1rem" }}>
              <div>
                <h4 style={{ marginBottom: "0.25rem" }}>{card.name}</h4>
                <p style={{ fontSize: "0.82rem", margin: 0, fontWeight: 600, color: card.isFrozen ? "var(--warning)" : "var(--success)" }}>
                  {card.isFrozen ? "● Frozen" : "● Active"}
                </p>
              </div>
              <button
                className={card.isFrozen ? "btn-outline" : "btn-primary"}
                style={card.isFrozen ? {} : { backgroundColor: "var(--danger)" }}
                onClick={() => toggleCardFreeze(card.id)}
              >
                {card.isFrozen ? "Unfreeze" : "Freeze Card"}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
