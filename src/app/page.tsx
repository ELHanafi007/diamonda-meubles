"use client";

import Hero from "@/components/Hero";
import Categories from "@/components/Categories";
import SignatureCollection from "@/components/SignatureCollection";
import FeaturedProducts from "@/components/FeaturedProducts";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import TextReveal from "@/components/TextReveal";
import Atelier from "@/components/Atelier";
import Showroom from "@/components/Showroom";
import Newsletter from "@/components/Newsletter";
import TrustAndFAQ from "@/components/TrustAndFAQ";
import Link from "next/link";

export default function Home() {
  const philosophyRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: philosophyRef,
    offset: ["start end", "end start"]
  });

  const imgY = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);

  return (
    <>
      <Hero />
      <Categories />
      
      {/* Philosophy Section - Editorial Style */}
      <section id="philosophy" ref={philosophyRef} className="py-24 md:py-48 bg-[#FAF9F6] px-6 overflow-hidden">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-32 items-center">
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
              className="relative aspect-[4/5] md:aspect-square overflow-hidden shadow-2xl group"
            >
              <motion.img 
                style={{ y: imgY }}
                src="https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?q=80&w=1000" 
                alt="Luxury Interior Story" 
                className="w-full h-full object-cover grayscale-[10%] hover:grayscale-0 transition-all duration-1000 scale-110"
              />
              <div className="absolute inset-0 border-[20px] border-white/10 pointer-events-none" />
              <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
            </motion.div>
            
            <div className="space-y-10 md:space-y-12">
              <div className="space-y-4">
                <motion.span 
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  className="text-gold uppercase tracking-[0.4em] text-[10px] md:text-xs font-bold block"
                >
                  Notre Vision
                </motion.span>
                <div className="flex flex-col gap-2">
                  <TextReveal 
                    text="L'Art de créer des" 
                    className="text-4xl md:text-6xl lg:text-7xl font-serif leading-none tracking-tight text-primary"
                  />
                  <TextReveal 
                    text="espaces uniques." 
                    className="text-4xl md:text-6xl lg:text-7xl font-serif italic text-gold/80 leading-none tracking-tight"
                    delay={0.5}
                  />
                </div>
              </div>

              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: 0.8 }}
                className="text-muted-foreground leading-relaxed text-lg md:text-xl font-light max-w-xl"
              >
                Chez Diamontaris Meubles, nous ne vendons pas seulement du mobilier. Nous concevons des expériences sensorielles où chaque courbe, chaque texture et chaque matériau est choisi pour sublimer votre quotidien. 
              </motion.p>

              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 1 }}
                className="pt-6"
              >
                <Link 
                  href="/about"
                  className="group relative inline-block bg-black text-white px-12 py-6 uppercase tracking-[0.3em] text-[10px] font-bold overflow-hidden transition-all duration-500 hover:shadow-[0_20px_40px_rgba(0,0,0,0.2)]"
                >
                  <span className="relative z-10">Découvrir Notre Histoire</span>
                  <div className="absolute inset-0 bg-gold translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out" />
                </Link>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      <div id="atelier">
        <Atelier />
      </div>

      <FeaturedProducts />
      
      <div id="showroom">
        <Showroom />
      </div>

      <TrustAndFAQ />

      {/* Testimonials - Refined Minimalist */}
      <section className="py-32 md:py-48 bg-white px-6">
        <div className="container mx-auto text-center max-w-5xl">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="text-gold text-6xl md:text-8xl font-serif mb-12 block opacity-30">“</span>
            <p className="text-2xl md:text-5xl font-serif italic leading-[1.3] text-primary/90 mb-16 tracking-tight">
              « Le luxe n'est pas une question de prix, mais de sentiment. Diamontaris Meubles a transformé notre maison en un sanctuaire d'élégance absolue. »
            </p>
            <div className="flex flex-col items-center gap-4">
              <div className="w-12 h-[1px] bg-gold" />
              <span className="uppercase tracking-[0.5em] text-[10px] md:text-xs text-muted-foreground font-bold">Mme. Benjelloun, Rabat</span>
            </div>
          </motion.div>
        </div>
      </section>

      <Newsletter />

      {/* CTA Section - Impactful Final Note */}
      <section id="contact" className="relative py-32 md:py-60 bg-black text-white px-6 overflow-hidden">
        {/* Animated Background Element */}
        <motion.div 
          animate={{ 
            scale: [1, 1.1, 1],
            rotate: [0, 5, 0] 
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute inset-0 opacity-20 pointer-events-none"
        >
           <div className="absolute top-[-10%] left-[-10%] w-[60%] h-[60%] bg-gold/10 blur-[150px] rounded-full" />
           <div className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] bg-gold/5 blur-[150px] rounded-full" />
        </motion.div>

        <div className="container mx-auto text-center relative z-10">
          <div className="space-y-16">
            <div className="flex flex-col items-center">
              <TextReveal 
                text="Prêt à sublimer" 
                className="text-4xl md:text-7xl lg:text-9xl font-serif leading-none tracking-tighter"
              />
              <TextReveal 
                text="votre intérieur ?" 
                className="text-4xl md:text-7xl lg:text-9xl font-serif italic text-gold/80 leading-none tracking-tighter"
                delay={0.5}
              />
            </div>
            
            <motion.p 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 1.2 }}
              className="text-white/50 text-xs md:text-sm uppercase tracking-[0.4em] max-w-lg mx-auto leading-relaxed"
            >
              Diamantez votre maison. Nos conseillers vous accompagnent dans la réalisation de vos projets les plus ambitieux.
            </motion.p>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 1.5 }}
              className="pt-8"
            >
              <Link 
                href="/contact"
                className="group relative inline-block border border-white/30 text-white px-16 py-7 uppercase tracking-[0.3em] text-[10px] font-bold overflow-hidden transition-all duration-700 hover:border-white"
              >
                <span className="relative z-10">Prendre rendez-vous</span>
                <div className="absolute inset-0 bg-white translate-y-full group-hover:translate-y-0 transition-transform duration-700 ease-out" />
                <span className="absolute inset-0 flex items-center justify-center text-black opacity-0 group-hover:opacity-100 transition-opacity duration-700 z-20 font-bold uppercase tracking-[0.3em] text-[10px]">Prendre rendez-vous</span>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
}
