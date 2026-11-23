"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { toast } from "@/components/Toast";
import { Trash2, Eye, Edit } from "lucide-react";

export default function MyEquipmentPage() {
  const [equipment, setEquipment] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const loadEquipment = async () => {
    try {
      const baseUrl =
        process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";
      const res = await fetch(`${baseUrl}/api/equipment/owner/mine`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      const data = await res.json();
      setEquipment(data);
    } catch (error: any) {
      toast.error(error.message || "Failed to load equipment");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadEquipment();
  }, []);

  const handleDelete = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this equipment?"))
      return;
    try {
      const baseUrl =
        process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";
      await fetch(`${baseUrl}/api/equipment/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      toast.success("Equipment deleted");
      loadEquipment();
    } catch (error) {
      toast.error("Failed to delete equipment");
    }
  };

  if (loading)
    return <div className="p-20 text-center">Loading equipment...</div>;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-primary">My Equipment</h1>
        <Link href="/dashboard/add-equipment">
          <Button className="bg-primary hover:bg-primary/90 rounded-full">
            Add New
          </Button>
        </Link>
      </div>

      {equipment.length === 0 ? (
        <div className="text-center py-20 border-2 border-dashed rounded-2xl">
          <p className="text-lg font-semibold text-muted-foreground">
            No equipment listed yet
          </p>
          <p className="text-sm text-muted-foreground/70 mb-4">
            Add your first equipment to start renting.
          </p>
          <Link href="/dashboard/add-equipment">
            <Button className="bg-secondary rounded-full">Add Equipment</Button>
          </Link>
        </div>
      ) : (
        <Card>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left">
                <thead className="bg-muted text-muted-foreground uppercase">
                  <tr>
                    <th className="px-6 py-3">Equipment Name</th>
                    <th className="px-6 py-3">Category</th>
                    <th className="px-6 py-3">Rental Price</th>
                    <th className="px-6 py-3">Available Quantity</th>
                    <th className="px-6 py-3">Status</th>
                    <th className="px-6 py-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {equipment.map((item) => (
                    <tr key={item._id} className="hover:bg-muted/30">
                      <td className="px-6 py-4 font-medium">{item.name}</td>
                      <td className="px-6 py-4">{item.category}</td>
                      <td className="px-6 py-4">৳{item.rentalPrice}</td>
                      <td className="px-6 py-4">{item.availableQuantity}</td>
                      <td className="px-6 py-4">
                        <Badge
                          className={
                            item.status === "Approved"
                              ? "bg-green-100 text-green-700"
                              : item.status === "Rejected"
                                ? "bg-red-100 text-red-700"
                                : "bg-yellow-100 text-yellow-700"
                          }
                        >
                          {item.status}
                        </Badge>
                      </td>
                      <td className="px-6 py-4 flex justify-end gap-2">
                        <Link href={`/equipment/${item._id}`}>
                          <Button
                            variant="outline"
                            size="sm"
                            className="text-primary border-primary hover:bg-primary/10"
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                        </Link>
                        <Button
                          variant="outline"
                          size="sm"
                          className="text-secondary border-secondary hover:bg-secondary/10"
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={() => handleDelete(item._id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
