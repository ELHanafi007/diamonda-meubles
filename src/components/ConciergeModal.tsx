"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, ArrowRight, Check, Headset } from "lucide-react";
import { cn } from "@/lib/utils";

const inquiryTypes = [
  { id: "availability", label: "Disponibilité" },
  { id: "custom", label: "Sur Mesure" },
  { id: "visit", label: "Visite Showroom" },
  { id: "catalog", label: "Catalogue" },
];

export default function ConciergeModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedInquiry, setSelectedInquiry] = useState<string | null>(null);

  const handleWhatsAppRedirect = () => {
    const phone = "212600000000";
    const message = selectedInquiry 
      ? `Bonjour Diamond Meubles, je souhaite: ${inquiryTypes.find(i => i.id === selectedInquiry)?.label}`
      : "Bonjour Diamond Meubles, je souhaite avoir plus d'informations.";
    
    window.open(`https://wa.me/${phone}?text=${encodeURIComponent(message)}`, "_blank");
    setIsOpen(false);
  };

  return (
    <>
      {/* Floating Button - Premium Style */}
      <motion.button
        initial={{ opacity: 0, scale: 0.8, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 md:bottom-10 md:right-10 z-[100] flex items-center gap-4 group"
      >
        <div className="bg-black text-white p-5 rounded-full shadow-[0_10px_30px_rgba(0,0,0,0.3)] flex items-center justify-center relative overflow-hidden group">
          <motion.div 
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 3, repeat: Infinity, delay: 2 }}
          >
            <MessageCircle size={24} />
          </motion.div>
          <div className="absolute inset-0 bg-gold translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out -z-10" />
        </div>
        
        <div className="hidden md:flex flex-col items-start bg-white/80 backdrop-blur-md px-6 py-3 rounded-full shadow-lg border border-beige translate-x-4 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-500">
          <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-primary">Concierge</span>
          <span className="text-[9px] text-muted-foreground uppercase tracking-widest">En ligne</span>
        </div>
      </motion.button>

      {/* Modal Overlay */}
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-[110] flex items-end md:items-center justify-center">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            />
            
            <motion.div
              initial={{ opacity: 0, y: "100%", scale: 1 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: "100%", scale: 1 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="relative w-full max-w-lg bg-white overflow-hidden shadow-2xl rounded-t-3xl md:rounded-none"
            >
              {/* Header */}
              <div className="bg-beige/50 p-8 md:p-12 relative border-b border-beige">
                <button 
                  onClick={() => setIsOpen(false)}
                  className="absolute top-6 right-6 text-primary/40 hover:text-gold transition-colors p-2 active:rotate-90 duration-300"
                >
                  <X size={24} />
                </button>
                <div className="flex items-center gap-4 mb-6">
                  <div className="bg-gold/10 p-3 rounded-full">
                    <Headset size={20} className="text-gold" />
                  </div>
                  <span className="text-gold uppercase tracking-[0.3em] text-[9px] md:text-[10px] font-bold">Service Client Prestige</span>
                </div>
                <h2 className="text-3xl md:text-4xl font-serif text-primary leading-tight">Votre expert <br /><span className="italic">Diamond Meubles</span></h2>
              </div>

              {/* Options */}
              <div className="p-8 md:p-12 space-y-4">
                <p className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground mb-6 font-semibold text-center">Sélectionnez votre demande</p>
                
                <div className="grid grid-cols-2 gap-3">
                  {inquiryTypes.map((type) => (
                    <button
                      key={type.id}
                      onClick={() => setSelectedInquiry(type.id)}
                      className={cn(
                        "flex flex-col items-center justify-center py-6 px-4 border transition-all duration-500",
                        selectedInquiry === type.id 
                          ? "border-gold bg-gold/5 shadow-inner" 
                          : "border-beige hover:border-gold/30 hover:bg-beige/20"
                      )}
                    >
                      <span className={cn(
                        "text-[10px] uppercase tracking-[0.2em] transition-all",
                        selectedInquiry === type.id ? "text-gold font-bold" : "text-primary/70"
                      )}>
                        {type.label}
                      </span>
                      {selectedInquiry === type.id && (
                        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="mt-2">
                          <Check size={14} className="text-gold" />
                        </motion.div>
                      )}
                    </button>
                  ))}
                </div>

                <button
                  onClick={handleWhatsAppRedirect}
                  className="w-full mt-10 bg-black text-white py-6 uppercase tracking-[0.3em] text-[10px] font-bold hover:bg-gold transition-all duration-500 flex items-center justify-center gap-4 shadow-xl active:scale-95"
                >
                  Démarrer la discussion
                  <ArrowRight size={16} />
                </button>
                
                <div className="flex items-center justify-center gap-4 mt-8">
                   <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                   <p className="text-[9px] text-muted-foreground uppercase tracking-widest">
                     Conseillers disponibles <span className="text-primary font-bold ml-2">7j/7</span>
                   </p>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
