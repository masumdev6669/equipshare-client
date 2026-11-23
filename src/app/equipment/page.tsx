"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { MapPin, Search } from "lucide-react";
import { toast } from "@/components/Toast";

export default function AllEquipmentPage() {
  const [equipment, setEquipment] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [category, setCategory] = useState("");

  useEffect(() => {
    const fetchEquipment = async () => {
      try {
        const baseUrl =
          process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";
        const res = await fetch(`${baseUrl}/api/equipment`);
        const data = await res.json();
        setEquipment(data);
      } catch (error) {
        toast.error("Failed to load equipment");
      } finally {
        setLoading(false);
      }
    };
    fetchEquipment();
  }, []);

  const filteredEquipment = equipment.filter((item) => {
    const matchesSearch =
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = category ? item.category === category : true;
    return matchesSearch && matchesCategory;
  });

  const categories = [
    "Construction",
    "Photography",
    "Vehicles",
    "Agriculture",
    "Electronics",
    "Event Equipment",
  ];

  if (loading)
    return <div className="p-20 text-center">Loading equipment...</div>;

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
        <h1 className="text-3xl font-bold text-primary">All Equipment</h1>
        <div className="flex gap-4 w-full md:w-auto">
          <div className="relative w-full md:w-64">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search by name or location..."
              className="pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <select
            className="h-10 rounded-md border border-input bg-background px-3 text-sm"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="">All Categories</option>
            {categories.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>
      </div>

      {filteredEquipment.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-lg font-semibold text-muted-foreground">
            No equipment found
          </p>
          <p className="text-sm text-muted-foreground/70">
            Try adjusting your search or filters.
          </p>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredEquipment.map((item) => (
            <Card
              key={item._id}
              className="overflow-hidden card-hover flex flex-col group"
            >
              <div className="relative h-48 w-full overflow-hidden">
                <img
                  src={item.image}
                  alt={item.name}
                  className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-110"
                />
              </div>
              <CardHeader className="p-5 pb-2">
                <Badge className="w-fit bg-secondary/10 text-secondary mb-2">
                  {item.category}
                </Badge>
                <CardTitle className="text-lg line-clamp-1">
                  {item.name}
                </CardTitle>
              </CardHeader>
              <CardContent className="p-5 pt-0 flex-grow space-y-2">
                <div className="flex items-center text-sm text-muted-foreground">
                  <MapPin className="mr-1 h-4 w-4 text-primary" />{" "}
                  {item.location}
                </div>
                <p className="text-sm font-semibold text-primary">
                  ৳{item.rentalPrice} / {item.rentalType}
                </p>
              </CardContent>
              <CardFooter className="p-5 pt-0">
                <Link href={`/equipment/${item._id}`} className="w-full">
                  <Button className="w-full bg-primary rounded-full">
                    View Details
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
