import Link from "next/link";
import Image from "next/image";
import logo from "@/components/assets/logo.png";
import { MapPin, Phone, Mail, X } from "lucide-react";

export default function Footer() {
  return (
    <footer className="mt-20 border-t bg-muted/30">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-12 sm:grid-cols-2 lg:grid-cols-4">
        <div className="space-y-4">
          <Image
            src={logo}
            alt="EquipShare Logo"
            width={140}
            height={50}
            className="object-contain"
          />
          <p className="text-sm leading-relaxed text-muted-foreground">
            EquipShare connects equipment owners with customers for a seamless
            rental experience.
          </p>
        </div>

        <div>
          <h3 className="mb-4 text-lg font-bold">Quick Links</h3>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>
              <Link href="/" className="hover:text-secondary transition-colors">
                Home
              </Link>
            </li>
            <li>
              <Link
                href="/equipment"
                className="hover:text-secondary transition-colors"
              >
                All Equipment
              </Link>
            </li>
            <li>
              <Link
                href="/dashboard"
                className="hover:text-secondary transition-colors"
              >
                Dashboard
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="mb-4 text-lg font-bold">Contact Us</h3>
          <ul className="space-y-3 text-sm text-muted-foreground">
            <li className="flex items-start gap-3">
              <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-secondary" />
              <span>Dhaka, Bangladesh</span>
            </li>
            <li className="flex items-center gap-3">
              <Phone className="h-5 w-5 shrink-0 text-secondary" />
              <span>+880 1700 000000</span>
            </li>
            <li className="flex items-center gap-3">
              <Mail className="h-5 w-5 shrink-0 text-secondary" />
              <span>hello@equipshare.com</span>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="mb-4 text-lg font-bold">Follow Us</h3>
          <p className="mb-4 text-sm text-muted-foreground">
            Stay updated with our latest equipment and offers.
          </p>
          <div className="flex gap-3">
            <a
              href="https://x.com"
              target="_blank"
              rel="noreferrer"
              aria-label="EquipShare on X"
              className="flex h-10 w-10 items-center justify-center rounded-full border text-muted-foreground transition-colors hover:border-secondary hover:text-secondary"
            >
              <X className="h-4 w-4" />
            </a>
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noreferrer"
              aria-label="EquipShare on Facebook"
              className="flex h-10 w-10 items-center justify-center rounded-full border text-muted-foreground transition-colors hover:border-secondary hover:text-secondary"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-4 w-4"
              >
                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
              </svg>
            </a>
          </div>
        </div>
      </div>
      <div className="border-t py-5 text-center text-sm text-muted-foreground">
        © 2026 EquipShare. All rights reserved.
      </div>
    </footer>
  );
}
