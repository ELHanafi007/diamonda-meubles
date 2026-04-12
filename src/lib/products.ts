export interface Product {
  id: string;
  name: string;
  price: string;
  image: string;
  category: string;
  subCategory: string;
  material: string;
  description: string;
  featured?: boolean;
}

export const PRODUCTS: Product[] = [
  // SALON
  {
    id: "s1",
    name: "Canapé Royal Velours",
    price: "18.500",
    image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?q=80&w=800",
    category: "Salon",
    subCategory: "Canapés",
    material: "Velours de Soie",
    description: "Un canapé d'exception alliant confort absolu et design intemporel. Structure en chêne massif et finitions dorées.",
    featured: true
  },
  {
    id: "s2",
    name: "Table Basse Marbre Noir",
    price: "4.200",
    image: "https://images.unsplash.com/photo-1533090161767-e6ffed986c88?q=80&w=800",
    category: "Salon",
    subCategory: "Tables basses",
    material: "Marbre Nero Marquina",
    description: "Table basse sculptée dans un bloc de marbre noir veiné d'Italie. Pièce unique pour un salon sophistiqué.",
    featured: true
  },
  {
    id: "s3",
    name: "Fauteuil Bergère Moderne",
    price: "6.800",
    image: "https://images.unsplash.com/photo-1598191950976-3b78244bca62?q=80&w=800",
    category: "Salon",
    subCategory: "Fauteuils",
    material: "Tissu Bouclé & Laiton",
    description: "Une réinterprétation moderne de la bergère classique. Un cocon de douceur pour votre coin lecture.",
  },

  // SALLE À MANGER
  {
    id: "sm1",
    name: "Table Grand Palais",
    price: "28.500",
    image: "https://images.unsplash.com/photo-1530018607912-eff2df114f11?q=80&w=800",
    category: "Salle à manger",
    subCategory: "Tables à manger",
    material: "Noyer Massif & Bronze",
    description: "Une table magistrale pouvant accueillir jusqu'à 12 convives. L'épicentre de vos dîners d'exception.",
    featured: true
  },
  {
    id: "sm2",
    name: "Chaise Velours Emeraude",
    price: "1.850",
    image: "https://images.unsplash.com/photo-1592078615290-033ee584e267?q=80&w=800",
    category: "Salle à manger",
    subCategory: "Chaises",
    material: "Velours & Acier Doré",
    description: "Élégance et ergonomie. Une assise royale pour sublimer votre salle à manger.",
  },

  // CHAMBRE
  {
    id: "c1",
    name: "Lit King Size Prestige",
    price: "22.000",
    image: "https://images.unsplash.com/photo-1505693419148-de397e52b827?q=80&w=800",
    category: "Chambre",
    subCategory: "Lits",
    material: "Lin Belge & Chêne",
    description: "Le summum du luxe pour vos nuits de repos. Tête de lit capitonnée à la main.",
    featured: true
  },
  {
    id: "c2",
    name: "Commode Art Déco",
    price: "8.400",
    image: "https://images.unsplash.com/photo-1534349762230-e092c51f45c5?q=80&w=800",
    category: "Chambre",
    subCategory: "Commodes",
    material: "Bois Laqué & Miroir",
    description: "Rangement sophistiqué inspiré des années 30. Détails en nacre et poignées en cristal.",
  },

  // ÉCLAIRAGE
  {
    id: "e1",
    name: "Lustre Cascade de Cristal",
    price: "15.400",
    image: "https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?q=80&w=800",
    category: "Éclairage",
    subCategory: "Lustres",
    material: "Cristal & Chrome",
    description: "Une pièce sculpturale qui crée un jeu de lumière féerique dans votre intérieur.",
    featured: true
  },
  {
    id: "e2",
    name: "Lampe à Poser Albâtre",
    price: "3.200",
    image: "https://images.unsplash.com/photo-1534073828943-f801091bb18c?q=80&w=800",
    category: "Éclairage",
    subCategory: "Lampes de table",
    material: "Albâtre Naturel",
    description: "Lumière douce et diffuse à travers la pierre translucide. Base en laiton brossé.",
  },

  // BUREAU
  {
    id: "b1",
    name: "Bureau Présidentiel",
    price: "14.500",
    image: "https://images.unsplash.com/photo-1518455027359-f3f816b1a22a?q=80&w=800",
    category: "Bureau",
    subCategory: "Bureaux",
    material: "Cuir de Selle & Noyer",
    description: "Conçu pour la productivité et le prestige. Sous-main intégré en cuir pleine fleur.",
  },

  // DÉCORATION
  {
    id: "d1",
    name: "Miroir Soleil Soleil",
    price: "2.800",
    image: "https://images.unsplash.com/photo-1513519247388-19345420d4c4?q=80&w=800",
    category: "Décoration",
    subCategory: "Miroirs",
    material: "Fer Forgé & Feuille d'Or",
    description: "Une pièce murale forte qui agrandit l'espace et apporte une touche solaire.",
  },
  {
    id: "d2",
    name: "Tapis Soie d'Orient",
    price: "12.000",
    image: "https://images.unsplash.com/photo-1575414003591-ece8d0416c7a?q=80&w=800",
    category: "Décoration",
    subCategory: "Tapis",
    material: "Soie & Laine Ghiordes",
    description: "Tissé à la main pendant 6 mois. Motifs traditionnels revisités dans des tons neutres.",
  },
];
