import type { Metadata, Viewport } from "next";
import "./globals.css";
import { Header } from "@/components/common/Header";
import { Footer } from "@/components/common/Footer";
import { CompareProvider } from "@/components/compare/CompareContext";
import { CompareTray } from "@/components/compare/CompareTray";

export const metadata: Metadata = {
  title: {
    default: "AutoBazaar — India's Trust-First Used Car Marketplace",
    template: "%s | AutoBazaar",
  },
  description:
    "Find your next car on AutoBazaar with objective price ratings, 5-point verification ladders, 160-point mechanical inspection reports, and private-by-default enquiries.",
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000"
  ),
  openGraph: {
    type: "website",
    siteName: "AutoBazaar",
    locale: "en_IN",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  themeColor: "#0B6E6E",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-dvh flex flex-col bg-canvas font-sans text-ink antialiased">
        <CompareProvider>
          <Header />
          <main className="flex-1">{children}</main>
          <CompareTray />
          <Footer />
        </CompareProvider>
      </body>
    </html>
  );
}
