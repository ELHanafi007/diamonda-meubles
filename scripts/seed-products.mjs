import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.resolve(__dirname, '../.env.local') });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Missing Supabase environment variables');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseAnonKey);

const initialProducts = [
  {
    name: "Table Basse 'Éclat de Marbre'",
    price: "8.500",
    image: "/tabledebasse.jpeg",
    category: "Tables basses",
    sub_category: "Marbre",
    material: "Marbre Blanc de Carrare & Or",
    description: "Une pièce maîtresse alliant la noblesse du marbre blanc à la finesse d'un piétement doré. Parfaite pour un salon contemporain en quête d'élégance.",
    featured: true,
    dimensions: "L120 x P120 x H45 cm",
    weight: "45 kg",
    rating: 5,
    reviews: 12,
    in_stock: true,
    customizable: true,
    warranty: "2 ans",
    delivery_time: "5-7 jours"
  },
  {
    name: "Consoles 'Labyrinthe d'Argent'",
    price: "12.200",
    image: "/Console.jpeg",
    category: "Consoles",
    sub_category: "Entrée",
    material: "Inox Miroir & Verre Trempé",
    description: "Un jeu de reflets et de formes géométriques pour cette console d'entrée qui capture la lumière et agrandit votre espace.",
    featured: true,
    dimensions: "L140 x P40 x H85 cm",
    weight: "28 kg",
    rating: 4.8,
    reviews: 8,
    in_stock: true,
    customizable: false,
    warranty: "2 ans",
    delivery_time: "10-15 jours"
  },
  {
    name: "Desserte 'Midnight Bar'",
    price: "5.900",
    image: "/dessertes.jpeg",
    category: "Dessertes / Chariots",
    sub_category: "Bar",
    material: "Acier Noir Mat & Laiton",
    description: "L'accessoire indispensable pour vos soirées. Cette desserte mobile combine fonctionnalité et design industriel de luxe.",
    featured: false,
    dimensions: "L80 x P45 x H90 cm",
    weight: "18 kg",
    rating: 4.5,
    reviews: 5,
    in_stock: true,
    customizable: true,
    warranty: "1 an",
    delivery_time: "3-5 jours"
  },
  {
    name: "Table à Manger 'Héritage'",
    price: "24.500",
    image: "/table a manger.jpeg",
    category: "Tables à manger",
    sub_category: "Rectangulaires",
    material: "Chêne Massif & Bronze",
    description: "Une table imposante pour des moments conviviaux inoubliables. Le grain du bois est sublimé par des inserts en bronze véritable.",
    featured: true,
    dimensions: "L240 x P110 x H76 cm",
    weight: "85 kg",
    rating: 5,
    reviews: 15,
    in_stock: true,
    customizable: true,
    warranty: "5 ans",
    delivery_time: "3-4 semaines"
  },
  {
    name: "Bibliothèque 'Symphonie'",
    price: "15.800",
    image: "/bibliotheque.jpeg",
    category: "Bibliothèques",
    sub_category: "Murales",
    material: "Noyer & Cuir Noir",
    description: "Plus qu'un rangement, une oeuvre d'art. Cette bibliothèque modulaire s'adapte à vos plus beaux ouvrages et objets de collection.",
    featured: false,
    dimensions: "L200 x P35 x H220 cm",
    weight: "65 kg",
    rating: 4.9,
    reviews: 6,
    in_stock: true,
    customizable: true,
    warranty: "2 ans",
    delivery_time: "2-3 semaines"
  }
];

async function seed() {
  console.log('Starting product seeding...');
  
  for (const product of initialProducts) {
    const { data, error } = await supabase
      .from('products')
      .insert([product])
      .select();
      
    if (error) {
      console.error(`Error inserting ${product.name}:`, error.message);
    } else {
      console.log(`Successfully inserted: ${product.name}`);
    }
  }
  
  console.log('Seeding finished!');
}

seed();
