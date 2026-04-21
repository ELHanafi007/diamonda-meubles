"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { CATEGORIES } from "@/lib/categories";
import { Product } from "@/lib/products";
import { CategoryCarousel } from "./CategoryCarousel";

export default function Categories() {
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const { data } = await supabase.from('products').select('*');
        setAllProducts(data || []);
      } catch (err) {
        console.error("Error fetching products:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-6">
        {loading ? (
          <div className="py-40 flex flex-col items-center justify-center gap-8">
             <div className="relative w-24 h-24">
                <div className="absolute inset-0 border-2 border-beige border-t-gold rounded-full animate-spin" />
             </div>
             <p className="text-[10px] md:text-xs uppercase tracking-[0.6em] text-muted-foreground animate-pulse font-bold">Dévoilement des collections...</p>
          </div>
        ) : (
          <div className="space-y-16">
            {CATEGORIES.map((cat, index) => {
              const categoryProducts = allProducts.filter(p => p.category === cat.name);
              // Only show category if it has products
              if (categoryProducts.length === 0) return null;
              
              return (
                <CategoryCarousel 
                  key={cat.id} 
                  category={cat} 
                  products={categoryProducts} 
                  index={index}
                />
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
