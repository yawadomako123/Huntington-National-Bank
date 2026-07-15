"use client";

import { useEffect, useRef } from "react";
import { useSession, signOut } from "next-auth/react";

// Session expires after 2 minutes (120 seconds)
const SESSION_TIMEOUT_MS = 2 * 60 * 1000;

// Module-level flag — prevents the timer from restarting if the user
// navigates between pages or if the component re-renders.
let timerStarted = false;

/**
 * SessionGuard - Automatically signs the user out after a fixed time.
 * No reload needed. Runs silently in the background.
 */
export default function SessionGuard() {
  const { status } = useSession();
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (status !== "authenticated") return;

    // Only start the timer once per page session
    if (timerStarted) return;
    timerStarted = true;

    // Schedule automatic sign-out
    timerRef.current = setTimeout(() => {
      timerStarted = false; // Reset so next login can use it
      signOut({ callbackUrl: "/login" });
    }, SESSION_TIMEOUT_MS);

    return () => {
      // Do NOT clear on unmount — we want it to keep running during navigation
    };
  }, [status]);

  // Renders nothing — this component only handles logic
  return null;
}
