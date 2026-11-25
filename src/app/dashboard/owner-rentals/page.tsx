"use client";
import { useEffect, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { toast } from "@/components/Toast";

export default function OwnerRentalsPage() {
  const [rentals, setRentals] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const loadRentals = async () => {
    try {
      const baseUrl =
        process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";
      const res = await fetch(`${baseUrl}/api/bookings/owner`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      const data = await res.json();
      if (Array.isArray(data)) setRentals(data);
    } catch (error) {
      toast.error("Failed to load rentals");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadRentals();
  }, []);

  const updateStatus = async (id: string, status: string) => {
    try {
      const baseUrl =
        process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";
      await fetch(`${baseUrl}/api/bookings/${id}/status`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ status }),
      });
      toast.success(`Booking ${status}`);
      loadRentals();
    } catch (error) {
      toast.error("Failed to update status");
    }
  };

  if (loading)
    return <div className="p-20 text-center">Loading rentals...</div>;

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-primary">My Equipment Rental</h1>
      {rentals.length === 0 ? (
        <div className="text-center py-20 border-2 border-dashed rounded-2xl">
          <p className="text-lg font-semibold text-muted-foreground">
            No rentals yet
          </p>
        </div>
      ) : (
        <Card>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left">
                <thead className="bg-muted text-muted-foreground uppercase">
                  <tr>
                    <th className="px-6 py-3">Customer</th>
                    <th className="px-6 py-3">Equipment</th>
                    <th className="px-6 py-3">Duration</th>
                    <th className="px-6 py-3">Qty</th>
                    <th className="px-6 py-3">Amount</th>
                    <th className="px-6 py-3">Payment</th>
                    <th className="px-6 py-3">Status</th>
                    <th className="px-6 py-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {rentals.map((item) => (
                    <tr key={item._id} className="hover:bg-muted/30">
                      <td className="px-6 py-4 font-medium">
                        {item.customerName} <br />
                        <span className="text-xs text-muted-foreground">
                          {item.customerEmail}
                        </span>
                      </td>
                      <td className="px-6 py-4">{item.equipmentName}</td>
                      <td className="px-6 py-4">
                        {new Date(item.rentalStartDate).toLocaleDateString()} -{" "}
                        {new Date(item.rentalEndDate).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4">{item.quantity}</td>
                      <td className="px-6 py-4 font-bold">
                        ৳{item.totalAmount}
                      </td>
                      <td className="px-6 py-4">
                        <Badge
                          className={
                            item.paymentStatus === "Paid"
                              ? "bg-green-100 text-green-700"
                              : "bg-yellow-100 text-yellow-700"
                          }
                        >
                          {item.paymentStatus}
                        </Badge>
                      </td>
                      <td className="px-6 py-4">
                        <Badge
                          className={
                            item.bookingStatus === "Approved"
                              ? "bg-blue-100 text-blue-700"
                              : "bg-gray-100 text-gray-700"
                          }
                        >
                          {item.bookingStatus}
                        </Badge>
                      </td>
                      <td className="px-6 py-4 flex justify-end gap-2">
                        {item.bookingStatus === "Pending" && (
                          <>
                            <Button
                              size="sm"
                              className="bg-green-600 hover:bg-green-700 text-white"
                              onClick={() => updateStatus(item._id, "Approved")}
                            >
                              Approve
                            </Button>
                            <Button
                              size="sm"
                              variant="destructive"
                              onClick={() =>
                                updateStatus(item._id, "Cancelled")
                              }
                            >
                              Reject
                            </Button>
                          </>
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
