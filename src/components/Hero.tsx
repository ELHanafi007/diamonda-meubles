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
          src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=2000"
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
              text="L'Élégance" 
              className="text-5xl sm:text-6xl md:text-7xl lg:text-9xl text-white font-serif leading-none tracking-tight"
              delay={0.5}
            />
            <TextReveal 
              text="Redéfinie" 
              className="text-5xl sm:text-6xl md:text-7xl lg:text-9xl text-gold/90 font-serif italic font-extralight leading-none tracking-tight"
              delay={1}
            />
          </div>

          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5, delay: 2 }}
            className="text-white/70 text-xs md:text-sm uppercase tracking-[0.3em] font-light max-w-md mx-auto leading-relaxed hidden sm:block"
          >
            Créateur d'espaces d'exception et de moments inoubliables.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 2.5, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 md:gap-8 pt-8"
          >
            <Link 
              href="/shop"
              className="w-full sm:w-auto bg-white text-primary px-12 py-5 uppercase tracking-[0.25em] text-[10px] font-bold hover:bg-gold hover:text-white transition-all duration-700 ease-in-out shadow-xl text-center"
            >
              La Collection
            </Link>
            <Link 
              href="/#philosophy"
              className="w-full sm:w-auto border border-white/40 text-white px-12 py-5 uppercase tracking-[0.25em] text-[10px] font-bold hover:bg-white hover:text-primary transition-all duration-700 ease-in-out backdrop-blur-sm text-center"
            >
              Nos Ambiances
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
