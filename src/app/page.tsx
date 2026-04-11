import Hero from "@/components/Hero";
import Categories from "@/components/Categories";
import FeaturedProducts from "@/components/FeaturedProducts";

export default function Home() {
  return (
    <>
      <Hero />
      <Categories />
      <section className="py-24 bg-beige/30 px-6">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="relative aspect-square overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?q=80&w=1000" 
                alt="Luxury Interior Story" 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="space-y-8">
              <span className="text-gold uppercase tracking-[0.3em] text-xs">Notre Philosophie</span>
              <h2 className="text-4xl md:text-6xl font-serif leading-tight">L'Art de créer des espaces qui <span className="italic">racontent votre histoire</span>.</h2>
              <p className="text-muted-foreground leading-relaxed text-lg">
                Chez Diamond Meubles, nous ne vendons pas seulement du mobilier. Nous concevons des expériences sensorielles où chaque courbe, chaque texture et chaque matériau est choisi pour sublimer votre quotidien. 
              </p>
              <div className="pt-4">
                <button className="bg-black text-white px-10 py-5 uppercase tracking-widest text-xs hover:bg-gold transition-colors duration-500">
                  Découvrir Notre Histoire
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
      <FeaturedProducts />
      
      {/* Testimonials / Mood section */}
      <section className="py-32 bg-white px-6">
        <div className="container mx-auto text-center max-w-4xl">
          <span className="text-gold text-4xl mb-8 block">“</span>
          <p className="text-2xl md:text-4xl font-serif italic leading-snug mb-10">
            « Le luxe n'est pas une question de prix, mais de sentiment. Diamond Meubles a transformé notre maison en un sanctuaire d'élégance. »
          </p>
          <span className="uppercase tracking-[0.4em] text-[10px] text-muted-foreground">Mme. Benjelloun, Casablanca</span>
        </div>
      </section>

      {/* Footer is usually in layout, but I'll add a call to action here */}
      <section className="py-24 bg-black text-white px-6">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl md:text-6xl font-serif mb-12">Prêt à sublimer votre intérieur ?</h2>
          <button className="border border-white/30 text-white px-12 py-6 uppercase tracking-[0.3em] text-xs hover:bg-white hover:text-black transition-all duration-700">
            Prendre rendez-vous au showroom
          </button>
        </div>
      </section>
    </>
  );
}
