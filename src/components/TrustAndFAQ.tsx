"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Shield, Truck, Award, Clock, Star, CheckCircle2, MessageCircle, Plus } from "lucide-react";
import Link from "next/link";

const trustItems = [
  {
    icon: Shield,
    title: "Garantie 5-15 Ans",
    description: "Chaque pièce est couverte par notre garantie exclusive de qualité."
  },
  {
    icon: Truck,
    title: "Livraison Prestige",
    description: "Installation professionnelle incluse dans tout le Maroc."
  },
  {
    icon: Award,
    title: "Artisanat d'Excellence",
    description: "Fabrication artisanale avec des matériaux nobles sourcés mondialement."
  },
  {
    icon: Clock,
    title: "Service Conciergerie",
    description: "Disponibles 7j/7 pour vous accompagner dans vos projets."
  }
];

const faqItems = [
  {
    question: "Quels sont les délais de livraison ?",
    answer: "Les délais varient selon les pièces : de 1 à 10 semaines selon le caractère standard ou sur-mesure du produit. Notre équipe vous tiendra informé à chaque étape."
  },
  {
    question: "Proposez-vous la personnalisation ?",
    answer: "Absolument. La majorité de nos pièces peuvent être adaptées : tissus, dimensions, finitions. Contactez notre service conciergerie pour discuter de vos souhaits."
  },
  {
    question: "Comment se déroule la livraison ?",
    answer: "Notre équipe spécialisée assure la livraison, le déballage et l'installation dans la pièce de votre choix. Nous prenons soin de chaque détail jusqu'au dernier coussin."
  },
  {
    question: "Quelles sont les modalités de paiement ?",
    answer: "Nous proposons un paiement en 3 fois sans frais pour les commandes supérieures à 10.000 MAD. Un acompte de 40% est demandé à la commande."
  },
  {
    question: "Puis-je voir les pièces avant achat ?",
    answer: "Notre atelier de Rabat expose une sélection de nos pièces. Sur rendez-vous, nous pouvons également organiser une visite virtuelle personnalisée."
  }
];

export default function TrustAndFAQ() {
  return (
    <>
      {/* Trust Indicators Section */}
      <section className="py-24 md:py-32 bg-[#FAFAFA] px-6 border-y border-beige">
        <div className="container mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16 md:mb-24"
          >
            <span className="text-gold uppercase tracking-[0.4em] text-[10px] font-bold block mb-4">Pourquoi Nous Choisir</span>
            <h2 className="text-4xl md:text-6xl font-serif tracking-tight text-primary">L'Excellence au Service du Beau</h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
            {trustItems.map((item, idx) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1, duration: 0.8 }}
                className="text-center space-y-6 group"
              >
                <div className="w-16 h-16 mx-auto bg-white border border-beige rounded-full flex items-center justify-center group-hover:border-gold transition-colors duration-500">
                  <item.icon size={24} className="text-gold" strokeWidth={1.5} />
                </div>
                <h3 className="text-sm uppercase tracking-[0.25em] font-bold text-primary">{item.title}</h3>
                <p className="text-sm text-muted-foreground font-light leading-relaxed">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonial Quote Section */}
      <section className="py-24 md:py-32 bg-white px-6">
        <div className="container mx-auto max-w-5xl text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.5 }}
          >
            <div className="flex justify-center mb-8">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star key={star} size={24} className="fill-gold text-gold" />
              ))}
            </div>
            <blockquote className="text-2xl md:text-4xl font-serif italic leading-relaxed text-primary/90 mb-8">
              « Un service irréprochable et des pièces d'une qualité exceptionnelle. Notre salon est métamorphosé. »
            </blockquote>
            <div className="flex flex-col items-center gap-3">
              <div className="w-12 h-[1px] bg-gold" />
              <span className="uppercase tracking-[0.4em] text-[10px] font-bold text-muted-foreground">Famille Alaoui, Casablanca</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24 md:py-32 bg-[#FAFAFA] px-6">
        <div className="container mx-auto max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="text-gold uppercase tracking-[0.4em] text-[10px] font-bold block mb-4">Questions Fréquentes</span>
            <h2 className="text-4xl md:text-6xl font-serif tracking-tight text-primary">Nous Sommes Là Pour Vous</h2>
          </motion.div>

          <div className="space-y-4">
            {faqItems.map((faq, idx) => (
              <FAQItem key={idx} question={faq.question} answer={faq.answer} index={idx} />
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
            className="mt-16 text-center"
          >
            <p className="text-muted-foreground mb-6">Vous avez d'autres questions ?</p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-3 bg-black text-white px-10 py-5 uppercase tracking-[0.25em] text-[10px] font-bold hover:bg-gold transition-all duration-500"
            >
              <MessageCircle size={16} /> Contactez Notre Équipe
            </Link>
          </motion.div>
        </div>
      </section>
    </>
  );
}

// FAQ Accordion Item Component
function FAQItem({ question, answer, index }: { question: string; answer: string; index: number }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      className="bg-white border border-beige overflow-hidden"
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-6 md:p-8 text-left hover:bg-[#FAFAFA] transition-colors"
        aria-expanded={isOpen}
      >
        <span className="text-base md:text-lg font-serif text-primary pr-8">{question}</span>
        <motion.div
          animate={{ rotate: isOpen ? 45 : 0 }}
          transition={{ duration: 0.3 }}
          className="text-gold shrink-0"
        >
          <Plus size={20} strokeWidth={1.5} />
        </motion.div>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="px-6 md:px-8 pb-6 md:pb-8">
              <p className="text-muted-foreground leading-relaxed font-light">{answer}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
