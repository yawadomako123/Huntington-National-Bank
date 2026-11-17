"use client";

import React, { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";

// Demo credentials used by the simulated biometric (Face ID) login.
const DEMO_EMAIL = "yaw@absa.com";
const DEMO_PASSWORD = "Absa2026!";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [bio, setBio] = useState<"idle" | "scanning" | "success">("idle");
  const router = useRouter();

  const handleBiometric = () => {
    setError("");
    setBio("scanning");
    // Simulated Face ID: scan animation, then authenticate with the demo account.
    setTimeout(async () => {
      const res = await signIn("credentials", { redirect: false, email: DEMO_EMAIL, password: DEMO_PASSWORD });
      if (res?.error) {
        setBio("idle");
        setError("Biometric sign-in failed. Use your password.");
      } else {
        setBio("success");
        setTimeout(() => router.push("/"), 650);
      }
    }, 1700);
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!username || !password) {
      setError("Please enter your username and password.");
      return;
    }
    setLoading(true);
    const res = await signIn("credentials", {
      redirect: false,
      email: username.trim(),
      password,
    });
    setLoading(false);

    if (res?.error) {
      setError("Invalid login credentials.");
    } else {
      router.push("/");
    }
  };

  return (
    <div style={{ minHeight: "100vh", background: "#000", padding: "1.5rem 1.4rem 2.5rem", display: "flex", flexDirection: "column" }}>
      {/* Top bar */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.5rem" }}>
        <button aria-label="Menu" style={{ color: "#fff" }}>
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"><line x1="3" y1="7" x2="21" y2="7" /><line x1="3" y1="13" x2="21" y2="13" /><line x1="3" y1="19" x2="21" y2="19" /></svg>
        </button>
        <Link href="/open-account" style={{ color: "var(--accent-pink)", fontWeight: 600, fontSize: "1rem" }}>Register</Link>
      </div>

      {/* Logo */}
      <div style={{ display: "flex", justifyContent: "center", marginBottom: "1.75rem" }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/logo-roundel.png" alt="Absa" width={92} height={92} style={{ display: "block" }} />
      </div>

      {/* Headline + CTA */}
      <h1 style={{ textAlign: "center", fontSize: "1.5rem", lineHeight: 1.3, fontWeight: 800, marginBottom: "1.75rem" }}>
        Skip the queues and the calls. Open a new account online in only a few minutes.
      </h1>

      <Link href="/open-account" className="btn-outline" style={{ alignSelf: "center", padding: "0.85rem 2.5rem", marginBottom: "1.75rem", borderColor: "#fff", color: "#fff" }}>
        Open account now
      </Link>

      <div className="dots" style={{ marginBottom: "2.25rem" }}>
        <span className="dot active" /><span className="dot" /><span className="dot" />
      </div>

      {/* Login form */}
      <h2 style={{ textAlign: "center", fontSize: "1.15rem", fontWeight: 700, marginBottom: "1.25rem" }}>
        Log in with your online banking credentials
      </h2>

      {error && (
        <div style={{ background: "rgba(255, 90, 95, 0.12)", color: "#ff8a8d", padding: "0.75rem", borderRadius: "10px", marginBottom: "1rem", fontSize: "0.85rem", textAlign: "center" }}>
          {error}
        </div>
      )}

      <form onSubmit={handleLogin}>
        <input
          type="text"
          className="form-input"
          placeholder="Username"
          autoCapitalize="none"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          style={{ marginBottom: "1rem", padding: "1.15rem 1rem" }}
        />
        <div style={{ position: "relative", marginBottom: "1.25rem" }}>
          <input
            type={showPw ? "text" : "password"}
            className="form-input"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{ padding: "1.15rem 1rem", paddingRight: "4rem" }}
          />
          <button
            type="button"
            onClick={() => setShowPw((s) => !s)}
            style={{ position: "absolute", right: "1rem", top: "50%", transform: "translateY(-50%)", color: "var(--accent-pink)", fontWeight: 600, fontSize: "0.95rem" }}
          >
            {showPw ? "hide" : "show"}
          </button>
        </div>

        <p style={{ textAlign: "center", marginBottom: "1.75rem", fontSize: "0.95rem", color: "#fff" }}>
          Forgot your <span style={{ color: "var(--accent-pink)", fontWeight: 600 }}>username</span>
          {" / "}
          <span style={{ color: "var(--accent-pink)", fontWeight: 600 }}>password</span> ?
        </p>

        <button type="submit" className="btn-primary" style={{ width: "100%", marginBottom: "1rem", padding: "1.15rem" }} disabled={loading}>
          {loading ? "Logging in…" : "Log in"}
        </button>

        <button type="button" className="btn-outline" style={{ width: "100%", padding: "1.1rem", display: "flex", gap: "0.6rem" }} onClick={handleBiometric}>
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M4 8V6a2 2 0 0 1 2-2h2" /><path d="M20 8V6a2 2 0 0 0-2-2h-2" /><path d="M4 16v2a2 2 0 0 0 2 2h2" /><path d="M20 16v2a2 2 0 0 1-2 2h-2" /><path d="M9 9h.01" /><path d="M15 9h.01" /><path d="M9 15c.83.67 1.94 1 3 1s2.17-.33 3-1" /></svg>
          Biometric login
        </button>
      </form>

      {bio !== "idle" && (
        <div className="bio-overlay">
          <div className={`bio-face ${bio === "success" ? "ok" : ""}`}>
            {bio === "success" ? (
              <svg width="72" height="72" viewBox="0 0 24 24" fill="none" stroke="#35c759" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
            ) : (
              <svg width="78" height="78" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M4 8V6a2 2 0 0 1 2-2h2" /><path d="M20 8V6a2 2 0 0 0-2-2h-2" /><path d="M4 16v2a2 2 0 0 0 2 2h2" /><path d="M20 16v2a2 2 0 0 1-2 2h-2" /><path d="M9 9h.01" /><path d="M15 9h.01" /><path d="M9 15c.83.67 1.94 1 3 1s2.17-.33 3-1" /></svg>
            )}
            {bio === "scanning" && <span className="bio-scanline" />}
          </div>
          <p style={{ marginTop: "1.5rem", fontWeight: 600, fontSize: "1.05rem" }}>
            {bio === "success" ? "Verified" : "Scanning your face…"}
          </p>
          {bio === "scanning" && (
            <button onClick={() => setBio("idle")} style={{ marginTop: "1rem", color: "var(--accent-pink)", fontWeight: 600 }}>Cancel</button>
          )}
        </div>
      )}

      <p style={{ textAlign: "center", marginTop: "1.5rem", fontSize: "0.78rem", color: "var(--text-muted)" }}>
        Demo login — Username: <span style={{ color: "var(--text-secondary)" }}>yaw@absa.com</span> · Password: <span style={{ color: "var(--text-secondary)" }}>Absa2026!</span>
      </p>
    </div>
  );
}
