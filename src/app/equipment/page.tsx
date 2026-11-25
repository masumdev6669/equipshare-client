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

const CATEGORIES = [
  "Construction",
  "Photography",
  "Vehicles",
  "Agriculture",
  "Electronics",
  "Event Equipment",
];
const RENTAL_TYPES = ["Daily", "Weekly", "Monthly"];

export default function AllEquipmentPage() {
  const [equipment, setEquipment] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [category, setCategory] = useState("");
  const [rentalType, setRentalType] = useState("");
  const [sort, setSort] = useState("");

  const fetchEquipment = async () => {
    setLoading(true);
    try {
      const baseUrl =
        process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";
      const params = new URLSearchParams();
      if (searchTerm) params.append("search", searchTerm);
      if (category) params.append("category", category);
      if (rentalType) params.append("rentalType", rentalType);
      if (sort) params.append("sort", sort);

      const res = await fetch(`${baseUrl}/api/equipment?${params.toString()}`);
      const data = await res.json();
      if (Array.isArray(data)) {
        setEquipment(data);
      } else {
        setEquipment([]);
      }
    } catch (error) {
      toast.error("Failed to load equipment");
      setEquipment([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEquipment();
  }, [category, rentalType, sort]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    fetchEquipment();
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-primary mb-8">All Equipment</h1>

      <div className="flex flex-col lg:flex-row gap-4 mb-8">
        <form onSubmit={handleSearch} className="flex-1 flex gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search by name or location..."
              className="pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Button type="submit" className="bg-primary">
            Search
          </Button>
        </form>

        <select
          className="h-10 rounded-md border border-input bg-background px-3 text-sm"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="">All Categories</option>
          {CATEGORIES.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>

        <select
          className="h-10 rounded-md border border-input bg-background px-3 text-sm"
          value={rentalType}
          onChange={(e) => setRentalType(e.target.value)}
        >
          <option value="">All Rental Types</option>
          {RENTAL_TYPES.map((t) => (
            <option key={t} value={t}>
              {t}
            </option>
          ))}
        </select>

        <select
          className="h-10 rounded-md border border-input bg-background px-3 text-sm"
          value={sort}
          onChange={(e) => setSort(e.target.value)}
        >
          <option value="">Sort By</option>
          <option value="price_asc">Price: Low to High</option>
          <option value="price_desc">Price: High to Low</option>
        </select>
      </div>

      {loading ? (
        <div className="text-center py-20 text-lg text-muted-foreground">
          Loading equipment...
        </div>
      ) : equipment.length === 0 ? (
        <div className="text-center py-20 border-2 border-dashed rounded-2xl">
          <p className="text-lg font-semibold text-muted-foreground">
            No equipment found
          </p>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {equipment.map((item) => (
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
