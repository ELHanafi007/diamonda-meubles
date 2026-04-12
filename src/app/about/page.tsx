"use client";

import { motion } from "framer-motion";
import TextReveal from "@/components/TextReveal";
import { Check, ShieldCheck, Award, Heart } from "lucide-react";
import Link from "next/link";

export default function AboutPage() {
  return (
    <div className="pt-32 bg-white min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[70vh] flex items-center overflow-hidden bg-black">
        <motion.div 
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 0.6, scale: 1 }}
          transition={{ duration: 2, ease: "easeOut" }}
          className="absolute inset-0"
        >
          <img 
            src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=1200" 
            alt="Intérieur de luxe" 
            className="w-full h-full object-cover"
          />
        </motion.div>
        
        <div className="container mx-auto px-6 relative z-10 text-center">
          <motion.span 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-gold uppercase tracking-[0.5em] text-[10px] md:text-xs font-bold mb-6 block"
          >
            Héritage & Prestige
          </motion.span>
          <h1 className="text-5xl md:text-8xl font-serif text-white tracking-tighter mb-8">
            Notre <span className="italic text-gold/80">Histoire</span>
          </h1>
          <div className="w-24 h-[1px] bg-gold/50 mx-auto" />
        </div>
      </section>

      {/* Narrative Section */}
      <section className="py-24 md:py-48 px-6">
        <div className="container mx-auto max-w-4xl">
          <div className="space-y-16 text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
            >
              <h2 className="text-[10px] uppercase tracking-[0.4em] text-gold font-bold mb-10">L'Âme de Diamontaris</h2>
              <p className="text-2xl md:text-4xl font-serif leading-relaxed text-primary">
                "Diamantez votre maison n'est pas qu'un slogan, c'est une promesse de transformer chaque espace en une œuvre d'art habitable."
              </p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5, duration: 1 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-12 text-left"
            >
              <p className="text-muted-foreground leading-relaxed font-light text-lg">
                Fondée à Rabat, **Diamontaris Meubles** est née d'une passion profonde pour le design d'exception et l'artisanat de précision. Nous croyons que le mobilier est le reflet de l'âme de ceux qui habitent les lieux. C'est pourquoi nous sélectionnons les matériaux les plus nobles pour créer des pièces qui traversent le temps.
              </p>
              <p className="text-muted-foreground leading-relaxed font-light text-lg">
                Chaque création signée Diamontaris est le fruit d'une collaboration étroite entre nos designers et nos maîtres artisans. Situé au cœur du quartier Takaddoum, notre atelier est le lieu où la matière brute devient élégance pure, respectant les traditions tout en embrassant la modernité.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Savoir-Faire Grid */}
      <section className="py-24 bg-[#FAFAFA] px-6 overflow-hidden">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div className="space-y-12">
              <div className="space-y-4">
                <span className="text-gold uppercase tracking-[0.4em] text-[10px] font-bold block">Qualité Sans Compromis</span>
                <h2 className="text-4xl md:text-6xl font-serif text-primary tracking-tight">Le Savoir-Faire <br /><span className="italic text-gold/80">Artisanal</span></h2>
              </div>

              <div className="space-y-8">
                <div className="flex gap-6 items-start group">
                  <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shrink-0 shadow-sm border border-beige group-hover:border-gold transition-colors">
                    <ShieldCheck size={20} className="text-gold" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-sm uppercase tracking-widest font-bold">Matériaux Nobles</h3>
                    <p className="text-muted-foreground font-light text-sm leading-relaxed">
                      Nous sourçons exclusivement des essences de bois précieux, des marbres italiens et des velours de soie de la plus haute qualité.
                    </p>
                  </div>
                </div>

                <div className="flex gap-6 items-start group">
                  <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shrink-0 shadow-sm border border-beige group-hover:border-gold transition-colors">
                    <Award size={20} className="text-gold" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-sm uppercase tracking-widest font-bold">Précision Faite Main</h3>
                    <p className="text-muted-foreground font-light text-sm leading-relaxed">
                      Chaque couture, chaque polissage et chaque assemblage est réalisé à la main dans notre atelier de Rabat.
                    </p>
                  </div>
                </div>

                <div className="flex gap-6 items-start group">
                  <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shrink-0 shadow-sm border border-beige group-hover:border-gold transition-colors">
                    <Heart size={20} className="text-gold" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-sm uppercase tracking-widest font-bold">Service Conciergerie</h3>
                    <p className="text-muted-foreground font-light text-sm leading-relaxed">
                      De la première consultation au Showroom jusqu'à l'installation prestige chez vous, nous vous accompagnons.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative">
              <motion.div 
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
                className="aspect-[4/5] overflow-hidden shadow-2xl relative z-10"
              >
                <img 
                  src="https://images.unsplash.com/photo-1581092160562-40aa08e78837?q=80&w=800" 
                  alt="Artisan à l'œuvre" 
                  className="w-full h-full object-cover"
                />
              </motion.div>
              <div className="absolute -bottom-10 -left-10 w-64 h-64 border-[20px] border-white z-20 hidden md:block" />
              <div className="absolute -top-10 -right-10 w-full h-full border border-gold/20 -z-10" />
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-24 md:py-48 px-6 text-center">
        <div className="container mx-auto max-w-5xl">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="space-y-16"
          >
            <h2 className="text-[10px] uppercase tracking-[0.4em] text-gold font-bold">Nos Engagements</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
              <div className="space-y-4">
                <span className="text-4xl font-serif text-primary">Esthétique</span>
                <p className="text-sm text-muted-foreground font-light uppercase tracking-widest">Le beau avant tout</p>
              </div>
              <div className="space-y-4">
                <span className="text-4xl font-serif text-primary">Durabilité</span>
                <p className="text-sm text-muted-foreground font-light uppercase tracking-widest">Des meubles pour la vie</p>
              </div>
              <div className="space-y-4">
                <span className="text-4xl font-serif text-primary">Exclusivité</span>
                <p className="text-sm text-muted-foreground font-light uppercase tracking-widest">Pièces uniques</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 bg-black text-white px-6 text-center">
        <div className="container mx-auto max-w-2xl">
          <h2 className="text-3xl md:text-5xl font-serif mb-10 tracking-tight">Prêt à transformer votre intérieur ?</h2>
          <div className="flex flex-col md:flex-row gap-6 justify-center">
            <Link 
              href="/shop"
              className="bg-gold text-white px-12 py-6 uppercase tracking-[0.3em] text-[10px] font-bold hover:bg-white hover:text-black transition-all duration-500 shadow-xl"
            >
              Explorer les Collections
            </Link>
            <Link 
              href="/contact"
              className="border border-white/20 text-white px-12 py-6 uppercase tracking-[0.3em] text-[10px] font-bold hover:border-gold hover:text-gold transition-all duration-500"
            >
              Prendre Rendez-vous
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
