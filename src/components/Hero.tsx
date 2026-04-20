"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import TextReveal from "./TextReveal";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative h-screen w-full overflow-hidden flex items-center justify-center">
      {/* Background Image with Slow Cinematic Zoom */}
      <motion.div
        initial={{ scale: 1.15 }}
        animate={{ scale: 1 }}
        transition={{ duration: 15, ease: [0.22, 1, 0.36, 1] }}
        className="absolute inset-0 z-0"
      >
        <div
          className="absolute inset-0 bg-black/40 z-10"
          aria-hidden="true"
        />
        <Image
          src="/hero.jpeg"
          alt="Luxury Living Room - Diamontaris Meubles Showroom"
          fill
          className="object-cover select-none"
          priority
          quality={90}
        />
      </motion.div>

      {/* Hero Content */}
      <div className="relative z-20 text-center px-6 max-w-5xl mx-auto">
        <div className="space-y-6 md:space-y-10">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="text-white/80 uppercase tracking-[0.5em] text-[10px] md:text-xs font-medium block"
          >
            L'Excellence du Mobilier Marocain
          </motion.span>
          
          <div className="flex flex-col items-center">
            <TextReveal 
              text="L'Art de Vivre" 
              className="text-5xl sm:text-6xl md:text-8xl lg:text-9xl text-white font-serif leading-tight tracking-tighter"
              delay={0.5}
            />
            <TextReveal 
              text="en Diamant" 
              className="text-5xl sm:text-6xl md:text-8xl lg:text-9xl text-gold/90 font-serif italic font-extralight leading-none tracking-tighter"
              delay={1}
            />
          </div>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.5, delay: 2 }}
            className="text-white/60 text-[10px] md:text-xs uppercase tracking-[0.5em] font-light max-w-xl mx-auto leading-loose hidden sm:block"
          >
            Créateur d'espaces d'exception où l'élégance rencontre l'artisanat.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 2.5, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col sm:flex-row items-center justify-center gap-6 md:gap-12 pt-12"
          >
            <Link 
              href="/shop"
              className="group relative w-full sm:w-auto px-16 py-6 overflow-hidden"
            >
              <div className="absolute inset-0 bg-white transition-transform duration-700 ease-out group-hover:scale-105" />
              <span className="relative z-10 text-primary text-[10px] font-bold uppercase tracking-[0.4em] transition-colors duration-500 group-hover:text-gold">
                La Collection
              </span>
            </Link>
            <Link 
              href="/#philosophy"
              className="group flex items-center gap-6 text-white text-[10px] font-bold uppercase tracking-[0.4em] transition-all duration-500"
            >
              <span>Notre Univers</span>
              <div className="w-12 h-[1px] bg-white/30 group-hover:w-20 group-hover:bg-gold transition-all duration-700" />
            </Link>
          </motion.div>
        </div>
      </div>

      {/* Elegant Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5, delay: 3 }}
        className="absolute bottom-12 left-1/2 -translate-x-1/2 z-20 text-white flex flex-col items-center gap-4"
      >
        <div className="h-16 w-[1px] bg-gradient-to-b from-white/0 via-white/50 to-white/0 relative overflow-hidden">
          <motion.div 
            animate={{ y: [0, 64] }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            className="absolute top-0 left-0 w-full h-1/2 bg-white"
          />
        </div>
        <span className="text-[9px] uppercase tracking-[0.4em] opacity-50 font-medium">Scroll</span>
      </motion.div>
    </section>
  );
}
