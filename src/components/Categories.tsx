"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { PRODUCTS } from "@/lib/products";

const DISPLAY_SUB_CATEGORIES = [
  { name: "Buffets", filter: "Buffets / Bahuts", slug: "buffets-bahuts" },
  { name: "Bibliothèques", filter: "Bibliothèques", slug: "bibliotheques" },
  { name: "Tables basses", filter: "Tables basses", slug: "tables-basses" },
];

export default function Categories() {
  return (
    <section className="py-12 md:py-24 bg-white overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="space-y-20">
          {DISPLAY_SUB_CATEGORIES.map((subCat) => {
            const subCatProducts = PRODUCTS.filter(p => p.subCategory === subCat.filter);
            
            if (subCatProducts.length === 0) return null;

            return (
              <div key={subCat.name} className="space-y-8">
                {/* Section Header */}
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl md:text-3xl font-sans font-bold tracking-tight text-primary uppercase">
                    {subCat.name}
                  </h2>
                  <Link 
                    href={`/shop?subCategory=${subCat.slug}`}
                    className="flex items-center gap-2 px-4 py-2 border border-beige rounded-sm text-[10px] md:text-xs font-sans font-bold uppercase tracking-widest hover:bg-beige transition-colors group"
                  >
                    Tous les {subCat.name.toLowerCase()}
                    <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>

                {/* Product Grid / Horizontal Scroll */}
                <div className="flex overflow-x-auto gap-6 pb-4 no-scrollbar snap-x snap-mandatory">
                  {subCatProducts.map((product) => (
                    <div 
                      key={product.id}
                      className="min-w-[260px] md:min-w-[320px] flex-shrink-0 snap-start group"
                    >
                      <Link href={`/product/${product.id}`} className="block space-y-4">
                        {/* Product Image Wrapper */}
                        <div className="relative aspect-[4/5] overflow-hidden bg-[#F9F9F9]">
                          <Image
                            src={product.image}
                            alt={product.name}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-700"
                            sizes="(max-width: 768px) 260px, 320px"
                          />
                          
                          {/* Discount Badge */}
                          {product.discount && (
                            <div className="absolute top-4 right-4 bg-white px-2 py-1 shadow-sm">
                              <span className="text-[10px] font-bold text-red-600">
                                -{product.discount}%
                              </span>
                            </div>
                          )}
                        </div>

                        {/* Product Info */}
                        <div className="space-y-1">
                          <h3 className="text-xs md:text-sm font-sans font-bold tracking-widest uppercase text-primary truncate">
                            {product.name}
                          </h3>
                          <div className="flex items-center gap-3">
                            {product.oldPrice && (
                              <span className="text-[10px] md:text-xs text-muted-foreground line-through">
                                {product.oldPrice} Dh
                              </span>
                            )}
                            <span className="text-xs md:text-sm font-sans font-bold text-red-600">
                              {product.price} Dh
                            </span>
                          </div>
                        </div>
                      </Link>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
