"use client";
import { useEffect, useState, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { toast } from "@/components/Toast";
import { CheckCircle } from "lucide-react";

function PaymentSuccessContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const sessionId = searchParams.get("session_id");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const confirmPayment = async () => {
      if (!sessionId) {
        toast.error("Invalid session");
        return router.push("/");
      }

      try {
        const baseUrl =
          process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";
        const res = await fetch(`${baseUrl}/api/bookings/confirm-payment`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({ sessionId }),
        });

        if (!res.ok) throw new Error("Payment confirmation failed");

        toast.success("Payment successful and booking confirmed!");
        setTimeout(() => router.push("/dashboard/my-rentals"), 2000);
      } catch (error) {
        toast.error("Failed to confirm payment");
      } finally {
        setLoading(false);
      }
    };
    confirmPayment();
  }, [sessionId, router]);

  return (
    <div className="flex items-center justify-center min-h-[80vh]">
      <Card className="w-full max-w-md text-center shadow-lg border-green-200">
        <CardHeader>
          <div className="mx-auto bg-green-100 p-4 rounded-full w-fit mb-4">
            <CheckCircle className="h-12 w-12 text-green-600" />
          </div>
          <CardTitle className="text-3xl font-bold text-green-600">
            Payment Successful!
          </CardTitle>
          <CardDescription>Your booking has been confirmed.</CardDescription>
        </CardHeader>
        <CardContent>
          {loading ? (
            <p className="text-muted-foreground">Confirming your booking...</p>
          ) : (
            <Button
              onClick={() => router.push("/dashboard/my-rentals")}
              className="w-full bg-primary rounded-full"
            >
              Go to My Rentals
            </Button>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

export default function PaymentSuccessPage() {
  return (
    <Suspense fallback={<div className="p-20 text-center">Loading...</div>}>
      <PaymentSuccessContent />
    </Suspense>
  );
}
