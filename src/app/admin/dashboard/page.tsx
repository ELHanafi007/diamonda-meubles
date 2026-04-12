"use client";

import { motion } from "framer-motion";
import { TrendingUp, Users, ShoppingBag, MessageSquare, ArrowUpRight, ArrowDownRight } from "lucide-react";
import { PRODUCTS } from "@/lib/products";

const stats = [
  { name: "Total Produits", value: PRODUCTS.length, icon: ShoppingBag, change: "+2", changeType: "increase" },
  { name: "Demandes Devis", value: "12", icon: MessageSquare, change: "+15%", changeType: "increase" },
  { name: "Vues Catalogue", value: "1.240", icon: Users, change: "+12.5%", changeType: "increase" },
  { name: "Engagement", value: "84%", icon: TrendingUp, change: "-2%", changeType: "decrease" },
];

export default function AdminDashboard() {
  return (
    <div className="space-y-12">
      <header>
        <span className="text-gold uppercase tracking-[0.4em] text-[10px] font-bold block mb-2">Aperçu</span>
        <h1 className="text-4xl font-serif text-primary">Tableau de Bord</h1>
      </header>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, idx) => (
          <motion.div
            key={stat.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="bg-white p-8 border border-beige shadow-sm relative overflow-hidden group"
          >
            <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:scale-110 transition-transform duration-500">
              <stat.icon size={64} />
            </div>
            
            <div className="flex items-center gap-4 mb-4">
              <div className="w-10 h-10 bg-gold/10 rounded-full flex items-center justify-center text-gold">
                <stat.icon size={18} />
              </div>
              <span className="text-[10px] uppercase tracking-widest font-bold text-muted-foreground">{stat.name}</span>
            </div>

            <div className="flex items-end justify-between">
              <span className="text-3xl font-serif text-primary">{stat.value}</span>
              <div className={`flex items-center gap-1 text-[10px] font-bold ${stat.changeType === 'increase' ? 'text-green-600' : 'text-red-600'}`}>
                {stat.changeType === 'increase' ? <ArrowUpRight size={12} /> : <ArrowDownRight size={12} />}
                {stat.change}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Recent Requests */}
        <div className="bg-white border border-beige shadow-sm p-8">
          <div className="flex justify-between items-center mb-8 pb-4 border-b border-beige">
            <h3 className="text-[10px] uppercase tracking-[0.3em] font-bold">Dernières Demandes</h3>
            <button className="text-[9px] uppercase tracking-widest text-gold font-bold">Tout voir</button>
          </div>
          
          <div className="space-y-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex justify-between items-center group cursor-pointer">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-beige rounded-full flex items-center justify-center font-serif text-sm">
                    {i === 1 ? 'AB' : i === 2 ? 'SK' : 'ML'}
                  </div>
                  <div>
                    <p className="text-sm font-medium">Ahmed Benjelloun</p>
                    <p className="text-[10px] text-muted-foreground uppercase tracking-widest">Rabat • Il y a 2h</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-xs font-serif italic text-gold">En attente</p>
                  <p className="text-[9px] text-muted-foreground">3 articles</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Top Products */}
        <div className="bg-white border border-beige shadow-sm p-8">
          <div className="flex justify-between items-center mb-8 pb-4 border-b border-beige">
            <h3 className="text-[10px] uppercase tracking-[0.3em] font-bold">Pièces les plus vues</h3>
            <button className="text-[9px] uppercase tracking-widest text-gold font-bold">Statistiques</button>
          </div>
          
          <div className="space-y-6">
            {PRODUCTS.slice(0, 3).map((product) => (
              <div key={product.id} className="flex justify-between items-center">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-beige overflow-hidden">
                    <img src={product.image} className="w-full h-full object-cover" alt="" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">{product.name}</p>
                    <p className="text-[10px] text-muted-foreground uppercase tracking-widest">{product.category}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-xs font-bold">{Math.floor(Math.random() * 500) + 100} vues</p>
                  <p className="text-[9px] text-muted-foreground uppercase tracking-widest">Ce mois</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
