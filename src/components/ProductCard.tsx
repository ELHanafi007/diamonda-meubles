"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { Plus, Heart } from "lucide-react";
import { cn } from "@/lib/utils";
import { Product } from "@/lib/products";
import { useWishlist } from "@/lib/WishlistContext";
import { useToast } from "@/components/ToastProvider";
import { useState } from "react";
import QuickViewModal from "./QuickViewModal";

interface ProductCardProps extends Product {
  className?: string;
}

export function ProductCard(product: ProductCardProps) {
  const { id, name, price, oldPrice, image, category, className } = product;
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const { success, info } = useToast();
  const [isQuickViewOpen, setIsQuickViewOpen] = useState(false);

  const isFavorite = isInWishlist(id);

  const toggleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (isFavorite) {
      removeFromWishlist(id);
      info(`${name} retiré des favoris`);
    } else {
      addToWishlist(product);
      success(`${name} ajouté aux favoris`);
    }
  };

  const handleQuickView = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsQuickViewOpen(true);
  };

  return (
    <>
      <div className={cn("group flex flex-col h-full bg-white", className)}>
        <Link
          href={`/product/${id}`}
          className="block relative aspect-[4/5] overflow-hidden bg-[#F5F5F5] mb-4"
        >
          <Image
            src={image}
            alt={name}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-105"
            sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
          />
          
          {/* Action Buttons Overlay */}
          <div className="absolute top-4 right-4 flex flex-col gap-2 z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <button
              onClick={toggleWishlist}
              className={cn(
                "w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-md transition-all duration-300 hover:bg-gold hover:text-white",
                isFavorite ? "text-gold" : "text-primary"
              )}
              aria-label={isFavorite ? "Retirer des favoris" : "Ajouter aux favoris"}
            >
              <Heart size={18} fill={isFavorite ? "currentColor" : "none"} />
            </button>
            <button
              onClick={handleQuickView}
              className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-md transition-all duration-300 hover:bg-gold hover:text-white text-primary"
              aria-label="Aperçu rapide"
            >
              <Plus size={18} />
            </button>
          </div>

          {/* New/Sale Badge */}
          {oldPrice && (
            <div className="absolute top-4 left-4 bg-red-600 text-white text-[10px] font-bold px-2 py-1 uppercase tracking-wider">
              Solde
            </div>
          )}
        </Link>

        <div className="flex flex-col space-y-1 text-center">
          <Link href={`/product/${id}`} className="group-hover:text-gold transition-colors duration-300">
            <h3 className="text-sm font-bold uppercase tracking-tight text-primary leading-tight line-clamp-2">
              {name}
            </h3>
          </Link>
          <div className="flex items-center justify-center gap-2">
            {oldPrice && (
              <span className="text-xs text-muted-foreground line-through">{oldPrice} DH</span>
            )}
            <span className="text-sm font-bold text-primary">{price} DH</span>
          </div>
        </div>
      </div>

      <QuickViewModal 
        product={product} 
        isOpen={isQuickViewOpen} 
        onClose={() => setIsQuickViewOpen(false)} 
      />
    </>
  );
}

