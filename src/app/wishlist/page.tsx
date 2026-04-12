"use client";

import { useWishlist } from "@/lib/WishlistContext";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { Trash2, ArrowRight, ShoppingBag, ArrowLeft, Loader2, CheckCircle2, X, MessageCircle } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

export default function WishlistPage() {
  const { wishlist, removeFromWishlist, clearWishlist } = useWishlist();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: ""
  });

  const totalPrice = wishlist.reduce((acc, item) => {
    return acc + parseInt(item.price.replace(".", ""));
  }, 0);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (wishlist.length === 0) return;
    
    setIsSubmitting(true);
    setError(null);
    
    try {
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          items: wishlist,
          totalPrice
        })
      });
      
      const result = await response.json();

      if (response.ok) {
        setIsSuccess(true);
        clearWishlist();
      } else {
        setError("L'envoi automatique a échoué. Nos équipes techniques travaillent dessus.");
      }
    } catch (err) {
      setError("Une erreur de connexion est survenue.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const whatsappMessage = `Bonjour Diamontaris, je souhaite recevoir un devis pour ma sélection :\n${wishlist.map(item => `- ${item.name} (${item.price} MAD)`).join('\n')}\nTotal estimé : ${totalPrice.toLocaleString()} MAD`;
  const whatsappUrl = `https://wa.me/212600000000?text=${encodeURIComponent(whatsappMessage)}`;

  return (
    <div className="pt-32 pb-24 px-6 min-h-screen bg-white relative">
      {/* Success Modal */}
      <AnimatePresence>
        {isSuccess && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] flex items-center justify-center p-6 bg-black/40 backdrop-blur-sm"
          >
            <motion.div 
              initial={{ scale: 0.9, y: 20, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="bg-white max-w-xl w-full p-12 md:p-16 text-center shadow-2xl relative overflow-hidden"
            >
              {/* Decorative background element */}
              <div className="absolute top-0 left-0 w-full h-1.5 bg-gold" />
              <div className="absolute -top-24 -right-24 w-48 h-48 bg-gold/5 rounded-full blur-3xl" />
              
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                className="w-20 h-20 bg-gold/10 rounded-full flex items-center justify-center mx-auto mb-10"
              >
                <CheckCircle2 size={40} className="text-gold" strokeWidth={1.5} />
              </motion.div>

              <h2 className="text-4xl md:text-5xl font-serif mb-6 tracking-tight text-primary">Demande Transmise</h2>
              <p className="text-muted-foreground leading-relaxed mb-12 font-light">
                Merci <span className="text-primary font-medium">{formData.name}</span>. 
                Votre sélection exclusive a été envoyée à notre service conciergerie. 
                Un conseiller Diamontaris vous contactera sur votre numéro <span className="text-primary font-medium">{formData.phone}</span> sous peu.
              </p>

              <Link 
                href="/shop"
                className="inline-block bg-black text-white px-12 py-6 uppercase tracking-[0.3em] text-[10px] font-bold hover:bg-gold transition-all duration-500 shadow-xl"
              >
                Continuer l'expérience
              </Link>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="container mx-auto max-w-6xl">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
          <div>
            <motion.span 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-gold uppercase tracking-[0.4em] text-[10px] mb-4 block font-semibold"
            >
              Votre Sélection
            </motion.span>
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-5xl md:text-7xl font-serif tracking-tight text-primary"
            >
              Coups de Cœur
            </motion.h1>
          </div>
          
          {wishlist.length > 0 && (
            <motion.button 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              onClick={clearWishlist}
              className="text-[10px] uppercase tracking-widest text-muted-foreground hover:text-red-500 transition-colors"
            >
              Tout effacer
            </motion.button>
          )}
        </div>

        {wishlist.length === 0 && !isSuccess ? (
          <div className="py-24 text-center border-t border-beige">
            <ShoppingBag size={48} className="mx-auto text-beige mb-8" strokeWidth={1} />
            <p className="text-2xl font-serif italic text-primary/60 mb-8">Votre sélection est vide...</p>
            <Link 
              href="/shop"
              className="inline-flex items-center gap-4 bg-black text-white px-10 py-5 uppercase tracking-[0.3em] text-[10px] font-bold hover:bg-gold transition-colors"
            >
              <ArrowLeft size={14} /> Retour aux Collections
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
            {/* List */}
            <div className="lg:col-span-7 space-y-8">
              <AnimatePresence>
                {wishlist.map((item, idx) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ delay: idx * 0.1 }}
                    className="flex flex-col sm:flex-row gap-8 py-8 border-t border-beige group"
                  >
                    <div className="w-full sm:w-40 aspect-[3/4] overflow-hidden bg-beige shrink-0">
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" />
                    </div>
                    <div className="flex-1 flex flex-col justify-between py-2">
                      <div className="space-y-2">
                        <div className="flex justify-between items-start">
                          <span className="text-[9px] uppercase tracking-[0.3em] text-gold font-bold">{item.category}</span>
                          <button 
                            onClick={() => removeFromWishlist(item.id)}
                            className="text-muted-foreground hover:text-red-500 transition-colors p-2"
                          >
                            <Trash2 size={16} strokeWidth={1.5} />
                          </button>
                        </div>
                        <h3 className="text-2xl font-serif text-primary">{item.name}</h3>
                        <p className="text-sm text-muted-foreground line-clamp-2 font-light">{item.description}</p>
                        <p className="text-[10px] uppercase tracking-widest text-primary/40 pt-2">Matériau: {item.material}</p>
                      </div>
                      <p className="text-lg font-medium text-primary mt-4 italic">{item.price} MAD</p>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            {/* Summary / Checkout Form */}
            <div className="lg:col-span-5">
              <div className="bg-[#FAFAFA] p-10 sticky top-32 border border-beige/50 shadow-sm">
                <h3 className="text-[10px] uppercase tracking-[0.4em] font-bold mb-10 pb-4 border-b border-beige">Finaliser ma Sélection</h3>
                
                {error && (
                  <motion.div 
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-8 p-6 bg-red-50 border border-red-100 rounded-sm space-y-4"
                  >
                    <div className="flex gap-3 text-red-800">
                      <X size={18} className="shrink-0" />
                      <p className="text-xs font-medium leading-relaxed">
                        Une erreur est survenue lors de l'envoi. <br />
                        Utilisez le bouton WhatsApp ci-dessous pour nous envoyer votre sélection directement.
                      </p>
                    </div>
                    <a 
                      href={whatsappUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-3 w-full bg-[#25D366] text-white py-4 px-6 text-[10px] uppercase tracking-widest font-bold hover:bg-[#128C7E] transition-colors shadow-md"
                    >
                      <MessageCircle size={16} /> Envoyer via WhatsApp
                    </a>
                  </motion.div>
                )}

                <form onSubmit={handleSubmit} className="space-y-8 mb-10">
                  <div className="space-y-2">
                    <label className="text-[9px] uppercase tracking-widest font-bold text-muted-foreground ml-1">Nom Complet</label>
                    <input 
                      required
                      type="text" 
                      placeholder="M. / Mme. ..."
                      className="w-full bg-white border border-beige/50 px-4 py-4 outline-none focus:border-gold transition-colors font-serif text-lg"
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[9px] uppercase tracking-widest font-bold text-muted-foreground ml-1">Email</label>
                    <input 
                      required
                      type="email" 
                      placeholder="votre@email.com"
                      className="w-full bg-white border border-beige/50 px-4 py-4 outline-none focus:border-gold transition-colors font-serif text-lg"
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[9px] uppercase tracking-widest font-bold text-muted-foreground ml-1">Téléphone</label>
                    <input 
                      required
                      type="tel" 
                      placeholder="06 ..."
                      className="w-full bg-white border border-beige/50 px-4 py-4 outline-none focus:border-gold transition-colors font-serif text-lg"
                      value={formData.phone}
                      onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    />
                  </div>

                  <div className="pt-6 border-t border-beige">
                    <div className="flex justify-between items-baseline mb-8">
                      <span className="text-sm uppercase tracking-widest font-bold">Total Estimé</span>
                      <span className="text-3xl font-serif text-primary">{totalPrice.toLocaleString()} MAD</span>
                    </div>

                    <button 
                      type="submit"
                      disabled={isSubmitting || wishlist.length === 0}
                      className={cn(
                        "w-full py-6 uppercase tracking-[0.3em] text-[10px] font-bold transition-all duration-500 shadow-xl flex items-center justify-center gap-4 group",
                        isSubmitting || wishlist.length === 0 
                          ? "bg-primary/20 text-white cursor-not-allowed" 
                          : "bg-black text-white hover:bg-gold"
                      )}
                    >
                      {isSubmitting ? (
                        <>Traitement en cours... <Loader2 size={14} className="animate-spin" /></>
                      ) : (
                        <>Valider ma Demande <ArrowRight size={14} className="group-hover:translate-x-2 transition-transform" /></>
                      )}
                    </button>
                  </div>
                </form>

                <div className="mt-8 p-6 border border-dashed border-beige text-center">
                  <p className="text-[10px] uppercase tracking-widest text-gold font-bold mb-2">Service Excellence</p>
                  <p className="text-[9px] text-muted-foreground leading-relaxed italic">
                    "Diamantez votre maison avec élégance et sérénité."
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
