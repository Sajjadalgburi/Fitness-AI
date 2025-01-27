import { Geist } from "next/font/google";
import "./globals.css";
import { Analytics } from "@vercel/analytics/react";

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

export const metadata = {
  metadataBase: new URL(defaultUrl),
  title: "Fitness AI",
  description:
    "Your personalized AI fitness coach that creates custom workout plans based on your goals, fitness level, and preferences. Get started on your fitness journey today with intelligent, adaptive workout recommendations.",
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
      className={`${geistSans.className} bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-800`}
      suppressHydrationWarning
    >
      <head>
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
      </head>
      <body className="text-white">
        {children}
        <Analytics />
      </body>
    </html>
  );
}
