"use client";
import "./globals.css";
import ReactQueryProvider from "./providers/ReactQueryProvider";
import { Toaster } from "./components/ui-components/Toaster";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="en">
      <body className="m-0 p-0">
        <ReactQueryProvider>
          <Toaster />
           { children}
        </ReactQueryProvider>
      </body>
    </html>
  );
}
