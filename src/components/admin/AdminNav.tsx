"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, ShoppingBag, MessageSquare, Settings, LogOut } from "lucide-react";
import { cn } from "@/lib/utils";

const adminLinks = [
  { name: "Stats", href: "/admin/dashboard", icon: LayoutDashboard },
  { name: "Produits", href: "/admin/products", icon: ShoppingBag },
  { name: "Demandes", href: "/admin/orders", icon: MessageSquare },
  { name: "Réglages", href: "/admin/settings", icon: Settings },
];

export default function AdminNav() {
  const pathname = usePathname();

  return (
    <>
      {/* Desktop Sidebar (Hidden on mobile) */}
      <aside className="hidden lg:flex flex-col w-64 bg-primary h-screen fixed left-0 top-0 p-8 border-r border-gold/20">
        <div className="mb-12">
          <span className="text-xl font-serif text-white tracking-tighter uppercase">
            DIAMONTARIS <span className="text-gold italic block text-xs">Admin Panel</span>
          </span>
        </div>
        
        <nav className="flex-1 space-y-2">
          {adminLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className={cn(
                "flex items-center gap-4 px-4 py-3 rounded-sm transition-all duration-300",
                pathname === link.href ? "bg-gold text-white" : "text-white/60 hover:text-white hover:bg-white/5"
              )}
            >
              <link.icon size={18} />
              <span className="text-[10px] uppercase tracking-widest font-bold">{link.name}</span>
            </Link>
          ))}
        </nav>

        <button className="flex items-center gap-4 px-4 py-3 text-white/40 hover:text-red-400 transition-colors mt-auto border-t border-white/10 pt-8">
          <LogOut size={18} />
          <span className="text-[10px] uppercase tracking-widest font-bold">Déconnexion</span>
        </button>
      </aside>

      {/* Mobile Bottom Nav (Visible only on mobile) */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 bg-primary border-t border-gold/30 z-[100] px-6 py-3 flex justify-between items-center safe-area-bottom">
        {adminLinks.map((link) => (
          <Link
            key={link.name}
            href={link.href}
            className={cn(
              "flex flex-col items-center gap-1 transition-all duration-300",
              pathname === link.href ? "text-gold" : "text-white/40"
            )}
          >
            <link.icon size={20} />
            <span className="text-[8px] uppercase tracking-tighter font-bold">{link.name}</span>
          </Link>
        ))}
      </nav>
    </>
  );
}
