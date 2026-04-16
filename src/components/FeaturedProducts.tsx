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
import { ProductCard } from "./ProductCard";

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
