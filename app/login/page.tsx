"use client";

import React, { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleCredentialsLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setError("Please enter your email and password.");
      return;
    }

    const res = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });

    if (res?.error) {
      setError("Invalid login credentials.");
    } else {
      router.push("/");
    }
  };

  const handleGoogleLogin = () => {
    signIn("google", { callbackUrl: "/" });
  };

  return (
    <div style={{
      minHeight: "100vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: "var(--bg-primary)",
      backgroundImage: "linear-gradient(135deg, rgba(0, 114, 80, 0.05) 0%, rgba(0, 0, 0, 0) 100%)",
      padding: "2rem"
    }}>
      <div style={{
        width: "100%",
        maxWidth: "420px",
        backgroundColor: "var(--bg-secondary)",
        borderRadius: "16px",
        padding: "2.5rem 2rem",
        boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.15)",
        border: "1px solid var(--border-glass)"
      }}>
        <div style={{ textAlign: "center", marginBottom: "2rem" }}>
          <div style={{ display: "inline-flex", gap: "2px", marginBottom: "0.5rem" }}>
            <div style={{ width: "24px", height: "24px", backgroundColor: "var(--brand-green)" }}></div>
            <div style={{ width: "24px", height: "24px", backgroundColor: "var(--accent-secondary)" }}></div>
          </div>
          <h1 style={{ color: "var(--brand-green)", margin: 0, fontSize: "1.5rem", fontWeight: 800, letterSpacing: "1px" }}>HUNTINGTON</h1>
          <div style={{ fontSize: "0.75rem", fontWeight: 600, letterSpacing: "3px", color: "var(--text-secondary)" }}>NATIONAL BANK</div>
        </div>

        <h2 style={{ fontSize: "1.25rem", marginBottom: "1.5rem", textAlign: "center", fontWeight: 600 }}>Sign in to Online Banking</h2>

        {error && (
          <div style={{ backgroundColor: "rgba(220, 38, 38, 0.1)", color: "#dc2626", padding: "0.75rem", borderRadius: "8px", marginBottom: "1.5rem", fontSize: "0.875rem", textAlign: "center" }}>
            {error}
          </div>
        )}

        <form onSubmit={handleCredentialsLogin}>
          <div className="form-group">
            <label className="form-label">Online ID / Email</label>
            <input 
              type="email" 
              className="form-input" 
              placeholder="e.g. admin@gilbreathe.com" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label className="form-label">Passcode</label>
            <input 
              type="password" 
              className="form-input" 
              placeholder="Enter your passcode" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "1.5rem", fontSize: "0.875rem" }}>
            <label style={{ display: "flex", alignItems: "center", gap: "0.5rem", color: "var(--text-secondary)", cursor: "pointer" }}>
              <input type="checkbox" /> Save Online ID
            </label>
            <a href="#" style={{ color: "var(--brand-green)", textDecoration: "none", fontWeight: 500 }}>Forgot ID/Passcode?</a>
          </div>
          <button type="submit" className="btn-primary" style={{ width: "100%", marginBottom: "1rem" }}>
            Sign In
          </button>
        </form>

        <div style={{ display: "flex", alignItems: "center", gap: "1rem", margin: "1.5rem 0", color: "var(--text-secondary)" }}>
          <div style={{ flex: 1, height: "1px", backgroundColor: "var(--border-solid)" }}></div>
          <span style={{ fontSize: "0.875rem", fontWeight: 500 }}>Or continue with</span>
          <div style={{ flex: 1, height: "1px", backgroundColor: "var(--border-solid)" }}></div>
        </div>

        <button 
          onClick={handleGoogleLogin} 
          className="btn-outline" 
          style={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "center", gap: "0.75rem" }}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
          </svg>
          Sign in with Google
        </button>

        <p style={{ textAlign: "center", marginTop: "2rem", fontSize: "0.875rem", color: "var(--text-secondary)" }}>
          Not enrolled? <a href="#" style={{ color: "var(--brand-green)", textDecoration: "none", fontWeight: 500 }}>Sign up for an online account</a>
        </p>
      </div>
    </div>
  );
}
