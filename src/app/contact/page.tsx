"use client";

import { motion } from "framer-motion";
import { Calendar, Clock, MapPin, CheckCircle2, MessageCircle, ArrowRight, Loader2 } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

export default function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    date: "",
    service: "Visite Atelier",
    message: ""
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Logic for booking email could be added here similar to checkout
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
    }, 1500);
  };

  if (isSuccess) {
    return (
      <div className="pt-48 pb-24 px-6 min-h-screen bg-white text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="container mx-auto max-w-2xl space-y-8"
        >
          <div className="w-20 h-20 bg-gold/10 rounded-full flex items-center justify-center mx-auto mb-8">
            <CheckCircle2 size={40} className="text-gold" strokeWidth={1.5} />
          </div>
          <h1 className="text-5xl font-serif tracking-tight text-primary">Rendez-vous Confirmé</h1>
          <p className="text-xl text-muted-foreground font-light leading-relaxed">
            Merci <span className="text-primary font-medium">{formData.name}</span>. 
            Votre demande de visite privée pour le <span className="text-primary font-medium">{formData.date}</span> a été reçue. 
            Notre concierge vous appellera sur le <span className="text-primary font-medium">{formData.phone}</span> pour confirmer le créneau.
          </p>
          <div className="pt-12">
            <a 
              href="/"
              className="inline-flex items-center gap-4 bg-black text-white px-12 py-6 uppercase tracking-[0.3em] text-[10px] font-bold hover:bg-gold transition-colors"
            >
              Retour à l'accueil
            </a>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="pt-32 pb-24 px-6 bg-white min-h-screen">
      <div className="container mx-auto max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-start">
          {/* Left: Info & Experience */}
          <div className="space-y-16">
            <div>
              <motion.span 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="text-gold uppercase tracking-[0.4em] text-[10px] mb-4 block font-bold"
              >
                Service Excellence
              </motion.span>
              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="text-5xl md:text-8xl font-serif tracking-tighter text-primary leading-[0.9]"
              >
                Visite <br /> <span className="italic text-gold/80 pl-8 md:pl-16">Privée</span>
              </motion.h1>
            </div>

            <div className="space-y-10">
              <div className="flex gap-8 group">
                <div className="w-12 h-12 rounded-full border border-beige flex items-center justify-center shrink-0 group-hover:border-gold transition-colors">
                  <MapPin size={20} className="text-gold" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-[10px] uppercase tracking-[0.3em] font-bold">L'Atelier</h3>
                  <p className="text-muted-foreground font-light leading-relaxed">
                    Quartier Takaddoum, Rabat. <br />
                    Un espace de 400m² dédié à l'art de vivre d'exception.
                  </p>
                </div>
              </div>

              <div className="flex gap-8 group">
                <div className="w-12 h-12 rounded-full border border-beige flex items-center justify-center shrink-0 group-hover:border-gold transition-colors">
                  <Clock size={20} className="text-gold" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-[10px] uppercase tracking-[0.3em] font-bold">Horaires</h3>
                  <p className="text-muted-foreground font-light leading-relaxed">
                    Lundi — Samedi : 09h00 - 18h00 <br />
                    Dimanche : Sur rendez-vous uniquement.
                  </p>
                </div>
              </div>

              <div className="flex gap-8 group">
                <div className="w-12 h-12 rounded-full border border-beige flex items-center justify-center shrink-0 group-hover:border-gold transition-colors">
                  <MessageCircle size={20} className="text-gold" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-[10px] uppercase tracking-[0.3em] font-bold">Contact Direct</h3>
                  <p className="text-muted-foreground font-light leading-relaxed">
                    Tél : +212 707 95 11 23 <br />
                    Email : contact@diamontaris.ma
                  </p>
                </div>
              </div>
            </div>

            <div className="p-8 bg-[#FAFAFA] border border-beige/50">
              <p className="text-xs italic font-serif text-primary/60 leading-relaxed">
                Chaque visite est unique. Nous préparons votre accueil avec soin pour que vous puissiez projeter votre futur intérieur dans les meilleures conditions.
              </p>
            </div>
          </div>

          {/* Right: Booking Form */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white p-8 md:p-16 border border-beige shadow-2xl relative"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-gold/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl" />
            
            <h2 className="text-2xl font-serif mb-12 border-b border-beige pb-6">Réservez votre créneau</h2>
            
            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-2">
                  <label className="text-[9px] uppercase tracking-widest font-bold text-muted-foreground ml-1">Nom Complet</label>
                  <input 
                    required
                    type="text" 
                    className="w-full bg-transparent border-b border-beige py-4 outline-none focus:border-gold transition-colors font-serif text-lg"
                    placeholder="M. / Mme. ..."
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[9px] uppercase tracking-widest font-bold text-muted-foreground ml-1">Téléphone</label>
                  <input 
                    required
                    type="tel" 
                    className="w-full bg-transparent border-b border-beige py-4 outline-none focus:border-gold transition-colors font-serif text-lg"
                    placeholder="06 ..."
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-2">
                  <label className="text-[9px] uppercase tracking-widest font-bold text-muted-foreground ml-1">Date souhaitée</label>
                  <input 
                    required
                    type="date" 
                    className="w-full bg-transparent border-b border-beige py-4 outline-none focus:border-gold transition-colors font-serif text-lg uppercase text-xs"
                    value={formData.date}
                    onChange={(e) => setFormData({...formData, date: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[9px] uppercase tracking-widest font-bold text-muted-foreground ml-1">Service</label>
                  <select 
                    className="w-full bg-transparent border-b border-beige py-4 outline-none focus:border-gold transition-colors font-serif text-lg appearance-none"
                    value={formData.service}
                    onChange={(e) => setFormData({...formData, service: e.target.value})}
                  >
                    <option>Visite Atelier</option>
                    <option>Conseil Déco</option>
                    <option>Projet Sur-Mesure</option>
                  </select>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[9px] uppercase tracking-widest font-bold text-muted-foreground ml-1">Votre projet en quelques mots</label>
                <textarea 
                  rows={3}
                  className="w-full bg-transparent border-b border-beige py-4 outline-none focus:border-gold transition-colors font-serif text-lg resize-none"
                  placeholder="Ex: Aménagement salon complet..."
                  value={formData.message}
                  onChange={(e) => setFormData({...formData, message: e.target.value})}
                />
              </div>

              <div className="pt-8">
                <button 
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-black text-white py-7 uppercase tracking-[0.3em] text-[10px] font-bold hover:bg-gold transition-all duration-500 shadow-xl flex items-center justify-center gap-4 group"
                >
                  {isSubmitting ? (
                    <>Demande en cours... <Loader2 className="animate-spin" size={14} /></>
                  ) : (
                    <>Réserver mon accueil <ArrowRight size={14} className="group-hover:translate-x-2 transition-transform" /></>
                  )}
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
