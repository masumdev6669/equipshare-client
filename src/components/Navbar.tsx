"use client";
import Link from "next/link";
import Image from "next/image";
import logo from "@/components/assets/logo.png";
import ThemeToggle from "./ThemeToggle";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";

export default function Navbar() {
  const session = { user: null };

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-20 items-center justify-between px-4 md:px-8">
        <Link href="/" className="flex items-center">
          <Image
            src={logo}
            alt="EquipShare Logo"
            width={220}
            height={100}
            className="object-contain"
            priority
          />
        </Link>

        <div className="hidden md:flex items-center gap-8">
          <Link
            href="/"
            className="text-sm font-bold hover:text-secondary transition-colors"
          >
            Home
          </Link>
          <Link
            href="/equipment"
            className="text-sm font-bold hover:text-secondary transition-colors"
          >
            All Equipment
          </Link>
        </div>

        <div className="flex items-center gap-3">
          <ThemeToggle />

          {session?.user ? (
            <Link href="/dashboard">
              <Button className="bg-primary hover:bg-primary/90 text-white rounded-full">
                Dashboard
              </Button>
            </Link>
          ) : (
            <div className="flex gap-2">
              <Link href="/login">
                <Button
                  variant="outline"
                  className="rounded-full border-primary text-primary hover:bg-primary/10"
                >
                  Login
                </Button>
              </Link>
              <Link href="/register">
                <Button className="bg-secondary hover:bg-orange-600 text-white rounded-full">
                  Register
                </Button>
              </Link>
            </div>
          )}

          <div className="md:hidden">
            <Button variant="ghost" size="icon">
              <Menu className="h-6 w-6" />
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
}
