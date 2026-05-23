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
      <body className="min-h-full flex flex-col bg-slate-50 dark:bg-[#0a0a0a] text-slate-900 dark:text-slate-100 selection:bg-blue-500/30">
        <div className="fixed inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-50/50 via-white to-white dark:from-indigo-900/10 dark:via-[#0a0a0a] dark:to-[#0a0a0a]"></div>
        <Navbar />
        <main className="flex-1 flex flex-col relative z-0">{children}</main>
        <CompareFloatingBar />
      </body>
    </html>
  );
}
