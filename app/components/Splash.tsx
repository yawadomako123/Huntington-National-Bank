"use client";

import React, { useEffect, useState } from "react";

export default function Splash() {
  const [show, setShow] = useState(true);

  useEffect(() => {
    // Only show the splash once per browser session
    if (typeof window !== "undefined" && sessionStorage.getItem("absa_splash_seen")) {
      setShow(false);
      return;
    }
    const t = setTimeout(() => {
      sessionStorage.setItem("absa_splash_seen", "1");
      setShow(false);
    }, 1800);
    return () => clearTimeout(t);
  }, []);

  if (!show) return null;

  return (
    <div className="splash">
      <div className="splash-mark">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/logo-roundel.png" alt="Absa" width={120} height={120} style={{ display: "block" }} />
      </div>
    </div>
  );
}
