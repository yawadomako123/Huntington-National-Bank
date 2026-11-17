import React from "react";

/**
 * Absa roundel mark, drawn in code. `size` controls the diameter in px.
 * Used across the app for the brand mark (local class-clone use).
 */
export default function AbsaLogo({ size = 48, color = "#e4002b" }: { size?: number; color?: string }) {
  return (
    <div
      className="absa-mark"
      style={{
        width: size,
        height: size,
        background: color,
        position: "relative",
      }}
      aria-label="Absa"
    >
      {/* white broken ring */}
      <svg width={size} height={size} viewBox="0 0 100 100" style={{ position: "absolute", inset: 0 }}>
        <circle cx="50" cy="50" r="38" fill="none" stroke="#fff" strokeWidth="7"
          strokeDasharray="52 30" strokeDashoffset="-26" strokeLinecap="butt" transform="rotate(-90 50 50)" />
      </svg>
      <span
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "#fff",
          fontWeight: 800,
          fontSize: size * 0.34,
          letterSpacing: "-0.03em",
          lineHeight: 1,
        }}
      >
        absa
      </span>
    </div>
  );
}
