import Link from "next/link";
import { Mail, Phone, MapPin, MessageCircle, ExternalLink } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-white border-t border-beige pt-24 pb-12 px-6">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-20">
          {/* Brand Info */}
          <div className="space-y-6">
            <Link href="/" className="text-2xl font-serif tracking-tighter text-primary">
              DIAMOND <span className="text-gold italic font-light">MEUBLES</span>
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed">
              L'excellence du mobilier de luxe au Maroc. Créateur d'ambiances uniques et de pièces d'exception pour sublimer votre intérieur.
            </p>
            <div className="flex space-x-5">
              <Link href="#" className="text-primary hover:text-gold transition-colors"><MessageCircle size={20} /></Link>
              <Link href="#" className="text-primary hover:text-gold transition-colors"><ExternalLink size={20} /></Link>
              <Link href="#" className="text-primary hover:text-gold transition-colors"><Mail size={20} /></Link>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xs uppercase tracking-[0.2em] font-bold mb-8">Navigation</h4>
            <ul className="space-y-4">
              <li><Link href="/" className="text-sm text-muted-foreground hover:text-gold transition-colors">Accueil</Link></li>
              <li><Link href="/shop" className="text-sm text-muted-foreground hover:text-gold transition-colors">Collections</Link></li>
              <li><Link href="/about" className="text-sm text-muted-foreground hover:text-gold transition-colors">Notre Histoire</Link></li>
              <li><Link href="/contact" className="text-sm text-muted-foreground hover:text-gold transition-colors">Showroom</Link></li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h4 className="text-xs uppercase tracking-[0.2em] font-bold mb-8">Univers</h4>
            <ul className="space-y-4">
              <li><Link href="/category/salons" className="text-sm text-muted-foreground hover:text-gold transition-colors">Salons</Link></li>
              <li><Link href="/category/chambres" className="text-sm text-muted-foreground hover:text-gold transition-colors">Chambres</Link></li>
              <li><Link href="/category/salles-a-manger" className="text-sm text-muted-foreground hover:text-gold transition-colors">Salles à Manger</Link></li>
              <li><Link href="/category/decoration" className="text-sm text-muted-foreground hover:text-gold transition-colors">Décoration</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-xs uppercase tracking-[0.2em] font-bold mb-8">Contact</h4>
            <ul className="space-y-6">
              <li className="flex items-start gap-4">
                <MapPin size={18} className="text-gold shrink-0 mt-1" />
                <span className="text-sm text-muted-foreground leading-relaxed">
                  Boulevard d'Anfa, <br />Casablanca, Maroc
                </span>
              </li>
              <li className="flex items-center gap-4">
                <Phone size={18} className="text-gold shrink-0" />
                <span className="text-sm text-muted-foreground">+212 600 000 000</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-12 border-t border-beige flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-[10px] uppercase tracking-widest text-muted-foreground">
            © {new Date().getFullYear()} DIAMOND MEUBLES. TOUS DROITS RÉSERVÉS.
          </p>
          <div className="flex space-x-8">
            <Link href="#" className="text-[10px] uppercase tracking-widest text-muted-foreground hover:text-gold">Mentions Légales</Link>
            <Link href="#" className="text-[10px] uppercase tracking-widest text-muted-foreground hover:text-gold">Politique de Confidentialité</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
