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
    material: "Velours",
    description: "Un canapé d'exception alliant confort absolu et design intemporel.",
    featured: true
  },
  {
    id: "s2",
    name: "Table Basse Marbre Noir",
    price: "4.200",
    image: "https://images.unsplash.com/photo-1533090161767-e6ffed986c88?q=80&w=800",
    category: "Salon",
    subCategory: "Tables basses",
    material: "Marbre",
    description: "Table basse sculptée dans un bloc de marbre noir veiné d'Italie.",
    featured: true
  },
  {
    id: "s3",
    name: "Meuble TV Chêne & Or",
    price: "9.800",
    image: "https://images.unsplash.com/photo-1595428774223-ef52624120d2?q=80&w=800",
    category: "Salon",
    subCategory: "Meubles TV",
    material: "Chêne Massif",
    description: "Élégance minimaliste avec des finitions en laiton doré.",
  },

  // CHAMBRE
  {
    id: "c1",
    name: "Lit King Size Prestige",
    price: "22.000",
    image: "https://images.unsplash.com/photo-1505693419148-de397e52b827?q=80&w=800",
    category: "Chambre",
    subCategory: "Lits",
    material: "Lin & Chêne",
    description: "Le summum du luxe pour vos nuits de repos.",
    featured: true
  },
  {
    id: "c2",
    name: "Table de Chevet Minimaliste",
    price: "2.100",
    image: "https://images.unsplash.com/photo-1532323544230-7191fd51bc1b?q=80&w=800",
    category: "Chambre",
    subCategory: "Tables de chevet",
    material: "Noyer",
    description: "Design épuré pour une atmosphère sereine.",
  },

  // SALLE À MANGER
  {
    id: "sm1",
    name: "Table à Manger Grand Palais",
    price: "28.500",
    image: "https://images.unsplash.com/photo-1530018607912-eff2df114f11?q=80&w=800",
    category: "Salle à manger",
    subCategory: "Tables à manger",
    material: "Noyer & Acier",
    description: "Une pièce imposante pour des dîners mémorables.",
  },
  {
    id: "sm2",
    name: "Chaise Velours Emeraude",
    price: "1.850",
    image: "https://images.unsplash.com/photo-1592078615290-033ee584e267?q=80&w=800",
    category: "Salle à manger",
    subCategory: "Chaises",
    material: "Velours",
    description: "Assise ergonomique habillée d'un velours luxueux.",
  },

  // DÉCORATION
  {
    id: "d1",
    name: "Fauteuil Pivotant Design",
    price: "3.800",
    image: "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?q=80&w=800",
    category: "Décoration",
    subCategory: "Fauteuils",
    material: "Cuir",
    description: "L'équilibre parfait entre esthétique et ergonomie.",
    featured: true
  },
  {
    id: "d2",
    name: "Vase Sculptural Givre",
    price: "1.200",
    image: "https://images.unsplash.com/photo-1581783898377-1c85bf937427?q=80&w=800",
    category: "Décoration",
    subCategory: "Vases",
    material: "Céramique",
    description: "Pièce unique façonnée à la main.",
  },

  // ÉCLAIRAGE
  {
    id: "e1",
    name: "Lustre Cascade Dorée",
    price: "15.400",
    image: "https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?q=80&w=800",
    category: "Éclairage",
    subCategory: "Lustres",
    material: "Cristal & Laiton",
    description: "Un jeu de lumière spectaculaire pour votre intérieur.",
  },
];
