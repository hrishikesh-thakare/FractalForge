import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { Analytics } from "@vercel/analytics/next";
import { Navigation } from "@/components/navigation";
import "./globals.css";

export const metadata: Metadata = {
  title: "FractalForge",
  description: "Exploring the art of Kolam",
  generator: "v0.app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
    >
      <body className={`font-sans ${GeistSans.variable} ${GeistMono.variable}`}>
        <div className="flex flex-col min-h-screen">
          <Navigation />
          <main className="flex-grow">{children}</main>
        </div>
        <Analytics />
      </body>
    </html>
  );
}
