"use client";

import { WishlistProvider } from "@/lib/WishlistContext";
import { ToastProvider } from "@/components/ToastProvider";
import ErrorBoundary from "@/components/ErrorBoundary";

export default function ClientProviders({ children }: { children: React.ReactNode }) {
  return (
    <ErrorBoundary>
      <ToastProvider>
        <WishlistProvider>
          {children}
        </WishlistProvider>
      </ToastProvider>
    </ErrorBoundary>
  );
}
