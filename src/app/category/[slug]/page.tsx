"use client";

import { use } from "react";
import ShopPage from "../../shop/page";
import { CATEGORIES } from "@/lib/categories";

export default function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = use(params);
  const category = CATEGORIES.find(c => c.slug === resolvedParams.slug);
  
  return <ShopPage initialCategory={category?.name || "Tous"} />;
}
