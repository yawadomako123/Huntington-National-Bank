import type { Metadata, Viewport } from "next";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { BankProvider } from "./context/BankContext";
import TopNav from "./components/TopNav";
import ScrollToTop from "./components/ScrollToTop";
import AuthProvider from "./components/AuthProvider";
import SessionGuard from "./components/SessionGuard";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Huntington National Bank | Online Banking",
  description: "Huntington National Bank Online Banking Dashboard",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <AuthProvider>
          <BankProvider>
            <SessionGuard />
            <ScrollToTop />
            <div className="app-layout">
              <TopNav />
              <main className="main-content">
                {children}
              </main>
            </div>
          </BankProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
