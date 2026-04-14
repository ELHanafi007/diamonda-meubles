-- Create the products table
CREATE TABLE products (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  price TEXT NOT NULL,
  image TEXT NOT NULL,
  images TEXT[] DEFAULT '{}',
  category TEXT NOT NULL,
  sub_category TEXT NOT NULL,
  material TEXT,
  description TEXT,
  featured BOOLEAN DEFAULT false,
  dimensions TEXT,
  weight TEXT,
  rating NUMERIC DEFAULT 0,
  reviews INTEGER DEFAULT 0,
  in_stock BOOLEAN DEFAULT true,
  customizable BOOLEAN DEFAULT false,
  warranty TEXT,
  delivery_time TEXT,
  status TEXT DEFAULT 'active',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW())
);

-- Enable RLS
ALTER TABLE products ENABLE ROW LEVEL SECURITY;

-- Allow public read access
CREATE POLICY "Allow public read access" ON products
  FOR SELECT USING (true);

-- Allow authenticated admin access (assuming you use Supabase Auth)
CREATE POLICY "Allow authenticated admin access" ON products
  FOR ALL TO authenticated USING (true);

-- Create a storage bucket for product images
INSERT INTO storage.buckets (id, name, public)
VALUES ('product_images', 'product_images', true);

-- Allow public access to product images
CREATE POLICY "Allow public access to product images" ON storage.objects
  FOR SELECT USING (bucket_id = 'product_images');

-- Allow authenticated admin to upload images
CREATE POLICY "Allow authenticated admin to upload images" ON storage.objects
  FOR INSERT WITH CHECK (bucket_id = 'product_images' AND auth.role() = 'authenticated');
