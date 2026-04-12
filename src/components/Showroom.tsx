"use client";

import { motion } from "framer-motion";
import TextReveal from "./TextReveal";
import { MapPin, Clock, Phone, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function Showroom() {
  return (
    <section className="py-24 md:py-48 bg-black text-white px-6 overflow-hidden">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row items-baseline justify-between mb-24 gap-8">
          <div className="max-w-3xl">
            <motion.span 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="text-gold uppercase tracking-[0.4em] text-[10px] md:text-xs mb-4 block font-semibold"
            >
              L'Expérience Physique
            </motion.span>
            <div className="flex flex-col">
              <TextReveal 
                text="Notre Showroom" 
                className="text-4xl md:text-7xl font-serif leading-none tracking-tight text-white"
              />
              <TextReveal 
                text="à Rabat." 
                className="text-4xl md:text-7xl font-serif italic text-gold/80 leading-none tracking-tight"
                delay={0.5}
              />
            </div>
          </div>
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.8 }}
            className="text-white/40 text-[10px] md:text-xs uppercase tracking-[0.3em] max-w-xs leading-relaxed"
          >
            Un espace dédié à l'art de vivre et au design d'exception au cœur de la capitale.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24">
          <div className="lg:col-span-8">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
              className="relative aspect-video overflow-hidden group shadow-2xl"
            >
              <img 
                src="https://images.unsplash.com/photo-1497366754035-f200968a6e72?q=80&w=1200" 
                alt="Diamontaris Meubles Showroom" 
                className="w-full h-full object-cover grayscale opacity-50 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-1000"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-12 left-12 flex items-center gap-6">
                 <Link 
                  href="/contact"
                  className="bg-white text-black px-10 py-5 uppercase tracking-[0.25em] text-[10px] font-bold hover:bg-gold hover:text-white transition-all duration-500"
                 >
                   Planifier une visite
                 </Link>
              </div>
            </motion.div>
          </div>

          <div className="lg:col-span-4 flex flex-col justify-center space-y-12">
            <div className="space-y-8">
              <div className="flex gap-6 items-start">
                <MapPin className="text-gold shrink-0 mt-1" size={20} />
                <div className="space-y-2">
                  <h4 className="text-xs uppercase tracking-widest font-bold text-white/90">Adresse</h4>
                  <p className="text-white/60 text-sm font-light leading-relaxed tracking-wide">
                    Quartier Takaddoum,<br />
                    Rabat, Maroc
                  </p>
                </div>
              </div>

              <div className="flex gap-6 items-start">
                <Clock className="text-gold shrink-0 mt-1" size={20} />
                <div className="space-y-2">
                  <h4 className="text-xs uppercase tracking-widest font-bold text-white/90">Horaires</h4>
                  <p className="text-white/60 text-sm font-light leading-relaxed tracking-wide">
                    Lundi — Samedi<br />
                    09:00 — 18:00
                  </p>
                </div>
              </div>

              <div className="flex gap-6 items-start">
                <Phone className="text-gold shrink-0 mt-1" size={20} />
                <div className="space-y-2">
                  <h4 className="text-xs uppercase tracking-widest font-bold text-white/90">Téléphone</h4>
                  <p className="text-white/60 text-sm font-light leading-relaxed tracking-wide">
                    +212 707 95 11 23
                  </p>
                </div>
              </div>
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="pt-8 border-t border-white/10"
            >
              <Link 
                href="/contact"
                className="text-gold text-[10px] uppercase tracking-[0.4em] font-bold hover:text-white transition-colors flex items-center gap-4 group"
              >
                Prendre Rendez-vous <ArrowRight size={14} className="group-hover:translate-x-2 transition-transform duration-300" />
              </Link>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
