// app/components/AuthRouteWrapper.tsx
"use client";
import { usePathname } from "next/navigation";

export default function AuthRouteWrapper({ children }: { children: React.ReactNode }) {
  
  return <>{children}</>;
}
