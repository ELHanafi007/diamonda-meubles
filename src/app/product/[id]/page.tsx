"use client";

import { use, useMemo } from "react";
import { motion } from "framer-motion";
import { MessageCircle, ArrowLeft, Heart, Share2, Ruler, ShieldCheck, Truck } from "lucide-react";
import Link from "next/link";
import { ProductCard } from "@/components/FeaturedProducts";
import { PRODUCTS } from "@/lib/products";
import { useWishlist } from "@/lib/WishlistContext";
import { cn } from "@/lib/utils";

export default function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const product = useMemo(() => 
    PRODUCTS.find((p) => p.id === resolvedParams.id) || PRODUCTS[0],
    [resolvedParams.id]
  );

  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const isFavorite = isInWishlist(product.id);

  const toggleWishlist = () => {
    if (isFavorite) removeFromWishlist(product.id);
    else addToWishlist(product);
  };

  const relatedProducts = useMemo(() => 
    PRODUCTS.filter(p => p.category === product.category && p.id !== product.id).slice(0, 4),
    [product]
  );

  return (
    <div className="pt-32 pb-24 px-6">
      <div className="container mx-auto">
        {/* Back Button */}
        <Link href="/shop" className="inline-flex items-center gap-2 text-[10px] uppercase tracking-widest mb-12 hover:text-gold transition-colors font-bold">
          <ArrowLeft size={14} /> Retour aux collections
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 mb-32">
          {/* Gallery */}
          <div className="lg:col-span-7 space-y-6">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
              className="aspect-[4/5] overflow-hidden bg-beige shadow-2xl"
            >
              <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
            </motion.div>
          </div>

          {/* Info */}
          <div className="lg:col-span-5 space-y-10">
            <div>
              <motion.span 
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                className="text-gold uppercase tracking-[0.4em] text-[10px] mb-4 block font-bold"
              >
                {product.category} — {product.subCategory}
              </motion.span>
              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-4xl md:text-6xl font-serif mb-6 leading-tight text-primary tracking-tight"
              >
                {product.name}
              </motion.h1>
              <motion.p 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="text-3xl font-serif italic text-gold"
              >
                {product.price} MAD
              </motion.p>
            </div>

            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="text-muted-foreground leading-relaxed text-lg font-light"
            >
              {product.description}
            </motion.p>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="space-y-6 border-y border-beige py-10"
            >
              <div className="flex items-center gap-6">
                <div className="w-10 h-10 rounded-full bg-beige flex items-center justify-center text-gold">
                   <ShieldCheck size={20} strokeWidth={1.5} />
                </div>
                <span className="text-sm font-light"><span className="font-bold uppercase tracking-[0.2em] text-[9px] block text-muted-foreground mb-1">Authenticité</span> Matériaux Nobles: {product.material}</span>
              </div>
              <div className="flex items-center gap-6">
                <div className="w-10 h-10 rounded-full bg-beige flex items-center justify-center text-gold">
                   <Truck size={20} strokeWidth={1.5} />
                </div>
                <span className="text-sm font-light"><span className="font-bold uppercase tracking-[0.2em] text-[9px] block text-muted-foreground mb-1">Service Logistique</span> Livraison & Installation Prestige Incluse</span>
              </div>
            </motion.div>

            <div className="flex flex-col gap-6">
              <button className="group relative w-full bg-black text-white py-7 uppercase tracking-[0.3em] text-[10px] font-bold overflow-hidden transition-all duration-500 hover:shadow-2xl">
                <span className="relative z-10 flex items-center justify-center gap-4">
                  <MessageCircle size={18} strokeWidth={1.5} />
                  Consulter Notre Concierge
                </span>
                <div className="absolute inset-0 bg-gold translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out" />
              </button>
              
              <div className="flex gap-4">
                <button 
                  onClick={toggleWishlist}
                  className={cn(
                    "flex-1 border py-5 flex items-center justify-center gap-3 transition-all duration-500 uppercase tracking-[0.2em] text-[10px] font-bold",
                    isFavorite ? "border-gold bg-gold/5 text-gold" : "border-beige hover:border-gold text-primary"
                  )}
                >
                  <Heart size={16} fill={isFavorite ? "currentColor" : "none"} /> 
                  {isFavorite ? "Dans vos favoris" : "Ajouter aux favoris"}
                </button>
                <button className="flex-1 border border-beige py-5 flex items-center justify-center gap-3 hover:border-gold transition-all duration-500 uppercase tracking-[0.2em] text-[10px] font-bold">
                  <Share2 size={16} /> Partager
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Related */}
        {relatedProducts.length > 0 && (
          <div className="pt-24 border-t border-beige">
            <span className="text-gold uppercase tracking-[0.4em] text-[10px] mb-4 block font-bold text-center">Suggestions</span>
            <h2 className="text-4xl md:text-5xl font-serif mb-16 text-center tracking-tight">Vous aimerez aussi</h2>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-12">
              {relatedProducts.map((p) => (
                <ProductCard key={p.id} {...p} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
