import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { BankProvider } from "./context/BankContext";
import BottomNav from "./components/BottomNav";
import Splash from "./components/Splash";
import ScrollToTop from "./components/ScrollToTop";
import AuthProvider from "./components/AuthProvider";
import SessionGuard from "./components/SessionGuard";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: "#000000",
};

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Absa | Mobile Banking",
  description: "Absa mobile banking — accounts, transfers, MoMo, airtime and more.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-theme="dark">
      <body className={`${inter.variable}`}>
        <AuthProvider>
          <BankProvider>
            <Splash />
            <SessionGuard />
            <ScrollToTop />
            <div className="app-shell">
              <main className="main-content">{children}</main>
              <BottomNav />
            </div>
          </BankProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
