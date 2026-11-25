import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ToastContainer from "@/components/Toast";
import TokenProvider from "@/components/TokenProvider";

export const metadata: Metadata = {
  title: "EquipShare - Equipment Rental Platform",
  description: "Rent and share equipment easily.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="flex min-h-screen flex-col antialiased">
        <TokenProvider />
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
        <ToastContainer />
      </body>
    </html>
  );
}
