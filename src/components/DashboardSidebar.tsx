"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession } from "@/lib/auth-client";
import {
  LayoutDashboard,
  List,
  Heart,
  User,
  PlusCircle,
  Settings,
  Users,
  ShieldCheck,
} from "lucide-react";

export default function DashboardSidebar() {
  const { data: session } = useSession();
  const pathname = usePathname();

  const role = session?.user?.role || "Customer";

  const customerLinks = [
    {
      name: "My Rentals",
      href: "/dashboard/my-rentals",
      icon: <List className="h-4 w-4" />,
    },
    {
      name: "Favorites",
      href: "/dashboard/favorites",
      icon: <Heart className="h-4 w-4" />,
    },
    {
      name: "Profile",
      href: "/dashboard/profile",
      icon: <User className="h-4 w-4" />,
    },
  ];

  const ownerLinks = [
    {
      name: "Add Equipment",
      href: "/dashboard/add-equipment",
      icon: <PlusCircle className="h-4 w-4" />,
    },
    {
      name: "My Equipment",
      href: "/dashboard/my-equipment",
      icon: <Settings className="h-4 w-4" />,
    },
    {
      name: "My Equipment Rental",
      href: "/dashboard/owner-rentals",
      icon: <List className="h-4 w-4" />,
    },
    {
      name: "Profile",
      href: "/dashboard/profile",
      icon: <User className="h-4 w-4" />,
    },
  ];

  const adminLinks = [
    {
      name: "All Users",
      href: "/dashboard/all-users",
      icon: <Users className="h-4 w-4" />,
    },
    {
      name: "All Equipment",
      href: "/dashboard/all-equipment",
      icon: <ShieldCheck className="h-4 w-4" />,
    },
    {
      name: "All Rentals",
      href: "/dashboard/all-rentals",
      icon: <List className="h-4 w-4" />,
    },
    {
      name: "Profile",
      href: "/dashboard/profile",
      icon: <User className="h-4 w-4" />,
    },
  ];

  const links =
    role === "Admin"
      ? adminLinks
      : role === "Owner"
        ? ownerLinks
        : customerLinks;

  return (
    <aside className="w-64 bg-muted/30 border-r min-h-[80vh] hidden md:block">
      <div className="p-6">
        <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
          <LayoutDashboard className="text-secondary" />
          Dashboard
        </h2>
        <nav className="space-y-2">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`flex items-center gap-3 px-4 py-2 rounded-lg transition-colors ${
                pathname === link.href
                  ? "bg-secondary text-white"
                  : "hover:bg-muted"
              }`}
            >
              {link.icon}
              {link.name}
            </Link>
          ))}
        </nav>
      </div>
    </aside>
  );
}
