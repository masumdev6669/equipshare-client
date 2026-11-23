"use client";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { toast } from "@/components/Toast";
import { CheckCircle, XCircle } from "lucide-react";

export default function AllEquipmentPage() {
  const [equipment, setEquipment] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const loadEquipment = async () => {
    try {
      const baseUrl =
        process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";
      const res = await fetch(`${baseUrl}/api/equipment/admin/all`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      const data = await res.json();

      if (Array.isArray(data)) {
        setEquipment(data);
      } else {
        toast.error(data.message || "Failed to load equipment");
        setEquipment([]);
      }
    } catch (error: any) {
      toast.error(error.message || "Failed to load equipment");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadEquipment();
  }, []);

  const updateStatus = async (id: string, status: string) => {
    try {
      const baseUrl =
        process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";
      const res = await fetch(`${baseUrl}/api/equipment/admin/${id}/status`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ status }),
      });

      if (!res.ok) throw new Error("Failed to update status");

      toast.success(`Equipment ${status}`);
      loadEquipment();
    } catch (error) {
      toast.error("Failed to update status");
    }
  };

  if (loading)
    return <div className="p-20 text-center">Loading equipment...</div>;

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-primary">All Equipment</h1>

      {equipment.length === 0 ? (
        <div className="text-center py-20 border-2 border-dashed rounded-2xl">
          <p className="text-lg font-semibold text-muted-foreground">
            No equipment found
          </p>
          <p className="text-sm text-muted-foreground/70">
            There are no equipment listed yet.
          </p>
        </div>
      ) : (
        <Card>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left">
                <thead className="bg-muted text-muted-foreground uppercase">
                  <tr>
                    <th className="px-6 py-3">Equipment Name</th>
                    <th className="px-6 py-3">Owner</th>
                    <th className="px-6 py-3">Status</th>
                    <th className="px-6 py-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {equipment.map((item) => (
                    <tr key={item._id} className="hover:bg-muted/30">
                      <td className="px-6 py-4 font-medium">{item.name}</td>
                      <td className="px-6 py-4">
                        {item.ownerName} ({item.ownerEmail})
                      </td>
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
                        {item.status === "Pending" && (
                          <>
                            <Button
                              variant="outline"
                              size="sm"
                              className="text-green-600 border-green-600 hover:bg-green-50"
                              onClick={() => updateStatus(item._id, "Approved")}
                            >
                              <CheckCircle className="h-4 w-4 mr-1" /> Approve
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              className="text-red-600 border-red-600 hover:bg-red-50"
                              onClick={() => updateStatus(item._id, "Rejected")}
                            >
                              <XCircle className="h-4 w-4 mr-1" /> Reject
                            </Button>
                          </>
                        )}
                        {item.status === "Approved" && (
                          <Button
                            variant="outline"
                            size="sm"
                            className="text-red-600 border-red-600 hover:bg-red-50"
                            onClick={() => updateStatus(item._id, "Rejected")}
                          >
                            Reject
                          </Button>
                        )}
                        {item.status === "Rejected" && (
                          <Button
                            variant="outline"
                            size="sm"
                            className="text-green-600 border-green-600 hover:bg-green-50"
                            onClick={() => updateStatus(item._id, "Approved")}
                          >
                            Approve
                          </Button>
                        )}
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
