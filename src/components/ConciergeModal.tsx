"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, ArrowRight, Check } from "lucide-react";
import { cn } from "@/lib/utils";

const inquiryTypes = [
  { id: "availability", label: "Vérifier la disponibilité" },
  { id: "custom", label: "Personnalisation sur mesure" },
  { id: "visit", label: "Prendre rendez-vous au showroom" },
  { id: "catalog", label: "Demander le catalogue complet" },
];

export default function ConciergeModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedInquiry, setSelectedInquiry] = useState<string | null>(null);

  const handleWhatsAppRedirect = () => {
    const phone = "212600000000"; // Placeholder Moroccan number
    const message = selectedInquiry 
      ? `Bonjour Diamond Meubles, je souhaite: ${inquiryTypes.find(i => i.id === selectedInquiry)?.label}`
      : "Bonjour Diamond Meubles, je souhaite avoir plus d'informations.";
    
    window.open(`https://wa.me/${phone}?text=${encodeURIComponent(message)}`, "_blank");
    setIsOpen(false);
  };

  return (
    <>
      {/* Floating Button */}
      <motion.button
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        whileHover={{ scale: 1.1 }}
        onClick={() => setIsOpen(true)}
        className="fixed bottom-8 right-8 z-[100] bg-black text-white p-4 rounded-full shadow-2xl flex items-center gap-3 group"
      >
        <div className="bg-gold p-2 rounded-full text-white">
          <MessageCircle size={20} />
        </div>
        <span className="max-w-0 overflow-hidden group-hover:max-w-[200px] transition-all duration-500 ease-in-out whitespace-nowrap text-xs uppercase tracking-widest font-medium">
          Parler à un conseiller
        </span>
      </motion.button>

      {/* Modal Overlay */}
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-[110] flex items-center justify-center px-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />
            
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-lg bg-white overflow-hidden shadow-2xl"
            >
              {/* Header */}
              <div className="bg-beige p-10 relative">
                <button 
                  onClick={() => setIsOpen(false)}
                  className="absolute top-6 right-6 text-primary hover:text-gold transition-colors"
                >
                  <X size={24} />
                </button>
                <span className="text-gold uppercase tracking-[0.2em] text-[10px] mb-2 block">Service Client Prestige</span>
                <h2 className="text-3xl font-serif text-primary">Comment pouvons-nous vous accompagner ?</h2>
              </div>

              {/* Options */}
              <div className="p-10 space-y-4">
                {inquiryTypes.map((type) => (
                  <button
                    key={type.id}
                    onClick={() => setSelectedInquiry(type.id)}
                    className={cn(
                      "w-full flex items-center justify-between p-5 border transition-all duration-300",
                      selectedInquiry === type.id 
                        ? "border-gold bg-gold/5" 
                        : "border-beige hover:border-gold/50"
                    )}
                  >
                    <span className={cn(
                      "text-sm uppercase tracking-widest",
                      selectedInquiry === type.id ? "text-gold font-medium" : "text-primary"
                    )}>
                      {type.label}
                    </span>
                    {selectedInquiry === type.id && <Check size={16} className="text-gold" />}
                  </button>
                ))}

                <button
                  onClick={handleWhatsAppRedirect}
                  className="w-full mt-8 bg-black text-white py-5 uppercase tracking-[0.2em] text-xs font-bold hover:bg-gold transition-colors flex items-center justify-center gap-4 group"
                >
                  Démarrer la discussion
                  <ArrowRight size={16} className="group-hover:translate-x-2 transition-transform duration-300" />
                </button>
                
                <p className="text-[10px] text-center text-muted-foreground uppercase tracking-widest mt-6">
                  Réponse moyenne : <span className="text-primary font-medium">moins de 15 minutes</span>
                </p>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
