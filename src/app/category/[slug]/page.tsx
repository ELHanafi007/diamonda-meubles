"use client";

import { use } from "react";
import ShopPage from "../../shop/page";

export default function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = use(params);
  // This is a simple way to reuse the shop logic for now
  // In a real app, we would pass the category as a prop
  return <ShopPage />;
}
