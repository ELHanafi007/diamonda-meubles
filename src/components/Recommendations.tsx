"use client";

import { useEffect, useState } from "react";
import { Product } from "@/lib/products";
import { supabase } from "@/lib/supabaseClient";
import { ProductCard } from "./ProductCard";
import { motion } from "framer-motion";
import TextReveal from "./TextReveal";

interface RecommendationsProps {
  currentProduct: Product;
}

export default function Recommendations({ currentProduct }: RecommendationsProps) {
  const [recommendations, setRecommendations] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRecommendations = async () => {
      try {
        setLoading(true);
        
        // 1. Try to get products from the same category
        let { data: related, error } = await supabase
          .from('products')
          .select('*')
          .eq('category', currentProduct.category)
          .neq('id', currentProduct.id)
          .limit(4);

        if (error) throw error;

        let combinedResults = related || [];

        // 2. If we have less than 4, try same material
        if (combinedResults.length < 4) {
          const { data: materialRelated } = await supabase
            .from('products')
            .select('*')
            .eq('material', currentProduct.material)
            .neq('id', currentProduct.id)
            .not('id', 'in', `(${combinedResults.map(p => p.id).join(',') || '0'})`)
            .limit(4 - combinedResults.length);
          
          if (materialRelated) {
            combinedResults = [...combinedResults, ...materialRelated];
          }
        }

        // 3. If still less than 4, try same sub-category
        if (combinedResults.length < 4 && currentProduct.sub_category) {
          const { data: subCatRelated } = await supabase
            .from('products')
            .select('*')
            .eq('sub_category', currentProduct.sub_category)
            .neq('id', currentProduct.id)
            .not('id', 'in', `(${combinedResults.map(p => p.id).join(',') || '0'})`)
            .limit(4 - combinedResults.length);
          
          if (subCatRelated) {
            combinedResults = [...combinedResults, ...subCatRelated];
          }
        }

        // 4. If still less than 4, get featured products
        if (combinedResults.length < 4) {
          const { data: featured } = await supabase
            .from('products')
            .select('*')
            .eq('featured', true)
            .neq('id', currentProduct.id)
            .not('id', 'in', `(${combinedResults.map(p => p.id).join(',') || '0'})`)
            .limit(4 - combinedResults.length);
          
          if (featured) {
            combinedResults = [...combinedResults, ...featured];
          }
        }

        setRecommendations(combinedResults);
      } catch (err) {
        console.error("Error fetching recommendations:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchRecommendations();
  }, [currentProduct]);

  if (loading) {
    return (
      <div className="py-24 border-t border-beige">
        <div className="flex flex-col items-center justify-center space-y-4">
          <div className="w-10 h-10 border-2 border-beige border-t-gold rounded-full animate-spin"></div>
          <p className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground animate-pulse">Sélection de pièces similaires...</p>
        </div>
      </div>
    );
  }

  if (recommendations.length === 0) return null;

  return (
    <section className="pt-24 border-t border-beige">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-gold uppercase tracking-[0.4em] text-[10px] mb-4 block font-bold"
          >
            Suggestions
          </motion.span>
          <TextReveal
            text="Vous Aimerez Aussi"
            className="text-4xl md:text-5xl font-serif tracking-tight text-primary"
          />
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-12">
          {recommendations.map((product) => (
            <ProductCard key={product.id} {...product} />
          ))}
        </div>
      </div>
    </section>
  );
}
