"use client";

import { WishlistProvider } from "@/lib/WishlistContext";

export default function ClientProviders({ children }: { children: React.ReactNode }) {
  return (
    <WishlistProvider>
      {children}
    </WishlistProvider>
  );
}
