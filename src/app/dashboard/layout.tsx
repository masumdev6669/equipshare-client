import DashboardSidebar from "@/components/DashboardSidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-[80vh]">
      <DashboardSidebar />
      <main className="flex-1 p-6 md:p-10 bg-background">{children}</main>
    </div>
  );
}
