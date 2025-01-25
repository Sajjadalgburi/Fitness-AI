import { Geist } from "next/font/google";
import "./globals.css";
import { Analytics } from "@vercel/analytics/react";

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

export const metadata = {
  metadataBase: new URL(defaultUrl),
  title: "Next.js and Supabase Starter Kit",
  description: "The fastest way to build apps with Next.js and Supabase",
};

const geistSans = Geist({
  display: "swap",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.className}`}
      suppressHydrationWarning
    >
      <body className="bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-800 text-white">
        {children}
        <Analytics />
      </body>
    </html>
  );
}
