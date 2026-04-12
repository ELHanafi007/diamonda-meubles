"use client";

import AdminNav from "@/components/admin/AdminNav";
import { usePathname } from "next/navigation";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isLoginPage = pathname === "/admin";

  if (isLoginPage) {
    return <div className="min-h-screen bg-white">{children}</div>;
  }

  return (
    <div className="min-h-screen bg-[#FAFAFA] lg:pl-64 pb-24 lg:pb-0">
      <AdminNav />
      <main className="p-6 md:p-12">
        {children}
      </main>
    </div>
  );
}
