import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";
import Navbar from "@/components/Navbar";
import ConciergeModal from "@/components/ConciergeModal";
import Footer from "@/components/Footer";
import CustomCursor from "@/components/CustomCursor";
import { cn } from "@/lib/utils";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-serif",
});

export const metadata: Metadata = {
  title: "Diamond Meubles | L'Élégance Redéfinie",
  description: "Découvrez notre collection exclusive de mobilier de luxe. Salons, chambres et décoration d'intérieur haut de gamme au Maroc.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className="scroll-smooth">
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased selection:bg-gold/30 relative",
          inter.variable,
          playfair.variable
        )}
      >
        <div className="noise-overlay" />
        <CustomCursor />
        <Navbar />
        <ConciergeModal />
        <SmoothScroll>
          <main className="min-h-screen">{children}</main>
          <Footer />
        </SmoothScroll>
      </body>
    </html>
  );
}
