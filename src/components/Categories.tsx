"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ShoppingCart } from "lucide-react";
import { PRODUCTS } from "@/lib/products";
import { CATEGORIES } from "@/lib/categories";

export default function Categories() {
  return (
    <section className="py-16 md:py-28 bg-white overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="space-y-24 md:space-y-32">
          {CATEGORIES.map((cat) => {
            // Filter products that belong to this category
            const categoryProducts = PRODUCTS.filter(p => 
              p.category === cat.name
            ).slice(0, 8); // Limit to 8 products per section for the home page
            
            if (categoryProducts.length === 0) return null;

            return (
              <motion.div 
                key={cat.id} 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8 }}
                className="space-y-10"
              >
                {/* Section Header */}
                <div className="flex items-end justify-between border-b border-beige pb-6">
                  <div className="space-y-2">
                    <h2 className="text-3xl md:text-5xl font-serif tracking-tight text-primary">
                      {cat.name}
                    </h2>
                    <p className="text-[10px] md:text-xs uppercase tracking-[0.4em] text-gold font-bold">
                      {cat.subtitle || "Collection Signature"}
                    </p>
                  </div>
                  <Link 
                    href={`/category/${cat.slug}`}
                    className="flex items-center gap-3 px-6 py-3 bg-primary text-white text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] hover:bg-gold transition-all duration-500 group"
                  >
                    Voir tout
                    <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>

                {/* Product Horizontal Scroll */}
                <div className="flex overflow-x-auto gap-8 pb-8 no-scrollbar snap-x snap-mandatory -mx-6 px-6">
                  {categoryProducts.map((product) => (
                    <div 
                      key={product.id}
                      className="min-w-[280px] md:min-w-[380px] flex-shrink-0 snap-start group"
                    >
                      <Link href={`/product/${product.id}`} className="block space-y-6">
                        {/* Product Image Wrapper */}
                        <div className="relative aspect-[4/5] overflow-hidden bg-[#FDFDFD] shadow-sm">
                          <Image
                            src={product.image}
                            alt={product.name}
                            fill
                            className="object-cover group-hover:scale-110 transition-transform duration-1000 ease-[cubic-bezier(0.22,1,0.36,1)]"
                            sizes="(max-width: 768px) 280px, 380px"
                          />
                          
                          {/* Discount Badge */}
                          {product.discount && (
                            <div className="absolute top-6 right-6 bg-red-600 text-white px-3 py-1.5 font-bold text-[10px] tracking-tighter">
                              -{product.discount}%
                            </div>
                          )}

                          {/* Hover Overlay */}
                          <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                          
                          <div className="absolute bottom-6 left-6 right-6 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                             <div className="bg-white/90 backdrop-blur-md p-4 text-center text-[10px] font-bold uppercase tracking-widest flex items-center justify-center gap-2 border border-beige">
                               <ShoppingCart size={14} /> Aperçu Rapide
                             </div>
                          </div>
                        </div>

                        {/* Product Info */}
                        <div className="space-y-3">
                          <div className="flex justify-between items-start gap-4">
                            <h3 className="text-sm md:text-lg font-serif tracking-tight text-primary leading-tight group-hover:text-gold transition-colors duration-500">
                              {product.name}
                            </h3>
                            <div className="text-right">
                              <p className="text-sm md:text-base font-bold text-primary">
                                {product.price} <span className="text-[10px] font-medium ml-0.5">Dh</span>
                              </p>
                              {product.oldPrice && (
                                <p className="text-[10px] md:text-xs text-muted-foreground line-through opacity-60">
                                  {product.oldPrice} Dh
                                </p>
                              )}
                            </div>
                          </div>
                          <div className="h-[1px] bg-beige w-0 group-hover:w-full transition-all duration-700" />
                        </div>
                      </Link>
                    </div>
                  ))}
                  
                  {/* "See More" Card at the end of scroll */}
                  <div className="min-w-[200px] flex items-center justify-center snap-start">
                    <Link 
                      href={`/category/${cat.slug}`}
                      className="group flex flex-col items-center gap-4 text-primary hover:text-gold transition-colors"
                    >
                      <div className="w-16 h-16 rounded-full border border-beige flex items-center justify-center group-hover:border-gold transition-colors duration-500">
                        <ArrowRight size={24} className="group-hover:translate-x-1 transition-transform" />
                      </div>
                      <span className="text-[10px] uppercase tracking-[0.3em] font-bold">Découvrir tout</span>
                    </Link>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
