import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Cursor from "@/components/Cursor";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "AURA 3D — Next-Gen WebGL Experience",
  description: "A modern interactive 3D WebGL digital platform built with Next.js, React, Three.js, and Framer Motion.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased dark`}
    >
      <body className="min-h-full flex flex-col bg-slate-950 text-slate-100 antialiased selection:bg-indigo-500 selection:text-white">
        <Cursor />
        {children}
      </body>
    </html>
  );
}
