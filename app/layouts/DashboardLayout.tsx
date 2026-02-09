// app/components/DashboardLayout.tsx
import { ReactNode } from "react";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { Sidebar } from "../components/Sidebar";
import Navbar from "../components/Navbar";

const noLayoutRoutes = ["/login", "/signup", "/forgot-password"];

export default function DashboardLayout({ children }: { children: ReactNode }) {
  const token = cookies().get("token")?.value;
  if (!token) {
    redirect("/login"); 
  }
  return (
    <div className="flex h-screen w-full">
      <Sidebar open={false} setOpen={() => {}} />
      <div className="flex-1 flex flex-col">
        <Navbar drawerOpen={false} setDrawerOpen={() => {}} />
        <main className="flex-1 overflow-auto p-2 bg-gray-50">{children}</main>
      </div>
    </div>
  );
}
