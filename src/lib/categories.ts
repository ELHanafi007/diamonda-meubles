export interface SubCategory {
  name: string;
  slug: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  icon: string;
  subCategories: SubCategory[];
  image?: string;
  subtitle?: string;
}

export const CATEGORIES: Category[] = [
  {
    id: "salon",
    name: "Salon",
    slug: "salon",
    icon: "🛋️",
    subtitle: "Confort & Prestige",
    image: "https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?q=80&w=1000",
    subCategories: [
      { name: "Canapés", slug: "canapes" },
      { name: "Canapés d’angle", slug: "canapes-d-angle" },
      { name: "Fauteuils", slug: "fauteuils" },
      { name: "Tables basses", slug: "tables-basses" },
      { name: "Meubles TV", slug: "meubles-tv" },
      { name: "Tables d’appoint", slug: "tables-d-appoint" },
      { name: "Poufs & Ottomans", slug: "poufs-ottomans" },
    ],
  },
  {
    id: "salle-a-manger",
    name: "Salle à manger",
    slug: "salle-a-manger",
    icon: "🍽️",
    subtitle: "Art de la Table",
    image: "https://images.unsplash.com/photo-1524758631624-e2822e304c36?q=80&w=1000",
    subCategories: [
      { name: "Tables à manger", slug: "tables-a-manger" },
      { name: "Chaises", slug: "chaises" },
      { name: "Tabourets de bar", slug: "tabourets-de-bar" },
      { name: "Buffets / Bahuts", slug: "buffets-bahuts" },
      { name: "Vitrines", slug: "vitrines" },
    ],
  },
  {
    id: "chambre",
    name: "Chambre",
    slug: "chambre",
    icon: "🛏️",
    subtitle: "Sérénité Absolue",
    image: "https://images.unsplash.com/photo-1540518614846-7eded433c457?q=80&w=1000",
    subCategories: [
      { name: "Lits", slug: "lits" },
      { name: "Cadres de lit", slug: "cadres-de-lit" },
      { name: "Matelas", slug: "matelas" },
      { name: "Tables de chevet", slug: "tables-de-chevet" },
      { name: "Armoires", slug: "armoires" },
      { name: "Commodes", slug: "commodes" },
    ],
  },
  {
    id: "eclairage",
    name: "Éclairage",
    slug: "eclairage",
    icon: "💡",
    subtitle: "Lumière & Ambiance",
    image: "https://images.unsplash.com/photo-1542728928-1413eeae4d92?q=80&w=1000",
    subCategories: [
      { name: "Plafonniers", slug: "plafonniers" },
      { name: "Lustres", slug: "lustres" },
      { name: "Suspensions", slug: "suspensions" },
      { name: "Lampes de table", slug: "lampes-de-table" },
      { name: "Lampadaires", slug: "lampadaires" },
      { name: "Appliques murales", slug: "appliques-murales" },
    ],
  },
  {
    id: "bureau",
    name: "Bureau",
    slug: "bureau",
    icon: "🏢",
    subtitle: "Productivité & Élégance",
    image: "https://images.unsplash.com/photo-1524758631624-e2822e304c36?q=80&w=1000",
    subCategories: [
      { name: "Bureaux", slug: "bureaux" },
      { name: "Chaises de bureau", slug: "chaises-de-bureau" },
      { name: "Rangements", slug: "rangements" },
      { name: "Bibliothèques", slug: "bibliotheques" },
    ],
  },
  {
    id: "chaises-assises",
    name: "Chaises & Assises",
    slug: "chaises-assises",
    icon: "🪑",
    subtitle: "Confort Design",
    image: "https://images.unsplash.com/photo-1519947486511-46149fa0a254?q=80&w=1000",
    subCategories: [
      { name: "Chaises", slug: "chaises" },
      { name: "Fauteuils", slug: "fauteuils" },
      { name: "Tabourets", slug: "tabourets" },
      { name: "Bancs", slug: "bancs" },
    ],
  },
  {
    id: "decoration",
    name: "Décoration",
    slug: "decoration",
    icon: "🧸",
    subtitle: "Détails d'Émotion",
    image: "https://images.unsplash.com/photo-1513519247388-19345420d4c4?q=80&w=1000",
    subCategories: [
      { name: "Tableaux / Art mural", slug: "tableaux-art-mural" },
      { name: "Miroirs", slug: "miroirs" },
      { name: "Tapis", slug: "tapis" },
      { name: "Rideaux", slug: "rideaux" },
      { name: "Coussins", slug: "coussins" },
      { name: "Objets décoratifs", slug: "objets-decoratifs" },
      { name: "Vases", slug: "vases" },
    ],
  },
  {
    id: "cuisine",
    name: "Cuisine",
    slug: "cuisine",
    icon: "🍳",
    subtitle: "Épicentre de la Maison",
    image: "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?q=80&w=1000",
    subCategories: [
      { name: "Meubles de cuisine", slug: "meubles-de-cuisine" },
      { name: "Tables de bar", slug: "tables-de-bar" },
      { name: "Accessoires", slug: "accessoires" },
    ],
  },
  {
    id: "salle-de-bain",
    name: "Salle de bain",
    slug: "salle-de-bain",
    icon: "🚿",
    subtitle: "Bien-être & Pureté",
    image: "https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?q=80&w=1000",
    subCategories: [
      { name: "Meubles de salle de bain", slug: "meubles-de-salle-de-bain" },
      { name: "Miroirs", slug: "miroirs" },
      { name: "Rangements", slug: "rangements" },
    ],
  },
  {
    id: "exterieur",
    name: "Extérieur",
    slug: "exterieur",
    icon: "🌿",
    subtitle: "Évasion Nature",
    image: "https://images.unsplash.com/photo-1567080597717-adc3f1d9ebad?q=80&w=1000",
    subCategories: [
      { name: "Mobilier de jardin", slug: "mobilier-de-jardin" },
      { name: "Chaises extérieures", slug: "chaises-exterieures" },
      { name: "Tables extérieures", slug: "tables-exterieures" },
      { name: "Transats", slug: "transats" },
    ],
  },
  {
    id: "rangement",
    name: "Rangement",
    slug: "rangement",
    icon: "🧱",
    subtitle: "Organisation Sophistiquée",
    image: "https://images.unsplash.com/photo-1594620302200-9a7622d4a13c?q=80&w=1000",
    subCategories: [
      { name: "Étagères", slug: "etageres" },
      { name: "Armoires", slug: "armoires" },
      { name: "Boîtes de rangement", slug: "boites-de-rangement" },
    ],
  },
];
