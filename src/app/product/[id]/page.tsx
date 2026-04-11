"use client";

import { use } from "react";
import { motion } from "framer-motion";
import { MessageCircle, ArrowLeft, Heart, Share2, Ruler, ShieldCheck, Truck } from "lucide-react";
import Link from "next/link";
import { ProductCard } from "@/components/FeaturedProducts";

const allProducts = [
  {
    id: "1",
    name: "Canapé Royal Velours",
    price: "18.500",
    description: "Le Canapé Royal Velours incarne le summum du confort et de l'élégance. Revêtu d'un velours de soie d'une douceur exceptionnelle, ce chef-d'œuvre artisanal présente des finitions dorées à la main et une structure en chêne massif.",
    images: [
      "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?q=80&w=1200",
      "https://images.unsplash.com/photo-1550254478-ead40cc54513?q=80&w=1200",
    ],
    category: "Salons",
    material: "Velours de Soie, Chêne Massif, Finitions Or 24k",
    dimensions: "240cm x 110cm x 85cm",
  },
  // ... more could be added
];

export default function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const product = allProducts.find((p) => p.id === resolvedParams.id) || allProducts[0];

  return (
    <div className="pt-32 pb-24 px-6">
      <div className="container mx-auto">
        {/* Back Button */}
        <Link href="/shop" className="inline-flex items-center gap-2 text-xs uppercase tracking-widest mb-12 hover:text-gold transition-colors">
          <ArrowLeft size={14} /> Retour aux collections
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 mb-32">
          {/* Gallery */}
          <div className="lg:col-span-7 space-y-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1 }}
              className="aspect-[4/5] overflow-hidden bg-beige"
            >
              <img src={product.images[0]} alt={product.name} className="w-full h-full object-cover" />
            </motion.div>
            <div className="grid grid-cols-2 gap-6">
              {product.images.slice(1).map((img, i) => (
                <div key={i} className="aspect-square overflow-hidden bg-beige">
                  <img src={img} alt={`${product.name} detail`} className="w-full h-full object-cover" />
                </div>
              ))}
              <div className="aspect-square overflow-hidden bg-beige flex items-center justify-center p-8 text-center border border-dashed border-muted-foreground/30">
                <p className="text-[10px] uppercase tracking-widest text-muted-foreground">Plus de visuels disponibles sur demande</p>
              </div>
            </div>
          </div>

          {/* Info */}
          <div className="lg:col-span-5 space-y-10">
            <div>
              <span className="text-gold uppercase tracking-[0.3em] text-xs mb-4 block">{product.category}</span>
              <h1 className="text-4xl md:text-6xl font-serif mb-4 leading-tight">{product.name}</h1>
              <p className="text-2xl font-medium">{product.price} MAD</p>
            </div>

            <p className="text-muted-foreground leading-relaxed text-lg">
              {product.description}
            </p>

            <div className="space-y-6 border-y border-beige py-8">
              <div className="flex items-center gap-4">
                <Ruler size={18} className="text-gold" />
                <span className="text-sm"><span className="font-bold uppercase tracking-widest text-[10px] mr-2">Dimensions:</span> {product.dimensions}</span>
              </div>
              <div className="flex items-center gap-4">
                <ShieldCheck size={18} className="text-gold" />
                <span className="text-sm"><span className="font-bold uppercase tracking-widest text-[10px] mr-2">Matériaux:</span> {product.material}</span>
              </div>
              <div className="flex items-center gap-4">
                <Truck size={18} className="text-gold" />
                <span className="text-sm"><span className="font-bold uppercase tracking-widest text-[10px] mr-2">Livraison:</span> Installation Prestige Incluse</span>
              </div>
            </div>

            <div className="flex flex-col gap-4">
              <button className="w-full bg-black text-white py-6 uppercase tracking-[0.3em] text-xs font-bold hover:bg-gold transition-colors flex items-center justify-center gap-4">
                <MessageCircle size={18} />
                Consulter Notre Concierge
              </button>
              <div className="flex gap-4">
                <button className="flex-1 border border-beige py-4 flex items-center justify-center gap-2 hover:bg-beige/30 transition-colors uppercase tracking-widest text-[10px]">
                  <Heart size={16} /> Favoris
                </button>
                <button className="flex-1 border border-beige py-4 flex items-center justify-center gap-2 hover:bg-beige/30 transition-colors uppercase tracking-widest text-[10px]">
                  <Share2 size={16} /> Partager
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Related */}
        <div>
          <h2 className="text-3xl font-serif mb-12">Vous aimerez aussi</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {allProducts.slice(0, 4).map((p) => (
              <ProductCard key={p.id} {...p} image={p.images[0]} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
