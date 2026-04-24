"use client";

import React, { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";
import Link from "next/link";
import { Product } from "@/lib/products";
import { Category } from "@/lib/categories";
import { ProductCard } from "./ProductCard";
import { cn } from "@/lib/utils";

interface CategoryCarouselProps {
  category: Category;
  products: Product[];
  index: number;
}

export function CategoryCarousel({ category, products }: CategoryCarouselProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "start",
    containScroll: "trimSnaps",
    dragFree: true,
  });

  const [prevBtnDisabled, setPrevBtnDisabled] = useState(true);
  const [nextBtnDisabled, setNextBtnDisabled] = useState(true);

  const scrollPrev = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi]);

  const onSelect = useCallback((emblaApi: any) => {
    setPrevBtnDisabled(!emblaApi.canScrollPrev());
    setNextBtnDisabled(!emblaApi.canScrollNext());
  }, []);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect(emblaApi);
    emblaApi.on("reInit", onSelect);
    emblaApi.on("select", onSelect);
  }, [emblaApi, onSelect]);

  return (
    <div className="relative mb-16 md:mb-24">
      {/* Category Header - Cube.ma style */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 border-b border-beige pb-6 gap-6">
        <div className="flex flex-col gap-4">
          <div className="flex flex-col">
            <h2 className="text-2xl md:text-3xl font-bold uppercase tracking-tighter text-primary">
              {category.name}
            </h2>
            <Link 
              href={`/category/${category.slug}`}
              className="text-[10px] md:text-xs uppercase tracking-widest text-gold font-bold hover:underline mt-1"
            >
              Voir toute la collection
            </Link>
          </div>

          {/* Subcategories Links */}
          <div className="flex flex-wrap gap-x-4 gap-y-2">
            {category.subCategories.map((sub) => (
              <Link
                key={sub.slug}
                href={`/category/${category.slug}?sub=${sub.slug}`}
                className="text-[9px] md:text-[10px] uppercase tracking-[0.2em] text-muted-foreground hover:text-gold transition-colors border border-beige/60 px-3 py-1.5 hover:border-gold"
              >
                {sub.name}
              </Link>
            ))}
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <button 
            onClick={scrollPrev} 
            disabled={prevBtnDisabled}
            className={cn(
              "w-10 h-10 rounded-full border border-beige flex items-center justify-center transition-all",
              prevBtnDisabled ? "opacity-20 cursor-not-allowed" : "hover:border-gold hover:text-gold"
            )}
            aria-label="Précédent"
          >
            <ChevronLeft size={20} />
          </button>
          <button 
            onClick={scrollNext} 
            disabled={nextBtnDisabled}
            className={cn(
              "w-10 h-10 rounded-full border border-beige flex items-center justify-center transition-all",
              nextBtnDisabled ? "opacity-20 cursor-not-allowed" : "hover:border-gold hover:text-gold"
            )}
            aria-label="Suivant"
          >
            <ChevronRight size={20} />
          </button>
        </div>
      </div>

      {/* Carousel Area */}
      <div className="relative">
        <div className="overflow-hidden" ref={emblaRef}>
          <div className="flex gap-4 md:gap-6">
            {products.length > 0 ? (
              products.map((product) => (
                <div 
                  key={product.id} 
                  className="flex-[0_0_70%] md:flex-[0_0_22%] lg:flex-[0_0_20%]"
                >
                  <ProductCard {...product} />
                </div>
              ))
            ) : (
              <div className="flex-[0_0_100%] py-12 flex flex-col items-center justify-center bg-beige/5 border border-dashed border-beige">
                <p className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground mb-4">Cette collection sera bientôt disponible</p>
                <Link 
                  href="/contact"
                  className="text-[10px] uppercase tracking-[0.2em] font-bold text-gold hover:underline"
                >
                  Demander un catalogue personnalisé
                </Link>
              </div>
            )}
            
            {products.length > 0 && (
              <div className="flex-[0_0_70%] md:flex-[0_0_22%] lg:flex-[0_0_20%]">
                <Link 
                  href={`/category/${category.slug}`}
                  className="h-full min-h-[300px] flex flex-col items-center justify-center bg-[#F9F9F9] border border-beige border-dashed hover:bg-beige/20 transition-colors group"
                >
                  <div className="w-12 h-12 rounded-full border border-gold flex items-center justify-center mb-4 group-hover:bg-gold group-hover:text-white transition-all">
                    <ArrowRight size={20} />
                  </div>
                  <span className="text-xs uppercase tracking-widest font-bold text-primary">Voir tout</span>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
