"use client";

import { createContext, useContext, useState, useCallback, ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle, XCircle, X, Info } from "lucide-react";

export type ToastType = "success" | "error" | "info";

interface Toast {
  id: string;
  message: string;
  type: ToastType;
}

interface ToastContextType {
  toast: (message: string, type?: ToastType) => void;
  success: (message: string) => void;
  error: (message: string) => void;
  info: (message: string) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const toast = useCallback((message: string, type: ToastType = "info") => {
    const id = Math.random().toString(36).substr(2, 9);
    setToasts((prev) => [...prev, { id, message, type }]);
    
    // Auto-remove after 4 seconds
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4000);
  }, []);

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const success = useCallback((message: string) => toast(message, "success"), [toast]);
  const error = useCallback((message: string) => toast(message, "error"), [toast]);
  const info = useCallback((message: string) => toast(message, "info"), [toast]);

  return (
    <ToastContext.Provider value={{ toast, success, error, info }}>
      {children}
      <div className="fixed bottom-6 right-6 z-[300] space-y-3 max-w-md" aria-live="polite">
        <AnimatePresence>
          {toasts.map((toast) => (
            <motion.div
              key={toast.id}
              initial={{ opacity: 0, x: 100, scale: 0.95 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 100, scale: 0.95 }}
              transition={{ duration: 0.3 }}
              className="bg-white border border-beige shadow-2xl p-5 flex items-start gap-4 relative overflow-hidden"
              role="alert"
            >
              {/* Color indicator */}
              <div
                className={`absolute left-0 top-0 bottom-0 w-1 ${
                  toast.type === "success"
                    ? "bg-green-500"
                    : toast.type === "error"
                    ? "bg-red-500"
                    : "bg-gold"
                }`}
              />

              {/* Icon */}
              <div className="shrink-0 mt-0.5">
                {toast.type === "success" && (
                  <CheckCircle size={20} className="text-green-600" strokeWidth={1.5} />
                )}
                {toast.type === "error" && (
                  <XCircle size={20} className="text-red-600" strokeWidth={1.5} />
                )}
                {toast.type === "info" && (
                  <Info size={20} className="text-gold" strokeWidth={1.5} />
                )}
              </div>

              {/* Message */}
              <p className="text-sm font-light flex-1 pr-6">{toast.message}</p>

              {/* Close button */}
              <button
                onClick={() => removeToast(toast.id)}
                className="shrink-0 text-muted-foreground hover:text-primary transition-colors"
                aria-label="Fermer la notification"
              >
                <X size={16} strokeWidth={1.5} />
              </button>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);
  if (context === undefined) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
}
