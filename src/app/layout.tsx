import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import AuthProvider from "@/context/AuthProvider";
import { Toaster } from "@/components/ui/toaster"
import Navbar from "@/components/Navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Client Echo",
  description: "Get Anonymous Message",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <AuthProvider>
        
      <body className={inter.className}>
        <Navbar/>
        {children}
        <Toaster/>
      </body>
      </AuthProvider>
    </html>
  );
}
