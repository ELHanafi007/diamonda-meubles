"use client";

import { motion } from "framer-motion";
import TextReveal from "@/components/TextReveal";
import { MapPin, Phone, Mail, Clock, MessageCircle } from "lucide-react";

export default function ContactPage() {
  const handleWhatsAppRedirect = () => {
    window.open("https://wa.me/212600000000", "_blank");
  };

  return (
    <div className="pt-32 pb-24">
      <section className="px-6 mb-24 text-center flex flex-col items-center">
        <motion.span 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-gold uppercase tracking-[0.4em] text-[10px] md:text-xs font-bold block mb-4"
        >
          Nous Contacter
        </motion.span>
        <TextReveal 
          text="Sublimer votre" 
          className="text-5xl md:text-8xl font-serif leading-none tracking-tight text-primary"
        />
        <TextReveal 
          text="prochain projet." 
          className="text-5xl md:text-8xl font-serif italic text-gold/80 leading-none tracking-tight"
          delay={0.5}
        />
      </section>

      <section className="px-6 mb-24">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-24">
            {/* Contact Information */}
            <div className="space-y-16">
              <div className="space-y-8">
                <h3 className="text-2xl font-serif text-primary">Le Showroom</h3>
                <div className="space-y-6">
                  <div className="flex gap-6 items-start group hover:translate-x-2 transition-transform duration-500">
                    <MapPin className="text-gold shrink-0 mt-1" size={24} />
                    <div className="space-y-2">
                      <h4 className="text-[10px] uppercase tracking-widest font-bold">Adresse</h4>
                      <p className="text-muted-foreground text-sm font-light leading-relaxed">
                        124 Boulevard d'Anfa, Gauthier,<br />Casablanca 20000, Maroc
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-6 items-start group hover:translate-x-2 transition-transform duration-500">
                    <Clock className="text-gold shrink-0 mt-1" size={24} />
                    <div className="space-y-2">
                      <h4 className="text-[10px] uppercase tracking-widest font-bold">Heures d'ouverture</h4>
                      <p className="text-muted-foreground text-sm font-light leading-relaxed">
                        Lundi — Samedi: 10:00 — 19:30<br />Dimanche: Fermé
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-6 items-start group hover:translate-x-2 transition-transform duration-500">
                    <Phone className="text-gold shrink-0 mt-1" size={24} />
                    <div className="space-y-2">
                      <h4 className="text-[10px] uppercase tracking-widest font-bold">Téléphone</h4>
                      <p className="text-muted-foreground text-sm font-light leading-relaxed">
                        +212 522 00 00 00
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-6 items-start group hover:translate-x-2 transition-transform duration-500">
                    <Mail className="text-gold shrink-0 mt-1" size={24} />
                    <div className="space-y-2">
                      <h4 className="text-[10px] uppercase tracking-widest font-bold">Email</h4>
                      <p className="text-muted-foreground text-sm font-light leading-relaxed">
                        contact@diamond-meubles.com
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="pt-12 border-t border-beige">
                <h3 className="text-2xl font-serif text-primary mb-8">Service Prestige</h3>
                <button 
                  onClick={handleWhatsAppRedirect}
                  className="w-full bg-black text-white py-6 uppercase tracking-[0.25em] text-[10px] font-bold hover:bg-gold transition-all duration-500 flex items-center justify-center gap-4 shadow-xl"
                >
                  <MessageCircle size={18} /> Parler avec un conseiller
                </button>
              </div>
            </div>

            {/* Google Maps Placeholder */}
            <motion.div 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="aspect-square lg:aspect-auto h-full w-full bg-beige grayscale group overflow-hidden border border-beige"
            >
               <img 
                 src="https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?q=80&w=1200" 
                 alt="Casablanca Location" 
                 className="w-full h-full object-cover group-hover:grayscale-0 transition-all duration-1000 scale-110"
               />
               <div className="absolute inset-0 flex items-center justify-center">
                 <div className="bg-white/90 backdrop-blur-md px-10 py-5 shadow-2xl">
                    <span className="text-[10px] uppercase tracking-[0.4em] font-bold">Localiser Diamond Meubles</span>
                 </div>
               </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
