"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, ShoppingBag, MessageCircle, Ruler, ShieldCheck, ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Product } from "@/lib/products";
import { useWishlist } from "@/lib/WishlistContext";
import { useToast } from "@/components/ToastProvider";
import { cn } from "@/lib/utils";
import Recommendations from "./Recommendations";

interface QuickViewModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function QuickViewModal({ product, isOpen, onClose }: QuickViewModalProps) {
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const { success, info } = useToast();

  if (!product) return null;

  const isFavorite = isInWishlist(product.id);

  const toggleWishlist = () => {
    if (isFavorite) {
      removeFromWishlist(product.id);
      info(`${product.name} retiré des favoris`);
    } else {
      addToWishlist(product);
      success(`${product.name} ajouté aux favoris`);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 md:p-6">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          />
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="relative w-full max-w-5xl bg-white shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-6 right-6 z-50 p-2 bg-white/80 backdrop-blur-md rounded-full text-primary hover:text-gold transition-all hover:rotate-90 duration-500 shadow-lg"
            >
              <X size={20} />
            </button>

            <div className="flex-1 overflow-y-auto">
              <div className="grid grid-cols-1 md:grid-cols-2">
                {/* Image */}
                <div className="aspect-square md:aspect-auto md:h-full relative bg-beige overflow-hidden">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                  <div className="absolute inset-0 bg-black/5" />
                </div>

                {/* Info */}
                <div className="p-8 md:p-12 space-y-8">
                  <div>
                    <span className="text-gold uppercase tracking-[0.4em] text-[10px] mb-3 block font-bold">
                      {product.category}
                    </span>
                    <h2 className="text-3xl md:text-4xl font-serif text-primary mb-4 leading-tight">
                      {product.name}
                    </h2>
                    <p className="text-2xl font-serif italic text-gold">
                      {product.price} MAD
                    </p>
                  </div>

                  <p className="text-muted-foreground leading-relaxed text-sm font-light">
                    {product.description}
                  </p>

                  <div className="space-y-4 py-6 border-y border-beige">
                    {product.dimensions && (
                      <div className="flex items-center gap-4">
                        <Ruler size={16} className="text-gold" />
                        <span className="text-xs tracking-wide">Dimensions: {product.dimensions}</span>
                      </div>
                    )}
                    <div className="flex items-center gap-4">
                      <ShieldCheck size={16} className="text-gold" />
                      <span className="text-xs tracking-wide">Matériau: {product.material}</span>
                    </div>
                  </div>

                  <div className="flex flex-col gap-4">
                    <button
                      onClick={toggleWishlist}
                      className={cn(
                        "w-full py-5 uppercase tracking-[0.3em] text-[9px] font-bold transition-all duration-500 flex items-center justify-center gap-3",
                        isFavorite ? "bg-gold text-white" : "bg-black text-white hover:bg-gold"
                      )}
                    >
                      <ShoppingBag size={16} />
                      {isFavorite ? "Dans vos favoris" : "Ajouter au Panier"}
                    </button>
                    
                    <div className="flex gap-3">
                      <Link
                        href={`/product/${product.id}`}
                        onClick={onClose}
                        className="flex-1 border border-beige py-4 flex items-center justify-center gap-2 hover:border-gold transition-all duration-500 uppercase tracking-[0.2em] text-[9px] font-bold"
                      >
                        Voir Détails <ArrowRight size={14} />
                      </Link>
                      <a
                        href={`https://wa.me/212707951123?text=${encodeURIComponent("Bonjour, je souhaite plus d'informations sur le produit : " + product.name)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 border border-beige py-4 flex items-center justify-center gap-2 hover:border-gold transition-all duration-500 uppercase tracking-[0.2em] text-[9px] font-bold"
                      >
                        <MessageCircle size={14} /> Expert
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              {/* Recommendations inside Modal */}
              <div className="p-8 md:p-12 bg-beige/10">
                <Recommendations currentProduct={product} />
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
