"use client";
import { useEffect, useState } from "react";
import { useSession } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Users,
  Package,
  ShoppingCart,
  DollarSign,
  Clock,
  CheckCircle,
} from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { toast } from "@/components/Toast";

export default function DashboardPage() {
  const { data: session, isPending } = useSession();
  const router = useRouter();
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      if (!session?.user) return;

      const role = (session.user as any).role;
      const baseUrl =
        process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

      try {
        let url = "";
        if (role === "Admin") url = `${baseUrl}/api/analytics/admin/analytics`;
        else if (role === "Owner")
          url = `${baseUrl}/api/analytics/owner/analytics`;
        else {
          router.push("/dashboard/my-rentals");
          return;
        }

        const res = await fetch(url, {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });
        const data = await res.json();
        setStats(data);
      } catch (error) {
        toast.error("Failed to load analytics");
      } finally {
        setLoading(false);
      }
    };

    if (!isPending && session?.user) fetchStats();
  }, [session, isPending, router]);

  if (isPending || loading)
    return <div className="p-20 text-center">Loading dashboard...</div>;
  if (!stats) return <div className="p-20 text-center">No data available</div>;

  const role = (session?.user as any)?.role;

  const chartData = [
    { name: "Users", value: stats.totalUsers || 0 },
    { name: "Equipment", value: stats.totalEquipment || 0 },
    { name: "Bookings", value: stats.totalBookings || 0 },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-primary">
          Welcome back, {session?.user?.name}
        </h1>
        <p className="text-muted-foreground">
          Here is your {role} dashboard overview.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {role === "Admin" && (
          <>
            <StatCard
              title="Total Users"
              value={stats.totalUsers}
              icon={<Users className="h-6 w-6 text-primary" />}
            />
            <StatCard
              title="Total Equipment"
              value={stats.totalEquipment}
              icon={<Package className="h-6 w-6 text-secondary" />}
            />
            <StatCard
              title="Total Bookings"
              value={stats.totalBookings}
              icon={<ShoppingCart className="h-6 w-6 text-blue-500" />}
            />
            <StatCard
              title="Total Revenue"
              value={`৳${stats.totalRevenue}`}
              icon={<DollarSign className="h-6 w-6 text-green-600" />}
            />
          </>
        )}

        {role === "Owner" && (
          <>
            <StatCard
              title="My Equipment"
              value={stats.totalEquipment}
              icon={<Package className="h-6 w-6 text-primary" />}
            />
            <StatCard
              title="Total Earnings"
              value={`৳${stats.totalEarnings}`}
              icon={<DollarSign className="h-6 w-6 text-green-600" />}
            />
            <StatCard
              title="Completed Rentals"
              value={stats.completedRentals}
              icon={<CheckCircle className="h-6 w-6 text-secondary" />}
            />
            <StatCard
              title="Pending Approvals"
              value={stats.pendingEquipment || 0}
              icon={<Clock className="h-6 w-6 text-yellow-500" />}
            />
          </>
        )}
      </div>

      {role === "Admin" && (
        <Card>
          <CardHeader>
            <CardTitle>Platform Activity Overview</CardTitle>
          </CardHeader>
          <CardContent className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="value" fill="#0f172a" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

function StatCard({
  title,
  value,
  icon,
}: {
  title: string;
  value: any;
  icon: React.ReactNode;
}) {
  return (
    <Card className="shadow-sm card-hover">
      <CardContent className="p-6 flex items-center justify-between">
        <div>
          <p className="text-sm text-muted-foreground mb-1">{title}</p>
          <h3 className="text-3xl font-bold">{value}</h3>
        </div>
        <div className="p-3 bg-muted rounded-full">{icon}</div>
      </CardContent>
    </Card>
  );
}
