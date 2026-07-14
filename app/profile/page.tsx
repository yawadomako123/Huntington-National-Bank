"use client";

import React, { useState } from "react";
import { useBank } from "../context/BankContext";

function Toggle({ on, onClick }: { on: boolean; onClick: () => void }) {
  return <button aria-pressed={on} className="toggle" data-on={on} onClick={onClick} />;
}

export default function Profile() {
  const { user } = useBank();

  const [settings, setSettings] = useState({
    faceId: true,
    pushAlerts: true,
    paperless: true,
    marketing: false,
    travelNotice: false,
  });

  const toggle = (key: keyof typeof settings) =>
    setSettings((s) => ({ ...s, [key]: !s[key] }));

  const infoRows: [string, string][] = [
    ["Full name", user.fullName],
    ["Email", user.email],
    ["Mobile", "(206) 555-0182"],
    ["Mailing address", "1400 Pike Street, Seattle, WA 98101"],
    ["Customer since", user.memberSince],
  ];

  return (
    <div className="container" style={{ maxWidth: "860px" }}>
      <h1 style={{ marginBottom: "0.35rem" }}>Profile &amp; Settings</h1>
      <p className="text-secondary" style={{ fontSize: "0.9rem", marginBottom: "1.75rem" }}>
        Manage your personal details, security, and preferences.
      </p>

      {/* Identity header */}
      <div className="card" style={{ marginBottom: "1.5rem", display: "flex", alignItems: "center", gap: "1.1rem" }}>
        <div className="avatar" style={{ width: "58px", height: "58px", fontSize: "1.2rem" }}>{user.initials}</div>
        <div>
          <h3 style={{ margin: 0 }}>{user.fullName}</h3>
          <p className="text-secondary" style={{ fontSize: "0.85rem" }}>{user.email}</p>
          <span className="pill" style={{ marginTop: "0.4rem" }}>Member since {user.memberSince}</span>
        </div>
      </div>

      {/* Personal information */}
      <div className="card" style={{ marginBottom: "1.5rem" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.5rem" }}>
          <h3>Personal Information</h3>
          <button className="link-btn">Edit</button>
        </div>
        {infoRows.map(([label, value]) => (
          <div key={label} className="settings-row">
            <span className="text-secondary" style={{ fontSize: "0.88rem" }}>{label}</span>
            <span style={{ fontSize: "0.9rem", fontWeight: 600, textAlign: "right" }}>{value}</span>
          </div>
        ))}
      </div>

      {/* Security */}
      <div className="card" style={{ marginBottom: "1.5rem" }}>
        <h3 style={{ marginBottom: "0.5rem" }}>Security</h3>
        <div className="settings-row">
          <div>
            <p style={{ fontWeight: 600, fontSize: "0.9rem" }}>Face ID / Biometric sign-in</p>
            <p className="text-secondary" style={{ fontSize: "0.82rem" }}>Use biometrics to log in faster.</p>
          </div>
          <Toggle on={settings.faceId} onClick={() => toggle("faceId")} />
        </div>
        <div className="settings-row">
          <div>
            <p style={{ fontWeight: 600, fontSize: "0.9rem" }}>Password</p>
            <p className="text-secondary" style={{ fontSize: "0.82rem" }}>Last changed 3 months ago.</p>
          </div>
          <button className="btn-outline">Change</button>
        </div>
        <div className="settings-row">
          <div>
            <p style={{ fontWeight: 600, fontSize: "0.9rem" }}>Two-factor authentication</p>
            <p className="text-secondary" style={{ fontSize: "0.82rem" }}>Text a code to (•••) •••-0182.</p>
          </div>
          <span className="badge badge-posted" style={{ color: "var(--success)" }}>Enabled</span>
        </div>
      </div>

      {/* Preferences */}
      <div className="card">
        <h3 style={{ marginBottom: "0.5rem" }}>Preferences</h3>
        {[
          ["pushAlerts", "Push & email alerts", "Get notified about transactions and low balances."],
          ["paperless", "Paperless statements", "Receive statements electronically."],
          ["travelNotice", "Travel notice", "Let us know when you're traveling."],
          ["marketing", "Marketing communications", "Offers and product news."],
        ].map(([key, title, desc]) => (
          <div key={key} className="settings-row">
            <div>
              <p style={{ fontWeight: 600, fontSize: "0.9rem" }}>{title}</p>
              <p className="text-secondary" style={{ fontSize: "0.82rem" }}>{desc}</p>
            </div>
            <Toggle on={settings[key as keyof typeof settings]} onClick={() => toggle(key as keyof typeof settings)} />
          </div>
        ))}
      </div>
    </div>
  );
}
