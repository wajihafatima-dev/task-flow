// components/global/Navbar.tsx
"use client";

import { useState, useEffect } from "react";
import { Bell, UserCircle, Menu } from "lucide-react";

interface NavbarProps {
  drawerOpen: boolean;
  setDrawerOpen: (value: boolean) => void;
}

export default function Navbar({ drawerOpen, setDrawerOpen }: NavbarProps) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <header className="flex items-center justify-between bg-white p-4 border-b shadow-md">
      {/* Left side */}
      <div className="flex items-center gap-4">
        {/* Hamburger button for mobile */}
        {isMobile && (
          <button
            onClick={() => setDrawerOpen(!drawerOpen)}
            className="p-2 rounded hover:bg-gray-100 transition"
          >
            <Menu className="w-6 h-6 text-gray-700" />
          </button>
        )}
        <h1 className="font-bold text-xl text-gray-800">Dashboard</h1>
      </div>

      {/* Right side */}
      <div className="flex items-center gap-4">
        {/* Notification bell */}
        <button className="relative p-2 rounded hover:bg-gray-100 transition">
          <Bell className="w-6 h-6 text-gray-700" />
          <span className="absolute top-0 right-0 block w-2 h-2 bg-red-500 rounded-full"></span>
        </button>

        {/* User profile */}
        <button className="flex items-center gap-2 p-2 rounded hover:bg-gray-100 transition">
          <UserCircle className="w-8 h-8 text-gray-700" />
          <span className="hidden sm:block font-medium text-gray-700">Megan Norton</span>
        </button>
      </div>
    </header>
  );
}
