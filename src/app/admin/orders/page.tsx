"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageSquare, User, MapPin, Calendar, Clock, ChevronRight, CheckCircle2, XCircle, Clock3, MoreVertical, ExternalLink } from "lucide-react";
import { cn } from "@/lib/utils";

// Mock data for orders/quotes
const mockOrders = [
  {
    id: "ORD-7241",
    customer: "Ahmed Benjelloun",
    phone: "06 61 22 33 44",
    city: "Rabat",
    address: "Hay Riad, Villa 14",
    date: "12 Avril 2026",
    time: "14:20",
    status: "pending",
    total: "22.700",
    items: [
      { name: "Canapé Royal Velours", price: "18.500" },
      { name: "Table Basse Marbre Noir", price: "4.200" }
    ]
  },
  {
    id: "ORD-7238",
    customer: "Siham Kasmi",
    phone: "06 70 88 99 00",
    city: "Casablanca",
    address: "Bouskoura Golf City",
    date: "11 Avril 2026",
    time: "10:15",
    status: "completed",
    total: "28.500",
    items: [
      { name: "Table Grand Palais", price: "28.500" }
    ]
  },
  {
    id: "ORD-7235",
    customer: "Marc Lefebvre",
    phone: "06 55 44 33 22",
    city: "Rabat",
    address: "Souissi",
    date: "10 Avril 2026",
    time: "16:45",
    status: "cancelled",
    total: "3.200",
    items: [
      { name: "Lampe à Poser Albâtre", price: "3.200" }
    ]
  }
];

export default function AdminOrders() {
  const [orders, setOrders] = useState(mockOrders);
  const [selectedOrder, setSelectedOrder] = useState<typeof mockOrders[0] | null>(null);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return <CheckCircle2 size={14} className="text-green-500" />;
      case 'cancelled': return <XCircle size={14} className="text-red-400" />;
      default: return <Clock3 size={14} className="text-gold" />;
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'completed': return 'Validé';
      case 'cancelled': return 'Annulé';
      default: return 'En attente';
    }
  };

  return (
    <div className="space-y-8">
      <header>
        <span className="text-gold uppercase tracking-[0.4em] text-[10px] font-bold block mb-2">Conciergerie</span>
        <h1 className="text-4xl font-serif text-primary">Demandes de Devis</h1>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Orders List */}
        <div className="lg:col-span-5 space-y-4">
          {orders.map((order) => (
            <motion.div
              key={order.id}
              layoutId={order.id}
              onClick={() => setSelectedOrder(order)}
              className={cn(
                "bg-white p-6 border transition-all cursor-pointer group relative overflow-hidden",
                selectedOrder?.id === order.id ? "border-gold shadow-lg" : "border-beige hover:border-gold/50"
              )}
            >
              <div className="flex justify-between items-start mb-4">
                <span className="text-[10px] font-mono text-muted-foreground">{order.id}</span>
                <div className="flex items-center gap-2 px-2 py-1 bg-beige/30 rounded-sm">
                  {getStatusIcon(order.status)}
                  <span className="text-[8px] uppercase font-bold tracking-widest">{getStatusText(order.status)}</span>
                </div>
              </div>
              
              <h3 className="text-lg font-serif text-primary mb-1">{order.customer}</h3>
              <p className="text-xs text-muted-foreground flex items-center gap-2 uppercase tracking-widest">
                <MapPin size={12} className="text-gold" /> {order.city}
              </p>

              <div className="mt-6 flex justify-between items-end">
                <div>
                  <p className="text-[10px] text-muted-foreground uppercase tracking-widest">Total Estimé</p>
                  <p className="text-base font-bold text-primary">{order.total} MAD</p>
                </div>
                <ChevronRight size={18} className={cn("transition-transform", selectedOrder?.id === order.id ? "text-gold translate-x-1" : "text-beige")} />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Order Details */}
        <div className="lg:col-span-7">
          <AnimatePresence mode="wait">
            {selectedOrder ? (
              <motion.div
                key={selectedOrder.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="bg-white border border-beige p-8 md:p-12 sticky top-8 shadow-sm"
              >
                <div className="flex justify-between items-start border-b border-beige pb-8 mb-8">
                  <div>
                    <h2 className="text-3xl font-serif mb-2">{selectedOrder.customer}</h2>
                    <p className="text-gold font-bold text-[10px] uppercase tracking-[0.3em]">{selectedOrder.id}</p>
                  </div>
                  <div className="flex gap-2">
                    <a 
                      href={`https://wa.me/${selectedOrder.phone.replace(/\s/g, '')}`}
                      target="_blank"
                      className="bg-[#25D366] text-white p-3 rounded-full hover:shadow-lg transition-all"
                    >
                      <MessageSquare size={18} />
                    </a>
                    <button className="bg-white border border-beige p-3 rounded-full hover:bg-beige transition-all">
                      <MoreVertical size={18} />
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-8 mb-12">
                  <div className="space-y-4">
                    <div className="flex items-center gap-3 text-muted-foreground">
                      <Calendar size={16} className="text-gold" />
                      <span className="text-xs uppercase tracking-widest">{selectedOrder.date}</span>
                    </div>
                    <div className="flex items-center gap-3 text-muted-foreground">
                      <Clock size={16} className="text-gold" />
                      <span className="text-xs uppercase tracking-widest">{selectedOrder.time}</span>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="flex items-center gap-3 text-muted-foreground">
                      <User size={16} className="text-gold" />
                      <span className="text-xs uppercase tracking-widest">{selectedOrder.phone}</span>
                    </div>
                    <div className="flex items-start gap-3 text-muted-foreground">
                      <MapPin size={16} className="text-gold mt-0.5" />
                      <span className="text-xs uppercase tracking-widest leading-relaxed">{selectedOrder.city}, {selectedOrder.address}</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-6 border-t border-beige pt-8">
                  <h4 className="text-[10px] uppercase tracking-[0.4em] font-bold text-muted-foreground">Articles Sélectionnés</h4>
                  <div className="space-y-4">
                    {selectedOrder.items.map((item, idx) => (
                      <div key={idx} className="flex justify-between items-center py-3 border-b border-beige/50 last:border-0">
                        <span className="text-sm font-serif">{item.name}</span>
                        <span className="text-sm italic">{item.price} MAD</span>
                      </div>
                    ))}
                  </div>
                  <div className="pt-4 flex justify-between items-baseline">
                    <span className="text-xs uppercase tracking-widest font-bold">Total Devis</span>
                    <span className="text-2xl font-serif text-gold">{selectedOrder.total} MAD</span>
                  </div>
                </div>

                <div className="mt-12 flex gap-4">
                  <button className="flex-1 bg-black text-white py-5 uppercase tracking-[0.2em] text-[10px] font-bold hover:bg-gold transition-all">Valider la commande</button>
                  <button className="flex-1 border border-beige py-5 uppercase tracking-[0.2em] text-[10px] font-bold hover:bg-red-50 hover:text-red-500 hover:border-red-200 transition-all">Annuler</button>
                </div>
              </motion.div>
            ) : (
              <div className="h-full min-h-[400px] bg-white border border-dashed border-beige flex flex-col items-center justify-center p-12 text-center opacity-50">
                <MessageSquare size={48} strokeWidth={1} className="mb-6 text-beige" />
                <p className="text-xl font-serif italic">Sélectionnez une demande pour voir les détails</p>
              </div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
