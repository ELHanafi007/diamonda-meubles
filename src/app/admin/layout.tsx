"use client";

import AdminNav from "@/components/admin/AdminNav";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const isLoginPage = pathname === "/admin";
  const [authorized, setAuthorized] = useState(false);
  const [loading, setLoading] = useState(!isLoginPage);

  useEffect(() => {
    if (!isLoginPage) {
      const token = localStorage.getItem("admin_token");
      if (token !== "true") {
        router.push("/admin");
      } else {
        setAuthorized(true);
      }
      setLoading(false);
    }
  }, [isLoginPage, router]);

  if (isLoginPage) {
    return <div className="min-h-screen bg-white">{children}</div>;
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-[#FAFAFA] flex items-center justify-center">
        <Loader2 className="animate-spin text-gold" size={32} />
      </div>
    );
  }

  if (!authorized) {
    return null; // Prevents flash of content before redirect
  }

  return (
    <div className="min-h-screen bg-[#FAFAFA] lg:pl-64 pb-24 lg:pb-0 font-sans text-primary antialiased">
      <AdminNav />
      <main className="p-6 md:p-12 max-w-7xl mx-auto">
        {children}
      </main>
    </div>
  );
}
