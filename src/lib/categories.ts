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
  image: string;
  subtitle?: string;
}

export const CATEGORIES: Category[] = [
  {
    id: "dessertes-chariots",
    name: "Dessertes / Chariots",
    slug: "dessertes-chariots",
    icon: "🛒",
    subtitle: "Mobilité & Style",
    image: "https://images.unsplash.com/photo-1595428774223-ef52624120d2?q=80&w=1000",
    subCategories: [
      { name: "Bar", slug: "bar" },
      { name: "Cuisine", slug: "cuisine" },
      { name: "Service", slug: "service" },
    ],
  },
  {
    id: "tables-basses",
    name: "Tables basses",
    slug: "tables-basses",
    icon: "☕",
    subtitle: "Cœur du Salon",
    image: "https://images.unsplash.com/photo-1533090161767-e6ffed986c88?q=80&w=1000",
    subCategories: [
      { name: "Marbre", slug: "marbre" },
      { name: "Bois", slug: "bois" },
      { name: "Verre", slug: "verre" },
      { name: "Métal", slug: "metal" },
    ],
  },
  {
    id: "consoles",
    name: "Consoles",
    slug: "consoles",
    icon: "🖼️",
    subtitle: "Élégance de Passage",
    image: "https://images.unsplash.com/photo-1534349762230-e092c51f45c5?q=80&w=1000",
    subCategories: [
      { name: "Entrée", slug: "entree" },
      { name: "Salon", slug: "salon" },
      { name: "Design", slug: "design" },
    ],
  },
  {
    id: "bibliotheques",
    name: "Bibliothèques et Séparations",
    slug: "bibliotheques",
    icon: "📚",
    subtitle: "Culture & Design",
    image: "https://images.unsplash.com/photo-1594620302200-9a7622d4a13c?q=80&w=1000",
    subCategories: [
      { name: "Murales", slug: "murales" },
      { name: "Ouvertes", slug: "ouvertes" },
      { name: "Fermées", slug: "fermees" },
      { name: "Bureaux", slug: "bureaux" },
      { name: "Séparations", slug: "separations" },
    ],
  },
  {
    id: "tables-a-manger",
    name: "Tables à manger",
    slug: "tables-a-manger",
    icon: "🍽️",
    subtitle: "Convivialité Royale",
    image: "https://images.unsplash.com/photo-1530018607912-eff2df114f11?q=80&w=1000",
    subCategories: [
      { name: "Rondes", slug: "rondes" },
      { name: "Rectangulaires", slug: "rectangulaires" },
      { name: "Ovales", slug: "ovales" },
      { name: "Extensibles", slug: "extensibles" },
      { name: "Chaises", slug: "chaises" },
    ],
  },
  {
    id: "tables-d-appoint",
    name: "Tables d’appoint",
    slug: "tables-d-appoint",
    icon: "🏺",
    subtitle: "Détails Raffinés",
    image: "https://images.unsplash.com/photo-1533090161767-e6ffed986c88?q=80&w=1000",
    subCategories: [
      { name: "Bouts de canapé", slug: "bouts-de-canape" },
      { name: "Gigognes", slug: "gigognes" },
      { name: "Piédestaux", slug: "piedestaux" },
    ],
  },
  {
    id: "tables-de-chevet",
    name: "Tables de chevet",
    slug: "tables-de-chevet",
    icon: "🌙",
    subtitle: "Nuits Sereines",
    image: "https://images.unsplash.com/photo-1540518614846-7eded433c457?q=80&w=1000",
    subCategories: [
      { name: "Suspendues", slug: "suspendues" },
      { name: "Avec tiroirs", slug: "tiroirs" },
      { name: "Niches", slug: "niches" },
    ],
  },
  {
    id: "buffets",
    name: "Buffets",
    slug: "buffets",
    icon: "🚪",
    subtitle: "Rangement de Prestige",
    image: "https://images.unsplash.com/photo-1595428774223-ef52624120d2?q=80&w=1000",
    subCategories: [
      { name: "Bahuts", slug: "bahuts" },
      { name: "Enfilades", slug: "enfilades" },
      { name: "Commodes", slug: "commodes" },
    ],
  },
  {
    id: "meubles-tv",
    name: "Meubles tv",
    slug: "meubles-tv",
    icon: "📺",
    subtitle: "Divertissement Chic",
    image: "https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?q=80&w=1000",
    subCategories: [
      { name: "Muraux", slug: "muraux" },
      { name: "Bas", slug: "bas" },
      { name: "Bancs TV", slug: "bancs-tv" },
    ],
  },
  {
    id: "miroirs",
    name: "Miroirs",
    slug: "miroirs",
    icon: "🪞",
    subtitle: "Reflets de Luxe",
    image: "https://images.unsplash.com/photo-1513519247388-19345420d4c4?q=80&w=1000",
    subCategories: [
      { name: "Muraux", slug: "muraux" },
      { name: "Sur pied", slug: "sur-pied" },
      { name: "Ronds", slug: "ronds" },
    ],
  },
  {
    id: "salons",
    name: "Salons",
    slug: "salons",
    icon: "🛋️",
    subtitle: "Confort Absolu",
    image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?q=80&w=1200",
    subCategories: [
      { name: "Canapés", slug: "canapes" },
      { name: "Fauteuils", slug: "fauteuils" },
      { name: "Chaises", slug: "chaises" },
      { name: "Poufs", slug: "poufs" },
    ],
  },
  {
    id: "decoration",
    name: "Décoration",
    slug: "decoration",
    icon: "✨",
    subtitle: "Détails d'Émotion",
    image: "https://images.unsplash.com/photo-1513519247388-19345420d4c4?q=80&w=1000",
    subCategories: [
      { name: "Lits", slug: "lits" },
      { name: "Lustres", slug: "lustres" },
      { name: "Lampes", slug: "lampes" },
      { name: "Tapis", slug: "tapis" },
      { name: "Bureaux", slug: "bureaux" },
      { name: "Tableaux", slug: "tableaux" },
    ],
  },
  {
    id: "espace-de-nuit",
    name: "Espace de nuit",
    slug: "espace-de-nuit",
    icon: "🛏️",
    subtitle: "Confort nocturne",
    image: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?q=80&w=1000",
    subCategories: [
      { name: "Têtes de lits", slug: "tetes-de-lits" },
    ],
  },
];
