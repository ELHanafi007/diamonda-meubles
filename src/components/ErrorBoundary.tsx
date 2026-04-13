"use client";

import { Component, ErrorInfo, ReactNode } from "react";
import { AlertTriangle, Home, RefreshCw } from "lucide-react";
import Link from "next/link";

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught error:", error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="min-h-screen bg-white flex items-center justify-center p-6">
          <div className="max-w-md text-center space-y-8">
            <div className="w-20 h-20 mx-auto bg-red-50 rounded-full flex items-center justify-center">
              <AlertTriangle size={40} className="text-red-500" strokeWidth={1.5} />
            </div>
            
            <div className="space-y-4">
              <h1 className="text-3xl font-serif text-primary">Une erreur est survenue</h1>
              <p className="text-muted-foreground font-light">
                Nous nous excusons pour ce désagrément. Notre équipe technique travaille à résoudre ce problème.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/"
                className="inline-flex items-center justify-center gap-3 bg-black text-white px-8 py-4 uppercase tracking-[0.25em] text-[10px] font-bold hover:bg-gold transition-all duration-500"
              >
                <Home size={16} /> Retour à l'accueil
              </Link>
              <button
                onClick={() => this.setState({ hasError: false, error: null })}
                className="inline-flex items-center justify-center gap-3 border border-beige px-8 py-4 uppercase tracking-[0.25em] text-[10px] font-bold hover:border-gold hover:text-gold transition-all duration-500"
              >
                <RefreshCw size={16} /> Réessayer
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
