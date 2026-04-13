import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import ClientProviders from "@/components/ClientProviders";
import ConditionalLayout from "@/components/ConditionalLayout";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-serif",
  display: "swap",
});

const siteUrl = "https://diamontaris.ma";
const siteName = "Diamontaris Meubles";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Diamontaris Meubles | Mobilier de Luxe à Rabat - Diamantez votre maison",
    template: "%s | Diamontaris Meubles",
  },
  description: "Découvrez notre collection exclusive de mobilier de luxe à Rabat. Canapés, tables, lits et pièces d'exception haut de gamme au Maroc. Livraison et installation prestige.",
  keywords: ["mobilier luxe Maroc", "meubles haut gamme Rabat", "canapé prestige", "design intérieur Rabat", "mobilier sur mesure Maroc"],
  authors: [{ name: "Diamontaris Meubles" }],
  creator: "Diamontaris Meubles",
  publisher: "Diamontaris Meubles",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "fr_MA",
    url: siteUrl,
    siteName,
    title: "Diamontaris Meubles | Mobilier de Luxe à Rabat",
    description: "Collection exclusive de mobilier de luxe à Rabat. Pièces d'exception haut de gamme au Maroc.",
    images: [
      {
        url: `${siteUrl}/og-image.jpg`,
        width: 1200,
        height: 630,
        alt: "Diamontaris Meubles - Mobilier de Luxe",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Diamontaris Meubles | Mobilier de Luxe à Rabat",
    description: "Collection exclusive de mobilier de luxe à Rabat.",
    images: [`${siteUrl}/og-image.jpg`],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: siteUrl,
  },
  category: "furniture",
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  manifest: "/site.webmanifest",
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
        {/* JSON-LD Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FurnitureStore",
              "name": "Diamontaris Meubles",
              "description": "Mobilier de luxe et pièces d'exception à Rabat, Maroc",
              "url": siteUrl,
              "telephone": "+212707951123",
              "address": {
                "@type": "PostalAddress",
                "streetAddress": "Quartier Takaddoum",
                "addressLocality": "Rabat",
                "addressCountry": "MA"
              },
              "geo": {
                "@type": "GeoCoordinates",
                "latitude": "34.0209",
                "longitude": "-6.8417"
              },
              "openingHoursSpecification": [
                {
                  "@type": "OpeningHoursSpecification",
                  "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
                  "opens": "09:00",
                  "closes": "18:00"
                }
              ],
              "priceRange": "$$$",
              "image": `${siteUrl}/og-image.jpg`,
              "sameAs": [
                "https://www.instagram.com/diamontaris"
              ]
            }),
          }}
        />
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
