"use client";

import { use } from "react";
import ShopPage from "../../shop/page";
import { CATEGORIES } from "@/lib/categories";

export default function CategoryPage({ 
  params,
  searchParams 
}: { 
  params: Promise<{ slug: string }>,
  searchParams: Promise<{ sub?: string }>
}) {
  const resolvedParams = use(params);
  const resolvedSearchParams = use(searchParams);
  const category = CATEGORIES.find(c => c.slug === resolvedParams.slug);
  
  let initialSubCategory = "Tous";
  if (category && resolvedSearchParams.sub) {
    const sub = category.subCategories.find(s => s.slug === resolvedSearchParams.sub);
    if (sub) {
      initialSubCategory = sub.name;
    }
  }
  
  return <ShopPage initialCategory={category?.name || "Tous"} initialSubCategory={initialSubCategory} />;
}
