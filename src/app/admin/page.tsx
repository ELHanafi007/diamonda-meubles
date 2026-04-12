"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Lock, ArrowRight, Loader2 } from "lucide-react";

export default function AdminLogin() {
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simple mock auth for the prototype
    // In production, use real auth like NextAuth
    setTimeout(() => {
      if (password === "admin123") {
        localStorage.setItem("admin_token", "true");
        router.push("/admin/dashboard");
      } else {
        alert("Mot de passe incorrect");
        setIsLoading(false);
      }
    }, 1000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-[#FAFAFA]">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full bg-white p-10 shadow-2xl border border-beige relative overflow-hidden"
      >
        <div className="absolute top-0 left-0 w-full h-1 bg-gold" />
        
        <div className="text-center mb-12">
          <span className="text-[10px] uppercase tracking-[0.4em] text-gold font-bold mb-4 block">Espace Sécurisé</span>
          <h1 className="text-3xl font-serif text-primary uppercase tracking-tighter">
            DIAMONTARIS <span className="text-gold italic font-extralight block text-xs mt-1">Admin Access</span>
          </h1>
        </div>

        <form onSubmit={handleLogin} className="space-y-8">
          <div className="space-y-2">
            <label className="text-[9px] uppercase tracking-widest font-bold text-muted-foreground ml-1">Clé d'accès</label>
            <div className="relative">
              <input 
                required
                type="password" 
                placeholder="••••••••"
                className="w-full bg-transparent border-b border-beige py-4 pl-10 outline-none focus:border-gold transition-colors font-mono tracking-widest"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <Lock size={16} className="absolute left-2 top-1/2 -translate-y-1/2 text-beige" />
            </div>
          </div>

          <button 
            type="submit"
            disabled={isLoading}
            className="w-full bg-black text-white py-6 uppercase tracking-[0.3em] text-[10px] font-bold hover:bg-gold transition-all duration-500 flex items-center justify-center gap-4 group disabled:bg-primary/20"
          >
            {isLoading ? (
              <Loader2 className="animate-spin" size={14} />
            ) : (
              <>Accéder au Panel <ArrowRight size={14} className="group-hover:translate-x-2 transition-transform" /></>
            )}
          </button>
        </form>

        <p className="text-center mt-12 text-[8px] uppercase tracking-widest text-muted-foreground">
          Réservé au personnel autorisé de Diamontaris Meubles.
        </p>
      </motion.div>
    </div>
  );
}
