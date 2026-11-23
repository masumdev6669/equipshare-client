"use client";
import { useSession } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import DashboardSidebar from "@/components/DashboardSidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data: session, isPending } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (!isPending && !session?.user) {
      router.push("/login");
    }
  }, [session, isPending, router]);

  if (isPending) return <div className="p-20 text-center">Loading...</div>;
  if (!session?.user) return null;

  return (
    <div className="flex min-h-[80vh]">
      <DashboardSidebar />
      <main className="flex-1 p-6 md:p-10 bg-background">{children}</main>
    </div>
  );
}
