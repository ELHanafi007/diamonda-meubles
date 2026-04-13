import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Produit - Détails Exclusifs",
  description: "Découvrez les détails de ce produit d'exception. Dimensions, matériaux, garanties et livraison prestige.",
  openGraph: {
    title: "Détail Produit | Diamontaris Meubles",
    description: "Produit d'exception haut de gamme.",
  },
  other: {
    "product:availability": "in stock",
    "product:price:currency": "MAD",
  },
};

export function generateProductMetadata(product: any): Metadata {
  return {
    title: `${product.name} - ${product.price} MAD`,
    description: product.description,
    openGraph: {
      title: `${product.name} | Diamontaris Meubles`,
      description: product.description,
      images: [{
        url: product.image,
        width: 1200,
        height: 630,
        alt: product.name,
      }],
    },
    other: {
      "product:availability": product.inStock ? "in stock" : "out of stock",
      "product:price:amount": product.price,
      "product:price:currency": "MAD",
    },
  };
}
