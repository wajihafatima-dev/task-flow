"use client";
import React, { useState } from "react";
import { Sidebar } from "@/app/components/Sidebar";
import Navbar from "@/app/components/Navbar";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <div className="flex h-screen w-full">
      <Sidebar open={drawerOpen} setOpen={setDrawerOpen} />
      <div className="flex-1 flex flex-col">
        <Navbar drawerOpen={drawerOpen} setDrawerOpen={setDrawerOpen} />
        <main className="flex-1 overflow-auto p-2 bg-gray-50">
          {children}
        </main>
      </div>
    </div>
  );
}