"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "@/lib/auth-client";

export default function DashboardRedirectPage() {
  const router = useRouter();
  const { data: session, isPending } = useSession();

  useEffect(() => {
    if (!isPending && session?.user) {
      const user = session.user as unknown as { role: string };
      const role = user.role;

      if (role === "Admin") router.push("/dashboard/all-equipment");
      else if (role === "Owner") router.push("/dashboard/my-equipment");
      else router.push("/dashboard/my-rentals");
    }
  }, [session, isPending, router]);

  return (
    <div className="p-20 text-center text-lg">
      Redirecting to your dashboard...
    </div>
  );
}
