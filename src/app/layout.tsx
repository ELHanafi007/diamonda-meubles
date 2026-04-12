import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import ClientProviders from "@/components/ClientProviders";
import ConditionalLayout from "@/components/ConditionalLayout";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-serif",
});

export const metadata: Metadata = {
  title: "Diamontaris Meubles | Diamantez votre maison",
  description: "Découvrez notre collection exclusive de mobilier de luxe à Rabat. Diamantez votre maison avec nos pièces d'exception haut de gamme au Maroc.",
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
        <ClientProviders>
          <ConditionalLayout>
            {children}
          </ConditionalLayout>
        </ClientProviders>
      </body>
    </html>
  );
}
