"use client";

import { useEffect, useRef } from "react";
import { useSession, signOut } from "next-auth/react";

// Session expires after 2 minutes (120 seconds)
const SESSION_TIMEOUT_MS = 2 * 60 * 1000;

/**
 * SessionGuard - Automatically signs the user out after a fixed time.
 * No reload needed. Runs silently in the background.
 */
export default function SessionGuard() {
  const { status } = useSession();
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (status !== "authenticated") return;

    // Clear any previous timer
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }

    // Schedule automatic sign-out
    timerRef.current = setTimeout(() => {
      signOut({ callbackUrl: "/login" });
    }, SESSION_TIMEOUT_MS);

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, [status]);

  // Renders nothing — this component only handles logic
  return null;
}
