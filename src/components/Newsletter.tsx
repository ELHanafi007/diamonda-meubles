"use client";

import { motion } from "framer-motion";

export default function Newsletter() {
  return (
    <section className="py-24 bg-[#FAF9F6] px-6">
      <div className="container mx-auto">
        <div className="max-w-4xl mx-auto border border-beige p-8 md:p-20 bg-white shadow-sm relative overflow-hidden">
          {/* Decorative Elements */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-gold/5 rounded-full -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-gold/5 rounded-full translate-y-1/2 -translate-x-1/2" />
          
          <div className="relative z-10 text-center space-y-10">
            <div className="space-y-4">
              <span className="text-gold uppercase tracking-[0.4em] text-[10px] md:text-xs font-bold block">Le Cercle Diamond</span>
              <h2 className="text-3xl md:text-5xl font-serif text-primary tracking-tight">Rejoignez l'Exclusivité</h2>
              <p className="text-muted-foreground text-sm md:text-base max-w-lg mx-auto leading-relaxed">
                Inscrivez-vous pour recevoir nos invitations aux ventes privées, nos nouveaux catalogues et nos conseils en design d'intérieur.
              </p>
            </div>

            <form className="flex flex-col md:flex-row gap-4 max-w-xl mx-auto" onSubmit={(e) => e.preventDefault()}>
              <input 
                type="email" 
                placeholder="VOTRE ADRESSE EMAIL"
                className="flex-1 bg-transparent border-b border-beige py-4 px-2 text-[10px] uppercase tracking-widest focus:border-gold outline-none transition-colors placeholder:text-muted-foreground/50"
              />
              <button 
                data-cursor="REJOINDRE"
                className="bg-black text-white px-10 py-5 uppercase tracking-[0.25em] text-[10px] font-bold hover:bg-gold transition-colors duration-500"
              >
                S'inscrire
              </button>
            </form>
            
            <p className="text-[9px] uppercase tracking-[0.2em] text-muted-foreground opacity-60">
              En vous inscrivant, vous acceptez notre politique de confidentialité.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
