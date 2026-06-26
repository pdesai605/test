import type { Metadata } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import "./styles/globals.css";

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Dragonfly Experience Mumbai | Enter the Dragon",
  description:
    "A luxury nightlife experience unlike anything else. Mumbai's most exclusive nights await.",
  keywords: [
    "Dragonfly Mumbai",
    "luxury nightlife",
    "premium lounge",
    "Mumbai nightlife",
  ],
  openGraph: {
    title: "Dragonfly Experience Mumbai",
    description: "Enter the Dragon. A luxury nightlife experience unlike anything else.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${cormorant.variable} ${inter.variable}`}>
      <body className="bg-bg-primary text-text-primary antialiased">{children}</body>
    </html>
  );
}
