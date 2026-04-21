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

  if (products.length === 0) return null;

  return (
    <div className="relative mb-16 md:mb-24">
      {/* Category Header - Cube.ma style */}
      <div className="flex items-center justify-between mb-8 border-b border-beige pb-4">
        <div className="flex flex-col">
          <h2 className="text-2xl md:text-3xl font-bold uppercase tracking-tighter text-primary">
            {category.name}
          </h2>
          <Link 
            href={`/category/${category.slug}`}
            className="text-[10px] md:text-xs uppercase tracking-widest text-gold font-bold hover:underline mt-1"
          >
            Tous les {category.name.toLowerCase()}
          </Link>
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
            {products.map((product) => (
              <div 
                key={product.id} 
                className="flex-[0_0_70%] md:flex-[0_0_22%] lg:flex-[0_0_20%]"
              >
                <ProductCard {...product} />
              </div>
            ))}
            
            {/* Simple View All Card at the end */}
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
          </div>
        </div>
      </div>
    </div>
  );
}
