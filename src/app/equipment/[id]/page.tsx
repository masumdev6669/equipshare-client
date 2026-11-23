"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useSession } from "@/lib/auth-client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { toast } from "@/components/Toast";
import { MapPin, Calendar, ShieldCheck, Heart, X } from "lucide-react";

export default function EquipmentDetailsPage() {
  const { id } = useParams();
  const router = useRouter();
  const { data: session } = useSession();
  const [equipment, setEquipment] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [bookingLoading, setBookingLoading] = useState(false);

  const [bookingForm, setBookingForm] = useState({
    rentalStartDate: "",
    rentalEndDate: "",
    quantity: 1,
    contactNumber: "",
    deliveryAddress: "",
    additionalNotes: "",
  });

  useEffect(() => {
    const fetchEquipment = async () => {
      try {
        const baseUrl =
          process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";
        const res = await fetch(`${baseUrl}/api/equipment/${id}`);
        const data = await res.json();
        setEquipment(data);
      } catch (error) {
        toast.error("Failed to load equipment");
      } finally {
        setLoading(false);
      }
    };
    fetchEquipment();
  }, [id]);

  const calculateTotal = () => {
    if (
      !bookingForm.rentalStartDate ||
      !bookingForm.rentalEndDate ||
      !equipment
    )
      return 0;
    const start = new Date(bookingForm.rentalStartDate).getTime();
    const end = new Date(bookingForm.rentalEndDate).getTime();
    const days = Math.ceil((end - start) / (1000 * 60 * 60 * 24));
    if (days <= 0) return 0;
    return days * equipment.rentalPrice * bookingForm.quantity;
  };

  const handleBookNow = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!session?.user) {
      toast.error("Please login to book equipment");
      return router.push("/login");
    }

    const total = calculateTotal();
    if (total <= 0) return toast.error("Please select valid dates");

    setBookingLoading(true);

    try {
      const baseUrl =
        process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";
      const res = await fetch(
        `${baseUrl}/api/bookings/create-checkout-session`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({
            equipmentName: equipment.name,
            totalAmount: total,
            equipmentId: equipment._id,
            rentalStartDate: bookingForm.rentalStartDate,
            rentalEndDate: bookingForm.rentalEndDate,
            quantity: bookingForm.quantity,
            contactNumber: bookingForm.contactNumber,
            deliveryAddress: bookingForm.deliveryAddress,
            additionalNotes: bookingForm.additionalNotes,
            ownerEmail: equipment.ownerEmail,
          }),
        },
      );

      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      } else {
        throw new Error(data.message || "Failed to create payment session");
      }
    } catch (error: any) {
      toast.error(error.message || "Something went wrong");
    } finally {
      setBookingLoading(false);
    }
  };

  if (loading) return <div className="p-20 text-center">Loading...</div>;
  if (!equipment)
    return <div className="p-20 text-center">Equipment not found</div>;

  return (
    <div className="container mx-auto px-4 py-12 max-w-5xl">
      <div className="grid md:grid-cols-2 gap-10">
        <div>
          <img
            src={equipment.image}
            alt={equipment.name}
            className="w-full h-96 object-cover rounded-2xl shadow-lg"
          />
        </div>

        <div className="space-y-6">
          <div>
            <Badge className="bg-secondary/10 text-secondary mb-3">
              {equipment.category}
            </Badge>
            <h1 className="text-4xl font-extrabold text-primary">
              {equipment.name}
            </h1>
            <p className="text-lg text-muted-foreground mt-2">
              {equipment.brand} - {equipment.model}
            </p>
          </div>

          <div className="flex items-center justify-between border-y py-4">
            <div>
              <p className="text-sm text-muted-foreground">Rental Price</p>
              <p className="text-3xl font-bold text-secondary">
                ৳{equipment.rentalPrice}{" "}
                <span className="text-sm font-normal text-muted-foreground">
                  / {equipment.rentalType}
                </span>
              </p>
            </div>
            <div className="text-right">
              <p className="text-sm text-muted-foreground">
                Available Quantity
              </p>
              <p className="text-3xl font-bold">
                {equipment.availableQuantity}
              </p>
            </div>
          </div>

          <div className="space-y-3 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-primary" /> Location:{" "}
              {equipment.location}
            </div>
            <div className="flex items-center gap-2">
              <ShieldCheck className="h-4 w-4 text-primary" /> Condition:{" "}
              {equipment.equipmentCondition}
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-primary" /> Owner:{" "}
              {equipment.ownerName}
            </div>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-2">
              Rental Terms & Conditions
            </h3>
            <p className="text-sm text-muted-foreground">{equipment.terms}</p>
          </div>

          <div className="flex gap-3 pt-4">
            <Button
              onClick={() => setShowModal(true)}
              className="flex-1 bg-secondary hover:bg-orange-600 rounded-full py-6 text-lg font-bold"
            >
              Book Now
            </Button>
            <Button
              variant="outline"
              className="rounded-full py-6 px-6 border-primary text-primary hover:bg-primary/10"
            >
              <Heart className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-[100] p-4">
          <div className="bg-background rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden">
            <div className="flex justify-between items-center p-6 border-b bg-muted/30">
              <h2 className="text-2xl font-bold text-primary">
                Book Equipment
              </h2>
              <button
                onClick={() => setShowModal(false)}
                className="text-muted-foreground hover:text-red-500"
              >
                <X className="h-6 w-6" />
              </button>
            </div>
            <form onSubmit={handleBookNow} className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Start Date</label>
                  <Input
                    type="date"
                    required
                    value={bookingForm.rentalStartDate}
                    onChange={(e) =>
                      setBookingForm({
                        ...bookingForm,
                        rentalStartDate: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">End Date</label>
                  <Input
                    type="date"
                    required
                    value={bookingForm.rentalEndDate}
                    onChange={(e) =>
                      setBookingForm({
                        ...bookingForm,
                        rentalEndDate: e.target.value,
                      })
                    }
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Required Quantity</label>
                <Input
                  type="number"
                  min="1"
                  max={equipment.availableQuantity}
                  required
                  value={bookingForm.quantity}
                  onChange={(e) =>
                    setBookingForm({
                      ...bookingForm,
                      quantity: parseInt(e.target.value),
                    })
                  }
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Contact Number</label>
                <Input
                  required
                  placeholder="017XXXXXXXX"
                  value={bookingForm.contactNumber}
                  onChange={(e) =>
                    setBookingForm({
                      ...bookingForm,
                      contactNumber: e.target.value,
                    })
                  }
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Delivery Address</label>
                <Input
                  required
                  placeholder="Your full address"
                  value={bookingForm.deliveryAddress}
                  onChange={(e) =>
                    setBookingForm({
                      ...bookingForm,
                      deliveryAddress: e.target.value,
                    })
                  }
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">
                  Additional Notes (Optional)
                </label>
                <textarea
                  rows={2}
                  className="w-full flex min-h-[60px] rounded-md border border-input bg-background px-3 py-2 text-sm"
                  value={bookingForm.additionalNotes}
                  onChange={(e) =>
                    setBookingForm({
                      ...bookingForm,
                      additionalNotes: e.target.value,
                    })
                  }
                />
              </div>

              <div className="bg-muted p-4 rounded-xl flex justify-between items-center mt-4">
                <span className="font-semibold">Total Amount:</span>
                <span className="text-2xl font-bold text-secondary">
                  ৳{calculateTotal()}
                </span>
              </div>

              <Button
                type="submit"
                disabled={bookingLoading}
                className="w-full bg-primary hover:bg-primary/90 rounded-full py-6 text-lg font-bold mt-2"
              >
                {bookingLoading
                  ? "Redirecting to payment..."
                  : "Proceed to Payment"}
              </Button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
