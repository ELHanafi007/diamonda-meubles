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
  // SALONS
  {
    id: "s1",
    name: "Canapé Royal Velours",
    price: "15.540",
    oldPrice: "18.500",
    discount: 16,
    image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?q=80&w=1200",
    images: [
      "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?q=80&w=1200",
      "https://images.unsplash.com/photo-1540574163026-643ea20ade25?q=80&w=1200",
      "https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?q=80&w=1200",
    ],
    category: "Salons",
    subCategory: "Canapés",
    material: "Velours de Soie",
    description: "Un canapé d'exception alliant confort absolu et design intemporel. Structure en chêne massif et finitions dorées. Assise profonde avec mousse haute densité pour un confort optimal.",
    featured: true,
    dimensions: "L280 x P95 x H85 cm",
    weight: "85 kg",
    rating: 4.9,
    reviews: 24,
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
    images: [
      "https://images.unsplash.com/photo-1598191950976-3b78244bca62?q=80&w=1200",
      "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?q=80&w=1200",
    ],
    category: "Salons",
    subCategory: "Fauteuils",
    material: "Tissu Bouclé & Laiton",
    description: "Une réinterprétation moderne de la bergère classique. Un cocon de douceur pour votre coin lecture. Pieds en laiton brossé avec patine naturelle.",
    dimensions: "L85 x P90 x H95 cm",
    weight: "18 kg",
    rating: 4.7,
    reviews: 15,
    inStock: true,
    customizable: true,
    warranty: "3 ans",
    deliveryTime: "3-4 semaines"
  },
  {
    id: "sm2",
    name: "Chaise Velours Emeraude",
    price: "1.850",
    image: "https://images.unsplash.com/photo-1592078615290-033ee584e267?q=80&w=1200",
    images: [
      "https://images.unsplash.com/photo-1592078615290-033ee584e267?q=80&w=1200",
      "https://images.unsplash.com/photo-1617606089582-34d37e7e7eb4?q=80&w=1200",
    ],
    category: "Salons",
    subCategory: "Chaises",
    material: "Velours & Acier Doré",
    description: "Élégance et ergonomie. Une assise royale pour sublimer votre salle à manger. Dossier capitonné main avec piqûres sellier.",
    dimensions: "L52 x P58 x H88 cm",
    weight: "7 kg",
    rating: 4.6,
    reviews: 21,
    inStock: true,
    customizable: true,
    warranty: "3 ans",
    deliveryTime: "2-3 semaines"
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
    description: "Table basse sculptée dans un bloc de marbre noir veiné d'Italie. Pièce unique pour un salon sophistiqué. Finition polie main pour un éclat durable.",
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
    images: [
      "https://images.unsplash.com/photo-1534349762230-e092c51f45c5?q=80&w=1200",
      "https://images.unsplash.com/photo-1595428774223-ef52624120d2?q=80&w=1200",
    ],
    category: "Buffets",
    subCategory: "Commodes",
    material: "Bois Laqué & Miroir",
    description: "Rangement sophistiqué inspiré des années 30. Détails en nacre et poignées en cristal de Bohême. 5 tiroirs avec fermetures douces.",
    dimensions: "L140 x l50 x H95 cm",
    weight: "68 kg",
    rating: 4.7,
    reviews: 12,
    inStock: true,
    customizable: false,
    warranty: "7 ans",
    deliveryTime: "4-5 semaines"
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
    images: [
      "https://images.unsplash.com/photo-1530018607912-eff2df114f11?q=80&w=1200",
      "https://images.unsplash.com/photo-1617806118238-164f4339731b?q=80&w=1200",
      "https://images.unsplash.com/photo-1595428774223-ef52624120d2?q=80&w=1200",
    ],
    category: "Tables à manger",
    subCategory: "Tables à manger",
    material: "Noyer Massif & Bronze",
    description: "Une table magistrale pouvant accueillir jusqu'à 12 convives. L'épicentre de vos dîners d'exception. Plateau de 4cm d'épaisseur avec rallonges intégrées.",
    featured: true,
    dimensions: "L300 x l110 x H76 cm",
    weight: "145 kg",
    rating: 5.0,
    reviews: 32,
    inStock: true,
    customizable: true,
    warranty: "15 ans",
    deliveryTime: "6-8 semaines"
  },

  // MIROIRS
  {
    id: "d1",
    name: "Miroir Soleil",
    price: "2.800",
    image: "https://images.unsplash.com/photo-1513519247388-19345420d4c4?q=80&w=1200",
    images: [
      "https://images.unsplash.com/photo-1513519247388-19345420d4c4?q=80&w=1200",
      "https://images.unsplash.com/photo-1618220172389-64c4a8e15555?q=80&w=1200",
    ],
    category: "Miroirs",
    subCategory: "Miroirs",
    material: "Fer Forgé & Feuille d'Or",
    description: "Une pièce murale forte qui agrandit l'espace et apporte une touche solaire. Rayons travaillés individuellement avec finition feuille d'or.",
    dimensions: "Ø90 cm",
    weight: "8 kg",
    rating: 4.6,
    reviews: 11,
    inStock: true,
    customizable: false,
    warranty: "3 ans",
    deliveryTime: "2-3 semaines"
  },

  // DÉCORATION
  {
    id: "c1",
    name: "Lit King Size Prestige",
    price: "22.000",
    image: "https://images.unsplash.com/photo-1505693419148-de397e52b827?q=80&w=1200",
    images: [
      "https://images.unsplash.com/photo-1505693419148-de397e52b827?q=80&w=1200",
      "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?q=80&w=1200",
      "https://images.unsplash.com/photo-1540518614846-7eded433c457?q=80&w=1200",
    ],
    category: "Décoration",
    subCategory: "Lits",
    material: "Lin Belge & Chêne",
    description: "Le summum du luxe pour vos nuits de repos. Tête de lit capitonnée à la main avec tissu en lin belge naturel. Sommier à lattes inclus.",
    featured: true,
    dimensions: "L210 x l200 x H140 cm",
    weight: "120 kg",
    rating: 4.9,
    reviews: 28,
    inStock: true,
    customizable: true,
    warranty: "10 ans",
    deliveryTime: "5-7 semaines"
  },
  {
    id: "e1",
    name: "Lustre Cascade de Cristal",
    price: "15.400",
    image: "https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?q=80&w=1200",
    images: [
      "https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?q=80&w=1200",
      "https://images.unsplash.com/photo-1543198126-a8ad8e47fb54?q=80&w=1200",
    ],
    category: "Décoration",
    subCategory: "Lustres",
    material: "Cristal & Chrome",
    description: "Une pièce sculpturale qui crée un jeu de lumière féerique dans votre intérieur. 12 branches avec pampilles en cristal taillé main.",
    featured: true,
    dimensions: "Ø80 x H120 cm",
    weight: "25 kg",
    rating: 4.8,
    reviews: 16,
    inStock: true,
    customizable: false,
    warranty: "5 ans",
    deliveryTime: "3-4 semaines"
  },
  {
    id: "e2",
    name: "Lampe à Poser Albâtre",
    price: "3.200",
    image: "https://images.unsplash.com/photo-1534073828943-f801091bb18c?q=80&w=1200",
    images: [
      "https://images.unsplash.com/photo-1534073828943-f801091bb18c?q=80&w=1200",
      "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?q=80&w=1200",
    ],
    category: "Décoration",
    subCategory: "Lampes de table",
    material: "Albâtre Naturel",
    description: "Lumière douce et diffuse à travers la pierre translucide. Base en laiton brossé. Chaque pièce est unique par les veines naturelles de l'albâtre.",
    dimensions: "Ø25 x H45 cm",
    weight: "4.5 kg",
    rating: 4.5,
    reviews: 9,
    inStock: true,
    customizable: false,
    warranty: "2 ans",
    deliveryTime: "1-2 semaines"
  },
  {
    id: "b1",
    name: "Bureau Présidentiel",
    price: "14.500",
    image: "https://images.unsplash.com/photo-1518455027359-f3f816b1a22a?q=80&w=1200",
    images: [
      "https://images.unsplash.com/photo-1518455027359-f3f816b1a22a?q=80&w=1200",
      "https://images.unsplash.com/photo-1518455027359-f3f816b1a22a?q=80&w=1200",
    ],
    category: "Décoration",
    subCategory: "Bureaux",
    material: "Cuir de Selle & Noyer",
    description: "Conçu pour la productivité et le prestige. Sous-main intégré en cuir pleine fleur. Passages de câbles discrets et tiroirs fermant à clé.",
    dimensions: "L180 x l85 x H76 cm",
    weight: "95 kg",
    rating: 4.8,
    reviews: 14,
    inStock: true,
    customizable: true,
    warranty: "10 ans",
    deliveryTime: "5-6 semaines"
  },
  {
    id: "d2",
    name: "Tapis Soie d'Orient",
    price: "12.000",
    image: "https://images.unsplash.com/photo-1575414003591-ece8d0416c7a?q=80&w=1200",
    images: [
      "https://images.unsplash.com/photo-1575414003591-ece8d0416c7a?q=80&w=1200",
      "https://images.unsplash.com/photo-1600166898405-da9535202683?q=80&w=1200",
    ],
    category: "Décoration",
    subCategory: "Tapis",
    material: "Soie & Laine Ghiordes",
    description: "Tissé à la main pendant 6 mois. Motifs traditionnels revisités dans des tons neutres. 300.000 nœuds/m² pour une densité exceptionnelle.",
    dimensions: "L300 x l200 cm",
    weight: "18 kg",
    rating: 4.9,
    reviews: 8,
    inStock: true,
    customizable: true,
    warranty: "15 ans",
    deliveryTime: "8-10 semaines"
  },
];
