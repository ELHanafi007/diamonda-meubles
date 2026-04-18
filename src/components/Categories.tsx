"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ChevronLeft, ChevronRight, Sparkles } from "lucide-react";
import { useEffect, useState, useRef } from "react";
import { CATEGORIES, Category } from "@/lib/categories";

export default function Categories() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [scrollProgress, setScrollProgress] = useState(0);

  const checkScroll = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
      setCanScrollLeft(scrollLeft > 10);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
      
      // Calculate scroll progress (0 to 1)
      const progress = scrollLeft / (scrollWidth - clientWidth);
      setScrollProgress(progress);
    }
  };

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (container) {
      container.addEventListener("scroll", checkScroll);
      window.addEventListener("resize", checkScroll);
      checkScroll();
    }
    return () => {
      container?.removeEventListener("scroll", checkScroll);
      window.removeEventListener("resize", checkScroll);
    };
  }, []);

  const scroll = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const { clientWidth } = scrollContainerRef.current;
      const scrollAmount = clientWidth * 0.8;
      scrollContainerRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <section className="py-24 md:py-48 bg-[#FCFBFA] overflow-hidden selection:bg-gold/30">
      <div className="container mx-auto px-6">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-12 mb-16 md:mb-28">
          <div className="space-y-8 max-w-3xl">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="flex items-center gap-4"
            >
              <div className="w-12 h-[1px] bg-gold" />
              <span className="text-gold uppercase tracking-[0.5em] text-[10px] md:text-xs font-black">
                Univers de Prestige
              </span>
            </motion.div>
            <motion.h2 
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
              className="text-6xl md:text-9xl font-serif text-primary leading-[0.85] tracking-tighter"
            >
              L'Art de <br /> 
              <span className="italic text-gold/80 font-extralight ml-6 md:ml-20">S'Inspirer</span>
            </motion.h2>
          </div>

          <div className="flex flex-col items-end gap-10">
            <div className="flex gap-4">
              <button 
                onClick={() => scroll("left")}
                disabled={!canScrollLeft}
                aria-label="Previous Category"
                className={`group p-6 rounded-full border transition-all duration-700 ${
                  !canScrollLeft 
                    ? 'border-beige text-beige opacity-30 cursor-not-allowed' 
                    : 'border-primary/10 hover:border-gold hover:bg-gold hover:text-white text-primary shadow-lg hover:shadow-gold/20'
                }`}
              >
                <ChevronLeft size={28} className="group-hover:-translate-x-1 transition-transform" />
              </button>
              <button 
                onClick={() => scroll("right")}
                disabled={!canScrollRight}
                aria-label="Next Category"
                className={`group p-6 rounded-full border transition-all duration-700 ${
                  !canScrollRight 
                    ? 'border-beige text-beige opacity-30 cursor-not-allowed' 
                    : 'border-primary/10 hover:border-gold hover:bg-gold hover:text-white text-primary shadow-lg hover:shadow-gold/20'
                }`}
              >
                <ChevronRight size={28} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
            
            {/* Scroll Progress Bar */}
            <div className="w-full md:w-64 space-y-3">
              <div className="flex justify-between text-[9px] uppercase tracking-[0.3em] font-bold text-primary/40">
                <span>Début</span>
                <span>Fin</span>
              </div>
              <div className="h-[2px] w-full bg-beige relative overflow-hidden rounded-full">
                <motion.div 
                  className="absolute inset-0 bg-gold origin-left"
                  animate={{ scaleX: scrollProgress }}
                  transition={{ duration: 0.1 }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Cinematic Categories Slider */}
        <div 
          ref={scrollContainerRef}
          data-cursor="Glisser"
          className="flex gap-8 md:gap-16 overflow-x-auto no-scrollbar snap-x snap-mandatory pb-32 -mx-6 px-6 cursor-grab active:cursor-grabbing"
        >
          {CATEGORIES.map((cat, index) => (
            <CategoryCard key={cat.id} category={cat} index={index} />
          ))}
          
          {/* Last Card - View Shop */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="min-w-[80vw] md:min-w-[500px] flex items-center justify-center snap-center"
          >
            <Link 
              href="/shop"
              className="group relative flex flex-col items-center gap-12 text-center p-16 rounded-sm border border-dashed border-beige/60 hover:border-gold/40 transition-colors duration-700 bg-white/50 backdrop-blur-sm overflow-hidden"
            >
              {/* Animated Background Pulse */}
              <div className="absolute inset-0 bg-gold/5 scale-0 group-hover:scale-150 transition-transform duration-1000 rounded-full" />
              
              <div className="relative w-40 h-40 md:w-56 md:h-56 flex items-center justify-center">
                <motion.div 
                  animate={{ rotate: 360 }}
                  transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                  className="absolute inset-0 border-[1px] border-gold/20 rounded-full"
                />
                <motion.div 
                  animate={{ rotate: -360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  className="absolute inset-4 border-[1px] border-dashed border-gold/30 rounded-full"
                />
                <div className="w-28 h-28 md:w-36 md:h-36 rounded-full bg-primary flex items-center justify-center group-hover:bg-gold transition-all duration-700 shadow-[0_20px_40px_rgba(0,0,0,0.15)] group-hover:shadow-gold/30 z-10">
                  <ArrowRight size={40} className="text-white group-hover:translate-x-3 transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]" />
                </div>
              </div>
              <div className="relative z-10 space-y-4">
                <span className="text-[10px] md:text-xs uppercase tracking-[0.5em] font-black text-gold">Exploration Totale</span>
                <p className="text-3xl md:text-4xl font-serif text-primary italic leading-tight">Découvrez l'intégralité <br/> de nos collections</p>
                <div className="pt-4">
                   <div className="h-[1px] w-12 bg-beige mx-auto group-hover:w-24 group-hover:bg-gold transition-all duration-700" />
                </div>
              </div>
            </Link>
          </motion.div>
        </div>
      </div>
      
      {/* Background Decorative Element */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-gold/5 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 right-0 translate-x-1/4 w-[600px] h-[600px] bg-primary/5 blur-[150px] rounded-full pointer-events-none" />
    </section>
  );
}

function CategoryCard({ category, index }: { category: Category; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 1.2, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
      className="min-w-[85vw] md:min-w-[550px] lg:min-w-[750px] aspect-[4/5] md:aspect-[16/10] relative group overflow-hidden snap-center rounded-sm shadow-[0_40px_80px_-20px_rgba(0,0,0,0.12)] bg-beige/10"
    >
      <Link href={`/category/${category.slug}`} className="block h-full w-full">
        {/* Cinematic Image Container */}
        <div className="absolute inset-0 overflow-hidden">
          <Image
            src={category.image}
            alt={category.name}
            fill
            className="object-cover transition-transform duration-[3000ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-110"
            sizes="(max-width: 768px) 85vw, 750px"
          />
        </div>
        
        {/* Multi-layered Overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-primary/95 via-primary/30 to-transparent opacity-50 group-hover:opacity-70 transition-opacity duration-1000" />
        <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-1000" />
        
        {/* Interactive Border */}
        <div className="absolute inset-0 border-[0px] group-hover:border-[20px] border-white/5 transition-all duration-1000 ease-out pointer-events-none" />
        
        {/* Category Branding */}
        <div className="absolute top-10 left-10 md:top-14 md:left-14 overflow-hidden">
            <motion.div
              initial={{ x: -100 }}
              whileInView={{ x: 0 }}
              transition={{ duration: 1, delay: 0.5 + index * 0.08 }}
              className="flex items-center gap-4"
            >
               <div className="w-8 h-[1px] bg-white/40" />
               <span className="text-white/60 text-[8px] md:text-[10px] uppercase tracking-[0.5em] font-medium">Diamontaris Selection</span>
            </motion.div>
        </div>

        {/* Content Box */}
        <div className="absolute inset-0 p-10 md:p-20 flex flex-col justify-end">
          <div className="relative z-10 space-y-6 md:space-y-10">
            <div className="space-y-4">
              <div className="overflow-hidden">
                <motion.span 
                  initial={{ y: "100%" }}
                  whileInView={{ y: 0 }}
                  transition={{ duration: 1, delay: 0.4 + index * 0.08 }}
                  className="text-gold text-[10px] md:text-xs uppercase tracking-[0.6em] font-black block"
                >
                  {category.subtitle || "Héritage & Design"}
                </motion.span>
              </div>
              
              <div className="overflow-hidden">
                <motion.h3 
                  initial={{ y: "100%" }}
                  whileInView={{ y: 0 }}
                  transition={{ duration: 1, delay: 0.5 + index * 0.08 }}
                  className="text-5xl md:text-8xl font-serif text-white leading-[0.85] tracking-tighter"
                >
                  {category.name}
                </motion.h3>
              </div>
            </div>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.7 + index * 0.08 }}
              className="flex flex-col md:flex-row md:items-center gap-8"
            >
               <div className="flex flex-wrap gap-3">
                  {category.subCategories.slice(0, 3).map((sub) => (
                    <span 
                      key={sub.slug} 
                      className="text-[9px] md:text-[10px] uppercase tracking-[0.2em] text-white/80 bg-white/10 backdrop-blur-xl border border-white/10 px-6 py-2.5 rounded-full hover:bg-gold hover:text-white transition-colors duration-500 cursor-pointer"
                    >
                      {sub.name}
                    </span>
                  ))}
               </div>
               
               <div className="h-[1px] flex-grow bg-white/10 hidden md:block" />
               
               <div className="flex items-center gap-6 text-white text-[10px] md:text-xs font-black uppercase tracking-[0.5em] group/btn">
                 <span className="relative py-2">
                   Explorer
                   <span className="absolute bottom-0 left-0 w-full h-[1px] bg-white/20 origin-right scale-x-0 group-hover/btn:scale-x-100 group-hover/btn:origin-left transition-transform duration-700" />
                 </span>
                 <div className="w-14 h-14 rounded-full border border-white/20 flex items-center justify-center group-hover/btn:border-gold group-hover/btn:bg-gold transition-all duration-700 shadow-2xl">
                   <ArrowRight size={20} className="group-hover/btn:translate-x-2 transition-transform duration-700" />
                 </div>
               </div>
            </motion.div>
          </div>
        </div>

        {/* Decorative Corner Element */}
        <div className="absolute top-10 right-10 md:top-14 md:right-14 flex flex-col items-center gap-2 opacity-0 group-hover:opacity-100 transition-all duration-1000 translate-y-[-20px] group-hover:translate-y-0">
           <div className="w-[1px] h-8 bg-gold/50" />
           <Sparkles size={20} className="text-gold/70" />
        </div>
      </Link>
    </motion.div>
  );
}
