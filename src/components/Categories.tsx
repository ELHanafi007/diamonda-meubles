"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ChevronLeft, ChevronRight, Sparkles, ShoppingCart } from "lucide-react";
import { useEffect, useState, useRef } from "react";
import { supabase } from "@/lib/supabaseClient";
import { CATEGORIES, Category } from "@/lib/categories";
import { Product } from "@/lib/products";
import { ProductCard } from "./ProductCard";

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
    <section className="py-24 md:py-48 bg-white overflow-hidden">
      <div className="container mx-auto px-6">
        {/* Header Section */}
        <div className="mb-24 md:mb-40 max-w-4xl">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex items-center gap-4 mb-8"
          >
            <div className="w-12 h-[1px] bg-gold" />
            <span className="text-gold uppercase tracking-[0.5em] text-[10px] md:text-xs font-black">
              Collections Diamontaris
            </span>
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="text-6xl md:text-9xl font-serif text-primary leading-[0.85] tracking-tighter"
          >
            L'Excellence par <br /> 
            <span className="italic text-gold/80 font-extralight ml-6 md:ml-20">Catégorie</span>
          </motion.h2>
        </div>

        <div className="space-y-40 md:space-y-64">
          {CATEGORIES.map((cat, index) => {
            const categoryProducts = allProducts.filter(p => p.category === cat.name);
            
            // Client Logic:
            // 1. "Decoration taydefiler plusieurs" (Multiple items slider)
            // 2. "W salon aussi" (Salon too)
            // 3. "Chariots ca defile pas" (No scroll / Static grid)
            // 4. "les autres taykon ghir wahd" (Others only one featured)
            
            let displayMode: 'slider' | 'single' | 'grid' = 'single';
            if (cat.id === 'salons' || cat.id === 'decoration') {
              displayMode = 'slider';
            } else if (cat.id === 'dessertes-chariots') {
              displayMode = 'grid';
            }

            return (
              <CategorySection 
                key={cat.id} 
                category={cat} 
                products={categoryProducts} 
                displayMode={displayMode} 
                index={index}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
}

function CategorySection({ category, products, displayMode, index }: { 
  category: Category; 
  products: Product[]; 
  displayMode: 'slider' | 'single' | 'grid';
  index: number;
}) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const amount = scrollRef.current.clientWidth * 0.8;
      scrollRef.current.scrollBy({ left: direction === 'left' ? -amount : amount, behavior: 'smooth' });
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
      className="group/section"
    >
      {/* Category Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-beige/60 pb-12 mb-16 gap-10">
        <div className="space-y-6">
          <div className="flex items-center gap-4">
             <span className="text-gold text-2xl filter grayscale opacity-50 group-hover/section:grayscale-0 group-hover/section:opacity-100 transition-all duration-700">{category.icon}</span>
             <span className="text-gold uppercase tracking-[0.5em] text-[10px] md:text-xs font-black">
               {category.subtitle || "Héritage & Prestige"}
             </span>
          </div>
          <h2 className="text-5xl md:text-8xl font-serif text-primary leading-none tracking-tighter">
            {category.name}
          </h2>
        </div>
        
        <div className="flex items-center gap-8">
           {displayMode === 'slider' && products.length > 1 && (
             <div className="flex gap-3 mr-4">
                <button 
                  onClick={() => scroll('left')} 
                  className="p-4 rounded-full border border-beige hover:border-gold hover:bg-gold hover:text-white transition-all duration-500 shadow-sm"
                >
                  <ChevronLeft size={20} />
                </button>
                <button 
                  onClick={() => scroll('right')} 
                  className="p-4 rounded-full border border-beige hover:border-gold hover:bg-gold hover:text-white transition-all duration-500 shadow-sm"
                >
                  <ChevronRight size={20} />
                </button>
             </div>
           )}
           <Link 
             href={`/category/${category.slug}`}
             className="group relative inline-flex items-center gap-6 px-10 py-5 bg-primary text-white text-[10px] font-bold uppercase tracking-[0.4em] hover:bg-gold transition-all duration-700 overflow-hidden"
           >
             <span className="relative z-10">Tout Explorer</span>
             <ArrowRight size={14} className="relative z-10 group-hover:translate-x-2 transition-transform duration-500" />
           </Link>
        </div>
      </div>

      {/* Content Area */}
      {products.length > 0 ? (
        <div className="relative">
          {displayMode === 'slider' && (
            <div 
              ref={scrollRef}
              className="flex gap-8 md:gap-12 overflow-x-auto no-scrollbar snap-x snap-mandatory -mx-6 px-6 pb-12"
            >
              {products.map((p) => (
                <div key={p.id} className="min-w-[85vw] md:min-w-[420px] lg:min-w-[480px] snap-center">
                   <ProductCard {...p} />
                </div>
              ))}
            </div>
          )}

          {displayMode === 'grid' && (
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-12">
               {products.slice(0, 4).map((p) => (
                 <ProductCard key={p.id} {...p} />
               ))}
            </div>
          )}

          {displayMode === 'single' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
               <motion.div 
                 whileHover={{ scale: 1.02 }}
                 transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
                 className="lg:col-span-7 aspect-[16/10] md:aspect-[16/9] relative overflow-hidden group/img shadow-2xl"
               >
                  <Image 
                    src={products[0].image} 
                    alt={products[0].name} 
                    fill 
                    className="object-cover transition-transform duration-[2000ms] group-hover/img:scale-110"
                    sizes="(max-width: 1024px) 100vw, 60vw"
                  />
                  <div className="absolute inset-0 bg-primary/10 group-hover/img:bg-transparent transition-colors duration-1000" />
                  <div className="absolute top-8 right-8 w-16 h-16 border border-white/20 rounded-full flex items-center justify-center backdrop-blur-md opacity-0 group-hover/img:opacity-100 transition-all duration-1000 scale-50 group-hover/img:scale-100">
                    <Sparkles size={20} className="text-gold" />
                  </div>
               </motion.div>
               
               <div className="lg:col-span-5 space-y-10">
                  <div className="space-y-6">
                    <div className="flex items-center gap-3">
                       <div className="w-8 h-[1px] bg-gold" />
                       <span className="text-gold text-[10px] uppercase tracking-[0.5em] font-black">À l'Honneur</span>
                    </div>
                    <h3 className="text-4xl md:text-6xl font-serif text-primary leading-tight tracking-tight">{products[0].name}</h3>
                    <p className="text-muted-foreground line-clamp-4 leading-relaxed text-lg font-light">{products[0].description}</p>
                    
                    <div className="flex flex-wrap gap-2 pt-2">
                       {category.subCategories.slice(0, 4).map(sub => (
                         <span key={sub.slug} className="text-[9px] uppercase tracking-widest text-primary/40 bg-beige/30 px-4 py-2 rounded-full border border-beige">
                           {sub.name}
                         </span>
                       ))}
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-12 pt-6">
                    <div className="space-y-1">
                      <p className="text-3xl font-bold text-primary tracking-tighter">{products[0].price} <span className="text-sm font-medium ml-1">Dh</span></p>
                      {products[0].oldPrice && <p className="text-sm text-muted-foreground line-through opacity-50">{products[0].oldPrice} Dh</p>}
                    </div>
                    <Link 
                      href={`/product/${products[0].id}`}
                      className="group flex items-center gap-4 text-[10px] uppercase tracking-[0.4em] font-black border-b-2 border-primary/10 pb-3 hover:border-gold transition-all duration-500"
                    >
                      Détails de la pièce
                      <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </div>
               </div>
            </div>
          )}
        </div>
      ) : (
        <div className="py-24 bg-[#FCFBFA] border border-dashed border-beige/60 flex flex-col items-center justify-center gap-6 rounded-sm">
           <div className="relative">
              <Sparkles size={32} className="text-gold animate-pulse" />
              <div className="absolute inset-0 bg-gold/20 blur-xl animate-pulse" />
           </div>
           <p className="text-[10px] md:text-xs uppercase tracking-[0.6em] text-primary/40 font-black">Collection Exclusive en Préparation</p>
        </div>
      )}
    </motion.div>
  );
}
