"use client";
import "./globals.css";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Sidebar } from "./components/Sidebar";
import Navbar from "./components/Navbar";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  const noLayoutRoutes: string[] = ["/login", "/signup", "/forgot-password"];
  const isAuthPage = noLayoutRoutes.includes(pathname);

  const [drawerOpen, setDrawerOpen] = useState<boolean>(false);
  return (
    <html lang="en">
      <body className="m-0 p-0">
        {isAuthPage ? (
          children
        ) : (
          <div className="flex h-screen w-full">
            {/* Sidebar */}
            <Sidebar open={drawerOpen} setOpen={setDrawerOpen} />
            <div className="flex-1 flex flex-col">
              <Navbar drawerOpen={drawerOpen} setDrawerOpen={setDrawerOpen} />
              <main className="flex-1 overflow-auto p-2 bg-gray-50">
                {children}
              </main>
            </div>
          </div>
        )}
      </body>
    </html>
  );
}
