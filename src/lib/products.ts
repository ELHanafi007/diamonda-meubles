export interface Product {
  id: string;
  name: string;
  price: string;
  oldPrice?: string;
  discount?: number;
  image: string;
  images?: string[];
  category: string;
  subCategory: string;
  material: string;
  description: string;
  featured?: boolean;
  dimensions?: string;
  weight?: string;
  rating?: number;
  reviews?: number;
  inStock?: boolean;
  customizable?: boolean;
  warranty?: string;
  deliveryTime?: string;
}

export const PRODUCTS: Product[] = [
  // DESSERTES / CHARIOTS
  {
    id: "dc1",
    name: "Chariot Bar Gatsby",
    price: "4.200",
    image: "https://images.unsplash.com/photo-1595428774223-ef52624120d2?q=80&w=1200",
    category: "Dessertes / Chariots",
    subCategory: "Bar",
    material: "Laiton & Verre Trempé",
    description: "L'élégance des années folles pour vos réceptions.",
    inStock: true,
  },

  // TABLES BASSES
  {
    id: "s2",
    name: "Table Basse Marbre Noir",
    price: "3.780",
    oldPrice: "4.200",
    discount: 10,
    image: "https://images.unsplash.com/photo-1533090161767-e6ffed986c88?q=80&w=1200",
    images: [
      "https://images.unsplash.com/photo-1533090161767-e6ffed986c88?q=80&w=1200",
      "https://images.unsplash.com/photo-1611432579400-1218d79217a8?q=80&w=1200",
    ],
    category: "Tables basses",
    subCategory: "Tables basses",
    material: "Marbre Nero Marquina",
    description: "Table basse sculptée dans un bloc de marbre noir veiné d'Italie.",
    featured: true,
    dimensions: "L120 x l60 x H45 cm",
    weight: "62 kg",
    rating: 4.8,
    reviews: 18,
    inStock: true,
    customizable: false,
    warranty: "10 ans",
    deliveryTime: "2-3 semaines"
  },
  {
    id: "s4",
    name: "Table Basse Ovale",
    price: "2.900",
    image: "https://images.unsplash.com/photo-1533090161767-e6ffed986c88?q=80&w=1200",
    category: "Tables basses",
    subCategory: "Tables basses",
    material: "Bois de Frêne",
    description: "Un design épuré.",
    inStock: true,
  },

  // CONSOLES
  {
    id: "con1",
    name: "Console Miroir Art Déco",
    price: "5.800",
    image: "https://images.unsplash.com/photo-1534349762230-e092c51f45c5?q=80&w=1200",
    category: "Consoles",
    subCategory: "Entrée",
    material: "Miroir & Acier Chromé",
    description: "Agrandissez votre espace avec cette console sophistiquée.",
    inStock: true,
  },

  // BIBLIOTHÈQUES
  {
    id: "b2",
    name: "Bibliothèque Murale",
    price: "5.500",
    oldPrice: "6.800",
    discount: 19,
    image: "https://images.unsplash.com/photo-1594620302200-9a7622d4a13c?q=80&w=1200",
    category: "Bibliothèques",
    subCategory: "Bibliothèques",
    material: "Métal & Bois",
    description: "Structure industrielle.",
    inStock: true,
  },
  {
    id: "b3",
    name: "Bibliothèque Chêne",
    price: "8.900",
    image: "https://images.unsplash.com/photo-1594620302200-9a7622d4a13c?q=80&w=1200",
    category: "Bibliothèques",
    subCategory: "Bibliothèques",
    material: "Chêne Massif",
    description: "Qualité artisanale.",
    inStock: true,
  },

  // TABLES À MANGER
  {
    id: "sm1",
    name: "Table Grand Palais",
    price: "28.500",
    image: "https://images.unsplash.com/photo-1530018607912-eff2df114f11?q=80&w=1200",
    category: "Tables à manger",
    subCategory: "Tables à manger",
    material: "Noyer Massif & Bronze",
    description: "Une table magistrale pouvant accueillir jusqu'à 12 convives.",
    featured: true,
    dimensions: "L300 x l110 x H76 cm",
    inStock: true,
    customizable: true,
    warranty: "15 ans",
    deliveryTime: "6-8 semaines"
  },

  // TABLES D’APPOINT
  {
    id: "ta1",
    name: "Table d'appoint Marbre Rose",
    price: "1.950",
    image: "https://images.unsplash.com/photo-1533090161767-e6ffed986c88?q=80&w=1200",
    category: "Tables d’appoint",
    subCategory: "Appoint",
    material: "Marbre Rose & Or",
    description: "Une touche de délicatesse pour votre salon.",
    inStock: true,
  },

  // TABLES DE CHEVET
  {
    id: "tc1",
    name: "Chevet Nuit Étoilée",
    price: "2.400",
    image: "https://images.unsplash.com/photo-1540518614846-7eded433c457?q=80&w=1200",
    category: "Tables de chevet",
    subCategory: "Chambre",
    material: "Noyer & Laiton",
    description: "Compagnon idéal de vos nuits.",
    inStock: true,
  },

  // BUFFETS
  {
    id: "sm3",
    name: "Buffet Minimaliste",
    price: "7.200",
    oldPrice: "8.500",
    discount: 15,
    image: "https://images.unsplash.com/photo-1595428774223-ef52624120d2?q=80&w=1200",
    category: "Buffets",
    subCategory: "Buffets / Bahuts",
    material: "Chêne Clair",
    description: "Buffet au design scandinave.",
    inStock: true,
  },
  {
    id: "sm4",
    name: "Buffet Prestige",
    price: "12.000",
    image: "https://images.unsplash.com/photo-1595428774223-ef52624120d2?q=80&w=1200",
    category: "Buffets",
    subCategory: "Buffets / Bahuts",
    material: "Noyer",
    description: "L'élégance absolue.",
    inStock: true,
  },
  {
    id: "c2",
    name: "Commode Art Déco",
    price: "8.400",
    image: "https://images.unsplash.com/photo-1534349762230-e092c51f45c5?q=80&w=1200",
    category: "Buffets",
    subCategory: "Commodes",
    material: "Bois Laqué & Miroir",
    description: "Rangement sophistiqué inspiré des années 30.",
    inStock: true,
  },

  // MEUBLES TV
  {
    id: "tv1",
    name: "Meuble TV Horizon",
    price: "6.500",
    image: "https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?q=80&w=1200",
    category: "Meubles tv",
    subCategory: "Salon",
    material: "Chêne & Métal Noir",
    description: "Design minimaliste pour votre espace multimédia.",
    inStock: true,
  },

  // MIROIRS
  {
    id: "d1",
    name: "Miroir Soleil",
    price: "2.800",
    image: "https://images.unsplash.com/photo-1513519247388-19345420d4c4?q=80&w=1200",
    category: "Miroirs",
    subCategory: "Miroirs",
    material: "Fer Forgé & Feuille d'Or",
    description: "Une pièce murale forte qui agrandit l'espace.",
    inStock: true,
  },

  // SALONS
  {
    id: "s1",
    name: "Canapé Royal Velours",
    price: "15.540",
    oldPrice: "18.500",
    discount: 16,
    image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?q=80&w=1200",
    category: "Salons",
    subCategory: "Canapés",
    material: "Velours de Soie",
    description: "Un canapé d'exception alliant confort absolu and design intemporel.",
    featured: true,
    dimensions: "L280 x P95 x H85 cm",
    inStock: true,
    customizable: true,
    warranty: "5 ans",
    deliveryTime: "4-6 semaines"
  },
  {
    id: "s3",
    name: "Fauteuil Bergère Moderne",
    price: "6.800",
    image: "https://images.unsplash.com/photo-1598191950976-3b78244bca62?q=80&w=1200",
    category: "Salons",
    subCategory: "Fauteuils",
    material: "Tissu Bouclé & Laiton",
    description: "Une réinterprétation moderne de la bergère classique.",
    inStock: true,
  },
  {
    id: "sm2",
    name: "Chaise Velours Emeraude",
    price: "1.850",
    image: "https://images.unsplash.com/photo-1592078615290-033ee584e267?q=80&w=1200",
    category: "Salons",
    subCategory: "Chaises",
    material: "Velours & Acier Doré",
    description: "Élégance et ergonomie.",
    inStock: true,
  },

  // DÉCORATION
  {
    id: "c1",
    name: "Lit King Size Prestige",
    price: "22.000",
    image: "https://images.unsplash.com/photo-1505693419148-de397e52b827?q=80&w=1200",
    category: "Décoration",
    subCategory: "Lits",
    material: "Lin Belge & Chêne",
    description: "Le summum du luxe pour vos nuits de repos.",
    featured: true,
    inStock: true,
  },
  {
    id: "e1",
    name: "Lustre Cascade de Cristal",
    price: "15.400",
    image: "https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?q=80&w=1200",
    category: "Décoration",
    subCategory: "Lustres",
    material: "Cristal & Chrome",
    description: "Une pièce sculpturale qui crée un jeu de lumière féerique.",
    inStock: true,
  },
  {
    id: "e2",
    name: "Lampe à Poser Albâtre",
    price: "3.200",
    image: "https://images.unsplash.com/photo-1534073828943-f801091bb18c?q=80&w=1200",
    category: "Décoration",
    subCategory: "Lampes de table",
    material: "Albâtre Naturel",
    description: "Lumière douce et diffuse.",
    inStock: true,
  },
  {
    id: "b1",
    name: "Bureau Présidentiel",
    price: "14.500",
    image: "https://images.unsplash.com/photo-1518455027359-f3f816b1a22a?q=80&w=1200",
    category: "Décoration",
    subCategory: "Bureaux",
    material: "Cuir de Selle & Noyer",
    description: "Conçu pour la productivité et le prestige.",
    inStock: true,
  },
  {
    id: "d2",
    name: "Tapis Soie d'Orient",
    price: "12.000",
    image: "https://images.unsplash.com/photo-1575414003591-ece8d0416c7a?q=80&w=1200",
    category: "Décoration",
    subCategory: "Tapis",
    material: "Soie & Laine Ghiordes",
    description: "Tissé à la main pendant 6 mois.",
    inStock: true,
  },
];
