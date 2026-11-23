"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "@/lib/auth-client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { toast } from "@/components/Toast";
import { PlusCircle } from "lucide-react";

const CATEGORIES = [
  "Construction",
  "Photography",
  "Vehicles",
  "Agriculture",
  "Electronics",
  "Event Equipment",
];
const RENTAL_TYPES = ["Daily", "Weekly", "Monthly"];

export default function AddEquipmentPage() {
  const router = useRouter();
  const { data: session } = useSession();
  const [loading, setLoading] = useState(false);
  const [imageUploading, setImageUploading] = useState(false);

  const [form, setForm] = useState({
    name: "",
    description: "",
    category: "Construction",
    location: "",
    rentalPrice: "",
    rentalType: "Daily",
    availableQuantity: "",
    equipmentCondition: "",
    brand: "",
    model: "",
    image: "",
    terms: "",
  });

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setImageUploading(true);
    const formData = new FormData();
    formData.append("image", file);

    try {
      const apiKey = process.env.NEXT_PUBLIC_IMGBB_API_KEY;

      if (!apiKey) {
        toast.error("API Key missing in .env.local");
        setImageUploading(false);
        return;
      }

      const res = await fetch(`https://api.imgbb.com/1/upload?key=${apiKey}`, {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (data.success) {
        setForm({ ...form, image: data.data.url });
        toast.success("Image uploaded successfully!");
      } else {
        toast.error(data.error?.message || "Image upload failed");
      }
    } catch (error: any) {
      toast.error(error.message || "Image upload error");
    } finally {
      setImageUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.image) return toast.error("Please upload an equipment image");

    setLoading(true);

    try {
      const baseUrl =
        process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

      const res = await fetch(`${baseUrl}/api/equipment`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Failed to add equipment");
      }

      toast.success(
        "Equipment added successfully! Waiting for admin approval.",
      );
      router.push("/dashboard/my-equipment");
    } catch (error: any) {
      toast.error(error.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto">
      <Card className="shadow-lg border-primary/20">
        <CardHeader className="text-center space-y-2">
          <div className="mx-auto bg-primary/10 p-3 rounded-full w-fit">
            <PlusCircle className="h-8 w-8 text-primary" />
          </div>
          <CardTitle className="text-3xl font-extrabold text-primary">
            Add New Equipment
          </CardTitle>
          <CardDescription>List your equipment for rent</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2 md:col-span-2">
                <label className="text-sm font-medium">Equipment Name</label>
                <Input
                  required
                  placeholder="Canon EOS R5 Camera"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                />
              </div>

              <div className="space-y-2 md:col-span-2">
                <label className="text-sm font-medium">Description</label>
                <textarea
                  required
                  rows={3}
                  className="w-full flex min-h-[80px] rounded-md border border-input bg-background px-3 py-2 text-sm"
                  value={form.description}
                  onChange={(e) =>
                    setForm({ ...form, description: e.target.value })
                  }
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Category</label>
                <select
                  className="w-full h-10 rounded-md border border-input bg-background px-3 text-sm"
                  value={form.category}
                  onChange={(e) =>
                    setForm({ ...form, category: e.target.value })
                  }
                >
                  {CATEGORIES.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Location</label>
                <Input
                  required
                  placeholder="Dhaka"
                  value={form.location}
                  onChange={(e) =>
                    setForm({ ...form, location: e.target.value })
                  }
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Rental Price (৳)</label>
                <Input
                  type="number"
                  required
                  placeholder="5000"
                  value={form.rentalPrice}
                  onChange={(e) =>
                    setForm({ ...form, rentalPrice: e.target.value })
                  }
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Rental Type</label>
                <select
                  className="w-full h-10 rounded-md border border-input bg-background px-3 text-sm"
                  value={form.rentalType}
                  onChange={(e) =>
                    setForm({ ...form, rentalType: e.target.value })
                  }
                >
                  {RENTAL_TYPES.map((t) => (
                    <option key={t} value={t}>
                      {t}
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">
                  Available Quantity
                </label>
                <Input
                  type="number"
                  required
                  placeholder="5"
                  value={form.availableQuantity}
                  onChange={(e) =>
                    setForm({ ...form, availableQuantity: e.target.value })
                  }
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">
                  Equipment Condition
                </label>
                <Input
                  required
                  placeholder="Excellent"
                  value={form.equipmentCondition}
                  onChange={(e) =>
                    setForm({ ...form, equipmentCondition: e.target.value })
                  }
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Brand</label>
                <Input
                  required
                  placeholder="Canon"
                  value={form.brand}
                  onChange={(e) => setForm({ ...form, brand: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Model</label>
                <Input
                  required
                  placeholder="R5"
                  value={form.model}
                  onChange={(e) => setForm({ ...form, model: e.target.value })}
                />
              </div>

              <div className="space-y-2 md:col-span-2">
                <label className="text-sm font-medium">Equipment Image</label>
                <div className="flex items-center gap-4">
                  <Input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    disabled={imageUploading}
                  />
                  {imageUploading && (
                    <span className="text-sm text-secondary">Uploading...</span>
                  )}
                </div>
                {form.image && (
                  <img
                    src={form.image}
                    alt="Preview"
                    className="h-24 w-24 object-cover rounded-md mt-2"
                  />
                )}
              </div>

              <div className="space-y-2 md:col-span-2">
                <label className="text-sm font-medium">
                  Rental Terms and Conditions
                </label>
                <textarea
                  required
                  rows={2}
                  className="w-full flex min-h-[60px] rounded-md border border-input bg-background px-3 py-2 text-sm"
                  placeholder="Must be returned in the same condition."
                  value={form.terms}
                  onChange={(e) => setForm({ ...form, terms: e.target.value })}
                />
              </div>
            </div>
            <Button
              type="submit"
              disabled={loading || imageUploading}
              className="w-full bg-primary hover:bg-primary/90 mt-4 rounded-full py-6 text-lg"
            >
              {loading ? "Adding Equipment..." : "Add Equipment"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
