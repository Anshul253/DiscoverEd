import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { CompareFloatingBar } from "@/components/CompareFloatingBar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "DiscoverEd - College Discovery Platform",
  description: "Find and compare the best colleges for your future.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-slate-50 dark:bg-[#050211] text-slate-900 dark:text-slate-100 selection:bg-fuchsia-500/30 overflow-x-hidden relative">
        {/* Ambient Background Orbs */}
        <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -left-40 w-96 h-96 rounded-full bg-fuchsia-500/20 blur-[128px] mix-blend-multiply dark:mix-blend-screen animate-blob"></div>
          <div className="absolute top-40 -right-40 w-96 h-96 rounded-full bg-cyan-500/20 blur-[128px] mix-blend-multiply dark:mix-blend-screen animate-blob" style={{ animationDelay: '2s' }}></div>
          <div className="absolute -bottom-40 left-1/2 w-96 h-96 rounded-full bg-violet-500/20 blur-[128px] mix-blend-multiply dark:mix-blend-screen animate-blob" style={{ animationDelay: '4s' }}></div>
        </div>
        <Navbar />
        <main className="flex-1 flex flex-col relative z-0">{children}</main>
        <CompareFloatingBar />
      </body>
    </html>
  );
}
