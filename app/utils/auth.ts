// app/lib/auth.ts
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

/**
 * Server-only auth guard
 */
export function requireAuth() {
  const cookieStore = cookies(); // only works in server component
  const token = cookieStore.get("token")?.value;

  if (!token) {
    redirect("/login"); // server-side redirect
  }

  return token;
}
