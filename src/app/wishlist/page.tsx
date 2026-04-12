"use client";

import { useWishlist } from "@/lib/WishlistContext";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { Trash2, ArrowRight, ShoppingBag, ArrowLeft } from "lucide-react";

export default function WishlistPage() {
  const { wishlist, removeFromWishlist, clearWishlist } = useWishlist();

  const totalPrice = wishlist.reduce((acc, item) => {
    return acc + parseInt(item.price.replace(".", ""));
  }, 0);

  return (
    <div className="pt-32 pb-24 px-6 min-h-screen bg-white">
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

        {wishlist.length === 0 ? (
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

            {/* Summary / Checkout */}
            <div className="lg:col-span-5">
              <div className="bg-[#FAFAFA] p-10 sticky top-32 border border-beige/50">
                <h3 className="text-[10px] uppercase tracking-[0.4em] font-bold mb-10 pb-4 border-b border-beige">Récapitulatif</h3>
                
                <div className="space-y-6 mb-10">
                  <div className="flex justify-between text-sm uppercase tracking-widest text-muted-foreground">
                    <span>Articles</span>
                    <span>{wishlist.length}</span>
                  </div>
                  <div className="flex justify-between text-sm uppercase tracking-widest text-muted-foreground">
                    <span>Livraison</span>
                    <span className="text-gold italic">Offerte (Maroc)</span>
                  </div>
                  <div className="pt-6 border-t border-beige flex justify-between items-baseline">
                    <span className="text-sm uppercase tracking-widest font-bold">Total Estimé</span>
                    <span className="text-3xl font-serif text-primary">{totalPrice.toLocaleString()} MAD</span>
                  </div>
                </div>

                <div className="space-y-4">
                  <button 
                    onClick={() => alert("Cette fonctionnalité sera bientôt disponible avec l'intégration du paiement ou du WhatsApp Concierge.")}
                    className="w-full bg-black text-white py-6 uppercase tracking-[0.3em] text-[10px] font-bold hover:bg-gold transition-all duration-500 shadow-xl flex items-center justify-center gap-4 group"
                  >
                    Finaliser ma Demande <ArrowRight size={14} className="group-hover:translate-x-2 transition-transform" />
                  </button>
                  <p className="text-[9px] text-center text-muted-foreground uppercase tracking-widest pt-4">
                    Paiement sécurisé ou Règlement à la livraison
                  </p>
                </div>

                <div className="mt-12 p-6 border border-dashed border-beige text-center">
                  <p className="text-[10px] uppercase tracking-widest text-gold font-bold mb-2">Service Excellence</p>
                  <p className="text-[9px] text-muted-foreground leading-relaxed">
                    Besoin de conseils personnalisés ? Nos experts sont à votre disposition pour configurer votre intérieur.
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
