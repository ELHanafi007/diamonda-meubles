"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { Plus, Heart } from "lucide-react";
import { cn } from "@/lib/utils";
import TextReveal from "./TextReveal";
import { Product } from "@/lib/products";
import { useWishlist } from "@/lib/WishlistContext";
import { useToast } from "@/components/ToastProvider";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";

interface ProductCardProps extends Product {
  className?: string;
}

export function ProductCard(product: ProductCardProps) {
  const { id, name, price, image, category, className } = product;
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const { success, info } = useToast();

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

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className={cn("group flex flex-col h-full", className)}
    >
      <Link
        href={`/product/${id}`}
        className="block relative aspect-[3/4] overflow-hidden bg-beige mb-4 md:mb-8"
      >
        {/* Subtle Image Zoom */}
        <Image
          src={image}
          alt={name}
          fill
          className="object-cover transition-transform duration-1000 ease-in-out group-hover:scale-108"
          sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
        />

        {/* Favorite Button */}
        <button
          onClick={toggleWishlist}
          className={cn(
            "absolute top-3 right-3 md:top-5 md:right-5 z-20 transition-all duration-300 active:scale-90 p-2 rounded-full backdrop-blur-sm",
            isFavorite ? "text-gold bg-white/20" : "text-white/70 bg-black/10 hover:text-gold"
          )}
          aria-label={isFavorite ? "Retirer des favoris" : "Ajouter aux favoris"}
        >
          <Heart size={18} strokeWidth={1.5} fill={isFavorite ? "currentColor" : "none"} className="w-4 h-4 md:w-[18px] md:h-[18px]" />
        </button>

        {/* Quick View Overlay - Hidden on small mobile */}
        <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-all duration-700 ease-in-out hidden md:block" />

        <div className="absolute inset-x-0 bottom-0 p-8 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-700 ease-out z-20 hidden md:block">
          <button
            className="w-full bg-white/90 backdrop-blur-md text-primary py-4 uppercase tracking-[0.3em] text-[9px] font-bold hover:bg-gold hover:text-white transition-all duration-500 shadow-xl flex items-center justify-center gap-3"
            aria-label={`Aperçu rapide de ${name}`}
          >
            <Plus size={14} /> Aperçu Rapide
          </button>
        </div>
      </Link>

      <div className="flex flex-col space-y-2 md:space-y-3 mt-auto">
        <div className="flex items-center justify-between gap-2 md:gap-4">
          <span className="text-[8px] md:text-[10px] uppercase tracking-[0.2em] md:tracking-[0.3em] text-gold font-semibold truncate">{category}</span>
          <div className="h-[1px] bg-beige flex-1" />
        </div>
        <div className="space-y-1">
          <h3 className="text-sm md:text-xl font-serif tracking-tight text-primary leading-tight group-hover:text-gold transition-colors duration-500 line-clamp-2">{name}</h3>
          <p className="text-[10px] md:text-sm font-medium tracking-tight opacity-70 italic">{price} MAD</p>
        </div>
      </div>
    </motion.div>
  );
}

export default function FeaturedProducts() {
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFeatured = async () => {
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from('products')
          .select('*')
          .eq('featured', true)
          .limit(4);
        
        if (error) throw error;
        setFeaturedProducts(data || []);
      } catch (err) {
        console.error("Error fetching featured products:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchFeatured();
  }, []);

  return (
    <section className="py-24 md:py-32 bg-white px-6 border-t border-beige overflow-hidden">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 md:mb-20 gap-10">
          <div className="max-w-2xl">
            <motion.span 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="text-gold uppercase tracking-[0.4em] text-[10px] md:text-xs mb-4 block font-semibold"
            >
              Édition Limitée
            </motion.span>
            <TextReveal 
              text="Pièces Maîtresses" 
              className="text-4xl md:text-6xl font-serif leading-none text-primary"
            />
          </div>
          <Link 
            href="/shop" 
            className="group flex items-center gap-4 text-[10px] uppercase tracking-[0.3em] font-bold pb-2 transition-all duration-300"
          >
            Voir la Collection
            <div className="relative overflow-hidden w-8 h-[1px] bg-primary group-hover:bg-gold transition-colors">
              <motion.div 
                animate={{ x: [-32, 32] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 bg-gold w-full h-full translate-x-[-100%]"
              />
            </div>
          </Link>
        </div>

        {loading ? (
          <div className="py-20 flex flex-col items-center justify-center space-y-4">
            <div className="w-12 h-12 border-4 border-beige border-t-gold rounded-full animate-spin"></div>
            <p className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground animate-pulse">Chargement de la sélection...</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-4 gap-y-12 md:gap-x-12 md:gap-y-20">
            {featuredProducts.length > 0 ? featuredProducts.map((product) => (
              <ProductCard key={product.id} {...product} />
            )) : (
              <div className="col-span-full text-center py-10 italic text-muted-foreground">
                Aucune pièce en vedette pour le moment.
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
